const { Near, KeyPair, Contract, keyStores: { InMemoryKeyStore } } = require('near-api-js');
const getConfig = require('../src/config');

const config = getConfig('development');

const contractMethods = {
  // View methods are read only. They don't modify the state, but usually return some value.
  viewMethods: ['get_corgi_by_id', 'get_corgis_by_owner', 'get_global_corgis'],
  // Change methods can modify the state. But you don't receive the returned value when called.
  changeMethods: ['transfer_corgi', 'create_corgi', 'delete_corgi'],
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
    accountId: account.accountId
  };
}

describe('Corgis contract integration tests', () => {

  let alice, bob;

  beforeAll(async () => {
    alice = await initContractWithNewTestAccount();
    // bob = await initContract(createTestAccount());
  });

  test('create a corgi', async () => {
    const initial = await initialState(alice);

    const newCorgi = await alice.contract.create_corgi({ name: 'hola', quote: 'asd', color: 'red', background_color: 'yellow' });
    console.debug('create corgi', newCorgi);

    const globalCorgisCount = await alice.contract.get_global_corgis();
    expect(globalCorgisCount.length).toBe(initial.globalCorgis.length + 1);

    const corgiByOwner = await alice.contract.get_corgi_by_id({ id: newCorgi.id });
    expect(corgiByOwner.owner).toBe(alice.accountId);

    const corgisByOwner = await alice.contract.get_corgis_by_owner({ owner: alice.accountId });
    expect(corgisByOwner.length).toBe(initial.corgisByOwner.length + 1);
  });

  test('create a few corgis', async () => {
    const initial = await initialState(alice);

    const newCorgis = [];
    for (let i = 0; i < 5; i++) {
      const newCorgi = await alice.contract.create_corgi({ name: 'hola', quote: 'asd', color: 'red', background_color: 'yellow' });
      console.debug('create corgi', newCorgi);
      newCorgis.push(newCorgi);
    }

    const globalCorgis = await alice.contract.get_global_corgis();
    expect(globalCorgis.length).toBe(initial.globalCorgis.length + newCorgis.length);

    for (let i = 0; i < 5; i++) {
      const corgiByOwner = await alice.contract.get_corgi_by_id({ id: newCorgis[i].id });
      expect(corgiByOwner.owner).toBe(alice.accountId);
    }

    const corgisByOwner = await alice.contract.get_corgis_by_owner({ owner: alice.accountId });
    expect(corgisByOwner.length).toBe(initial.corgisByOwner.length + newCorgis.length);
  });

});

async function initialState(user) {
  const globalCorgis = await user.contract.get_global_corgis();
  const corgisByOwner = await user.contract.get_corgis_by_owner({ owner: user.accountId });
  return { globalCorgis, corgisByOwner };
}
