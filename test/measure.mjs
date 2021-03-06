import { Near, Contract, keyStores, KeyPair, utils } from 'near-api-js';
import fs from 'fs';
import chalk from 'chalk';
import getConfig from '../src/config.js';

const corgiConfig = JSON.parse(fs.readFileSync('contract/config.json', 'utf8'));
const GAS = 300000000000000;
const MINT_FEE = corgiConfig.mint_fee.replace(/_/g, '');

utils.format.parseNearAmount('asdf')

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

async function getStats(account) {
  const state = await account.state();
  const balance = await account.getAccountBalance();

  const stats = {
    ...state,
    ...balance,
  }

  const amountf = (b, prop) => chalk.yellow(prop + '=Ⓝ ' + utils.format.formatNearAmount(b[prop], 8));
  const isContract = state.code_hash == '11111111111111111111111111111111' ? '' : '\u270e';
  console.info(`> ${isContract} ${account.accountId} ${amountf(balance, 'total')} ${amountf(balance, 'stateStaked')} ${state.storage_usage} ${amountf(balance, 'available')}`);

  return stats;
}

const near = new Near({
  deps: { keyStore: keyStore },
  ...config
});

const contractAccount = await createAccount('stage')
await getStats(contractAccount);

const wasmDataPath = 'contract/target/wasm32-unknown-unknown/release/corgis_nft.wasm';
const wasmData = fs.readFileSync(wasmDataPath);
console.log(`Deploying contract..`);
const exec = await contractAccount.deployContract(wasmData);
console.log(exec);

await getStats(contractAccount);

const userAccount = await createAccount('user');
const contract = new Contract(userAccount, contractAccount.accountId, {
  viewMethods: ['get_corgi_by_id', 'get_corgis_by_owner', 'get_global_corgis', 'get_corgis_page_limit'],
  changeMethods: ['transfer_corgi', 'create_corgi', 'delete_corgi'],
  signer: userAccount.accountId
});


for (let i = 0; i < 50; i++) {
  const args = { name: 'doggy dog', quote: 'best doggy ever', color: 'red', background_color: 'yellow' };
  const result = await contract.account.functionCall(contract.contractId, 'create_corgi', args, GAS, MINT_FEE);
  const gasBurnt = Number((result.transaction_outcome.outcome.gas_burnt / 1e12).toFixed(8));
  console.debug(gasBurnt);
  await getStats(contractAccount);
}
