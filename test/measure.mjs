import { Near, Contract, keyStores, KeyPair, utils } from 'near-api-js';
import fs from 'fs';
import chalk from 'chalk';
import getConfig from '../src/config.js';

const corgiConfig = JSON.parse(fs.readFileSync('contract/config.json', 'utf8'));
const GAS = 300000000000000;
const MINT_FEE = corgiConfig.mint_fee.replace(/_/g, '');

const config = getConfig('development');
const keyStore = new keyStores.InMemoryKeyStore();

function generateUniqueAccountId(prefix) {
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1000000)}`;
}

async function createAccount(prefix) {
  const newKeyPair = KeyPair.fromRandom('ed25519');
  const account = await near.createAccount(generateUniqueAccountId(prefix), newKeyPair.getPublicKey());
  keyStore.setKey(config.networkId, account.accountId, newKeyPair);

  return account;
}

async function getState(account) {
  const state = await account.state();
  const balance = await account.getAccountBalance();

  const amountf = (b, prop) => chalk.yellow(prop + '=Ⓝ ' + utils.format.formatNearAmount(b[prop], 8));
  const isContract = state.code_hash == '11111111111111111111111111111111' ? '' : '\u270e';
  console.info(`> ${isContract} ${account.accountId} ${amountf(balance, 'total')} ${amountf(balance, 'stateStaked')} ${state.storage_usage} ${amountf(balance, 'available')}`);

  return {
    ...state,
    ...balance,
    // total: utils.format.formatNearAmount(balance.total),
    // stateStaked: utils.format.formatNearAmount(balance.stateStaked),
    // available: utils.format.formatNearAmount(balance.available),
  };
}

const near = new Near({
  deps: { keyStore: keyStore },
  ...config
});

class Trace {
  constructor(contractAccount, userAccount) {
    this.contractAccount = contractAccount;
    this.userAccount = userAccount;
    this.data = []

    this.append({});
  }

  async append(outcome) {
    this.data.push({
      ...outcome,
      contract: await getState(this.contractAccount),
      user: await getState(this.userAccount)
    });
  }
}

const contractAccount = await createAccount('stage')
const userAccount = await createAccount('user');
const trace = new Trace(contractAccount, userAccount);

const wasmDataPath = 'contract/target/wasm32-unknown-unknown/release/corgis_nft.wasm';
const wasmData = fs.readFileSync(wasmDataPath);
console.log(`Deploying contract..`);
trace.append(await contractAccount.deployContract(wasmData));

const contract = new Contract(userAccount, contractAccount.accountId, {
  viewMethods: ['get_corgi_by_id', 'get_corgis_by_owner', 'get_global_corgis'],
  changeMethods: ['transfer_corgi', 'create_corgi', 'delete_corgi'],
  signer: userAccount.accountId
});

trace.append(await contract.account.functionCall(contract.contractId, 'get_global_corgis', {}, GAS));
trace.append(await contract.account.functionCall(contract.contractId, 'get_corgis_by_owner', { owner: userAccount.accountId }, GAS));

const TIMES = 50;
const corgis = [];

for (let i = 0; i < TIMES; i++) {
  const args = { name: 'doggy dog', quote: 'best doggy ever', color: 'red', background_color: 'yellow' };
  const result = await contract.account.functionCall(contract.contractId, 'create_corgi', args, GAS, MINT_FEE);

  const corgi = JSON.parse(Buffer.from(result.status.SuccessValue, 'base64').toString());
  console.log(corgi.id)
  corgis.push(corgi);

  console.log(result);
  trace.append(result);
}

trace.append(await contract.account.functionCall(contract.contractId, 'get_corgis_by_owner', { owner: userAccount.accountId }, GAS));

for (let i = 0; i < TIMES; i++) {
  trace.append(await contract.account.functionCall(contract.contractId, 'get_corgi_by_id', { id: corgis[i].id }, GAS));
}

for (let i = 0; i < TIMES; i++) {
  trace.append(await contract.account.functionCall(contract.contractId, 'delete_corgi', { id: corgis[i].id }, GAS));
}

fs.writeFileSync('test/logs/trace.json', JSON.stringify(trace.data));
