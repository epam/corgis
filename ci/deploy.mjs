import { parseSeedPhrase } from 'near-seed-phrase';
import { Near, keyStores, KeyPair, utils, transactions } from 'near-api-js';
import getConfig from '../src/config.js';
import fs from 'fs';
import chalk from 'chalk';
import { exit } from 'process';

import autobahn from 'autobahn';

const seedPhraseVar = 'SEED_PHRASE';
const seedPhrase = process.env[seedPhraseVar];
if (!seedPhrase) {
    console.log(chalk.red('Could not find seed phrase in environment variable', chalk.bold(seedPhraseVar) + ', aborting deploy'));
    exit(1);
}
console.log(`> Seed phrase from $${chalk.bold(seedPhraseVar)} environment variable`);

const nearEnv = process.env.NEAR_ENV || process.env.NODE_ENV || 'development';
console.log(`> NEAR ${chalk.bold(nearEnv)} environment to load config`);
const config = getConfig(nearEnv);

const [subAccountPrefix, accountId] = (() => {
    const parts = config.contractName.split('.');
    if (parts.length < 3) {
        console.log(`${chalk.red('Contract name needs at least 3 account parts')}`);
        exit(1);
    }
    return [parts[0], parts.slice(1).join('.')];
})();
console.log(`> Deploy to ${chalk.bold(config.nodeUrl)} with contract name ${chalk.bold.yellow(subAccountPrefix)}.${chalk.bold.magenta(accountId)}`);

const wasmDataPath = 'contract/target/wasm32-unknown-unknown/release/corgis_nft.wasm';
console.log(`> WASM binary to deploy is ${chalk.bold(wasmDataPath)}`);
const wasmData = fs.readFileSync(wasmDataPath);

exit(1);

const initialBalanceAmount = '20';
const initialBalance = utils.format.parseNearAmount(initialBalanceAmount);
console.log(`> Initial balance to use if account is created ${chalk.yellow.bold(initialBalanceAmount, 'Ⓝ')}`);

const seedPhraseKeyPair = parseSeedPhrase(seedPhrase);
const keyStore = new keyStores.InMemoryKeyStore();
await keyStore.setKey(config.networkId, accountId, KeyPair.fromString(seedPhraseKeyPair.secretKey));
await keyStore.setKey(config.networkId, config.contractName, KeyPair.fromString(seedPhraseKeyPair.secretKey));
const near = new Near({
    deps: { keyStore: keyStore },
    masterAccount: accountId,
    initialBalance,
    ...config
});
console.log(`> Public key ${chalk.bold(seedPhraseKeyPair.publicKey)}`);

const account = await (async () => {
    try {
        console.log(chalk.gray('..Fetch state for account', config.contractName));
        return await near.account(config.contractName);
    } catch (e) {
        if (!e.message.includes('does not exist while viewing')) {
            console.log(e.message);
            exit(1);
        }

        console.log(chalk.gray('..Account does not exist, create it'));
        return await near.createAccount(config.contractName, seedPhraseKeyPair.publicKey);
    }
})();

const amountf = (balance, prop) => chalk.yellow(prop + ':' + utils.format.formatNearAmount(balance[prop], 8) + 'Ⓝ');
const state = await account.state();
const b = await account.getAccountBalance();
const hasContract = state.code_hash == '11111111111111111111111111111111111111111111' ? 'no ' : 'yes';
console.log(`> ${account.accountId} contract: ${hasContract} ${amountf(b, 'total')}  ${amountf(b, 'stateStaked')}  ${amountf(b, 'available')}`);





class Explorer {
    constructor() {
        this.connection = new autobahn.Connection({
            realm: "near-explorer",
            transports: [
                {
                    url: 'wss://near-explorer-wamp.onrender.com/ws',
                    type: "websocket",
                },
            ],
            retry_if_unreachable: true,
            max_retries: Number.MAX_SAFE_INTEGER,
            max_retry_delay: 10,
        });
    }

    open() {
        return new Promise((resolve, reject) => {
            this.connection.onopen = (session) => resolve(session);
            this.connection.onclose = (reason) => reject(reason);
            this.connection.open();
        });
    }

    close() {
        this.connection._transport.onclose = () => { };
        this.connection.close();
    }
}



const c = new Explorer();
const s = await c.open();
// const sqlQuery = `SELECT * FROM transactions WHERE transaction_hash='BvkoZeGMBKucUSndojCLwpv2Ln2hha63FTMW46JfsEVd' and signer_account_id='${accountId}' LIMIT 20`;
const sqlQuery = `SELECT DISTINCT t.receiver_account_id FROM transactions t LEFT JOIN transaction_actions ta ON ta.transaction_hash=t.transaction_hash WHERE ta.action_kind='CREATE_ACCOUNT' AND t.signer_account_id='${accountId}'`;
const result = await s.call(`com.nearprotocol.${'testnet'}.explorer.select:INDEXER_BACKEND`, [sqlQuery]);


console.log(result);

c.close();

for (const { receiver_account_id } of result) {
    process.stdout.write(`Fetching contract account ${receiver_account_id} .. `);
    try {
        const contractAccount = await near.account(receiver_account_id);
        await contractAccount.deleteAccount(accountId);
        console.log(`Contract account ${receiver_account_id} was succefully deleted`);
    } catch (e) {
        console.log(`Contract account ${receiver_account_id} could not be deleted`);
    }
}

// account.deleteAccount(accountId)


// const exec = await account.deployContract(wasmData);
// console.log(exec);
