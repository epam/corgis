import { utils } from 'near-api-js';
import fs from 'fs';

function formatBalance(balance) {
    const amountf = (b, prop) => utils.format.formatNearAmount(b[prop], 8);
    return `Ⓝ ${amountf(balance, 'total')}=${amountf(balance, 'stateStaked')}+${amountf(balance, 'available')}`;
}

function formatNEAR(yoctoNEAR) {
    return Number(utils.format.formatNearAmount(yoctoNEAR));
}

function calculateGas(result) {
    // let gasBurnt = [];
    let tokensBurnt = [];
    // gasBurnt.push(result.transaction_outcome.outcome.gas_burnt);
    tokensBurnt.push(formatNEAR(result.transaction_outcome.outcome.tokens_burnt));
    for (let i = 0; i < result.receipts_outcome.length; i++) {
        // gasBurnt.push(result.receipts_outcome[i].outcome.gas_burnt);
        tokensBurnt.push(formatNEAR(result.receipts_outcome[i].outcome.tokens_burnt));
    }
    const gasBurnt = Number((result.transaction_outcome.outcome.gas_burnt / 1e12).toFixed(8));
    console.debug(gasBurnt);
    return {
        // gasBurnt: gasBurnt.reduce((acc, cur) => acc + cur, 0),
        tokensBurnt: tokensBurnt.reduce((acc, curr) => acc + curr, 0),
    };
}

function formatActions(transaction) {
    if (transaction === undefined) {
        return "<init>";
    }

    let result = "";
    for (const action of transaction.actions) {
        if (action.FunctionCall !== undefined) {
            result += action.FunctionCall.method_name;
        }
        if (action.DeployContract !== undefined) {
            result += '<deploy>';
        }
    }

    return result;
}

const trace = JSON.parse(fs.readFileSync('test/logs/trace.json'));

for (const entry of trace) {
    const actions = formatActions(entry.transaction);
    console.log(`${actions}: ${formatBalance(entry.contract)} ${formatBalance(entry.user)}`)
}
