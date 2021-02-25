const { Near, KeyPair, Contract, keyStores: { InMemoryKeyStore } } = require('near-api-js');
const { CustomConsole } = require('@jest/console');
const getConfig = require('../src/config');

global.console = new CustomConsole(process.stdout, process.stderr, (type, message) => message
  .split(/\n/)
  .map(line => `[${type}] ${line}`)
  .join('\n'));

const config = getConfig('development');

const NEP4Methods = {
  viewMethods: ['get_token_owner'],
  changeMethods: ['grant_access', 'revoke_access', 'transfer_from', 'transfer', 'check_access'],
};

const contractMethods = {
  // View methods are read only. They don't modify the state, but usually return some value.
  viewMethods: ['get_corgi_by_id', 'get_corgis_by_owner', 'get_global_corgis', 'get_corgis_page_limit', ...NEP4Methods.viewMethods],
  // Change methods can modify the state. But you don't receive the returned value when called.
  changeMethods: ['transfer_corgi', 'create_corgi', 'delete_corgi', ...NEP4Methods.changeMethods],
};

async function initContractWithNewTestAccount() {
  const keyStore = new InMemoryKeyStore();

  const near = new Near({
    deps: { keyStore: keyStore },
    ...config
  });

  const generateUniqueAccountId = function (prefix) {
    return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1000000)}`;
  }

  const newKeyPair = KeyPair.fromRandom('ed25519');
  const account = await near.createAccount(generateUniqueAccountId('test'), newKeyPair.getPublicKey());

  keyStore.setKey(config.networkId, account.accountId, newKeyPair);

  const contract = new Contract(account, config.contractName, {
    ...contractMethods,
    signer: account.accountId
  });

  return {
    contract,
    accountId: account.accountId,
    account,
  };
}

describe('Corgis contract integration tests', () => {

  let alice, bob, ted, pageLimit;

  beforeAll(async () => {
    alice = await initContractWithNewTestAccount();
    bob = await initContractWithNewTestAccount();
    ted = await initContractWithNewTestAccount();

    pageLimit = await alice.contract.get_corgis_page_limit();
  });

  afterAll(async () => {
    const accid = 'corgis-nft.testnet';
    await alice.account.deleteAccount(accid);
    await bob.account.deleteAccount(accid);
    await ted.account.deleteAccount(accid);
  });

  test('check that test account are actually different', async () => {
    expect(alice.accountId).not.toBe(bob.accountId);
  });

  test('get corgis page limit', async () => {
    expect(pageLimit).toBeGreaterThan(0);
  });

  test('create a corgi', async () => {
    const initial = await initialState(alice);

    const newCorgi = await alice.contract.create_corgi({ name: 'hola', quote: 'asd', color: 'red', background_color: 'yellow' });
    console.debug('create corgi', newCorgi);

    const globalCorgisCount = await alice.contract.get_global_corgis();
    expect(globalCorgisCount.length).toBe(Math.min(initial.globalCorgis.length + 1, pageLimit));

    const corgiById = await alice.contract.get_corgi_by_id({ id: newCorgi.id });
    expect(corgiById.owner).toBe(alice.accountId);

    const corgisByOwner = await alice.contract.get_corgis_by_owner({ owner: alice.accountId });
    expect(corgisByOwner.length).toBe(initial.corgisByOwner.length + 1);
    expect(corgisByOwner.map(corgi => corgi.id)).toContain(newCorgi.id);
  });

  test('create and delete a corgi', async () => {
    const initial = await initialState(alice);

    const newCorgi = await alice.contract.create_corgi({ name: 'hola', quote: 'asd', color: 'red', background_color: 'yellow' });
    console.debug('create corgi', newCorgi);

    {
      const corgisByOwner = await alice.contract.get_corgis_by_owner({ owner: alice.accountId });
      expect(corgisByOwner.length).toBe(initial.corgisByOwner.length + 1);
    }

    await alice.contract.delete_corgi({ id: newCorgi.id });

    {
      const corgisByOwner = await alice.contract.get_corgis_by_owner({ owner: alice.accountId });
      expect(corgisByOwner.length).toBe(initial.corgisByOwner.length);
    }
  });

  test('create a few corgis', async () => {
    const initial = await initialState(alice);

    const newCorgis = [];
    for (let i = 0; i < pageLimit + 1; i++) {
      const newCorgi = await alice.contract.create_corgi({ name: 'hola', quote: 'asd', color: 'red', background_color: 'yellow' });
      newCorgis.push(newCorgi);
    }

    const globalCorgis = await alice.contract.get_global_corgis();
    expect(globalCorgis.length).toBe(pageLimit);

    for (let i = 0; i < 5; i++) {
      const corgiByOwner = await alice.contract.get_corgi_by_id({ id: newCorgis[i].id });
      expect(corgiByOwner.owner).toBe(alice.accountId);
    }

    const corgisByOwner = await alice.contract.get_corgis_by_owner({ owner: alice.accountId });
    expect(corgisByOwner.length).toBe(initial.corgisByOwner.length + newCorgis.length);
  });

  test('create and delete a few corgis', async () => {
    const initial = await initialState(alice);

    const newCorgis = [];
    for (let i = 0; i < pageLimit + 2; i++) {
      const newCorgi = await alice.contract.create_corgi({ name: 'hola', quote: 'asd', color: 'red', background_color: 'yellow' });
      console.debug('create corgi', newCorgi);
      newCorgis.push(newCorgi);
    }

    const checkCorgis = async function () {
      const globalCorgis = await alice.contract.get_global_corgis();
      expect(globalCorgis.length).toBe(pageLimit);

      const corgisByOwner = await alice.contract.get_corgis_by_owner({ owner: alice.accountId });
      expect(corgisByOwner.length).toBe(initial.corgisByOwner.length + newCorgis.length);
    }

    const deleteCorgi = async function (i) {
      const [deletedCorgi] = newCorgis.splice(i, 1);
      await alice.contract.delete_corgi({ id: deletedCorgi.id });
      await checkCorgis();
    }

    await checkCorgis();

    await deleteCorgi(1);
    await deleteCorgi(3);
  });

  test('transfer corgi', async () => {
    const newCorgi = await alice.contract.create_corgi({ name: 'hola', quote: 'asd', color: 'red', background_color: 'yellow' });

    {
      const corgiById = await alice.contract.get_corgi_by_id({ id: newCorgi.id });
      expect(corgiById.owner).toBe(alice.accountId);
      const corgisByOwner = await alice.contract.get_corgis_by_owner({ owner: alice.accountId });
      expect(corgisByOwner.map(corgi => corgi.id)).toContain(newCorgi.id);
    }

    await alice.contract.transfer_corgi({ receiver: bob.accountId, id: newCorgi.id });

    {
      const corgiById = await bob.contract.get_corgi_by_id({ id: newCorgi.id });
      expect(corgiById.owner).toBe(bob.accountId);
      const corgisByOwner = await bob.contract.get_corgis_by_owner({ owner: bob.accountId });
      expect(corgisByOwner.map(corgi => corgi.id)).toContain(newCorgi.id);
    }

    {
      const corgiById = await alice.contract.get_corgi_by_id({ id: newCorgi.id });
      expect(corgiById.owner).toBe(bob.accountId);
      const corgisByOwner = await alice.contract.get_corgis_by_owner({ owner: alice.accountId });
      expect(corgisByOwner.map(corgi => corgi.id)).not.toContain(newCorgi.id);
    }
  });

  test('NEP4 transfer/get_token_owner', async () => {
    const newCorgi = await alice.contract.create_corgi({ name: 'hola', quote: 'asd', color: 'red', background_color: 'yellow' });
    await alice.contract.transfer({ new_owner_id: bob.accountId, token_id: newCorgi.id });
    const newOwner = await alice.contract.get_token_owner({ token_id: newCorgi.id });
    expect(newOwner).toBe(bob.accountId);
  });

  test('NEP4 grant/revoke access', async () => {
    await alice.contract.grant_access({ escrow_account_id: ted.accountId});

    let hasAccess = await ted.contract.check_access({ account_id: alice.accountId});
    expect(hasAccess).toBe(true);

    await alice.contract.revoke_access({ escrow_account_id: ted.accountId});

    hasAccess = await ted.contract.check_access({ account_id: alice.accountId});
    expect(hasAccess).toBe(false);
  });

  test('NEP4 transfer_from', async () => {
    const newCorgi = await alice.contract.create_corgi({ name: 'hola', quote: 'asd', color: 'red', background_color: 'yellow' });
    await alice.contract.grant_access({ escrow_account_id: ted.accountId});

    await ted.contract.transfer_from({ owner_id: alice.accountId, new_owner_id: bob.accountId, token_id: newCorgi.id });

    const newOwner = await alice.contract.get_token_owner({ token_id: newCorgi.id });
    expect(newOwner).toBe(bob.accountId);
  });

});

async function initialState(user) {
  const globalCorgis = await user.contract.get_global_corgis();
  const corgisByOwner = await user.contract.get_corgis_by_owner({ owner: user.accountId });
  return { globalCorgis, corgisByOwner };
}
