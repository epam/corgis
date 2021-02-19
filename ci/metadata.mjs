
const metadata = JSON.parse(fs.readFileSync('contract/target/wasm32-unknown-unknown/release/metadata.json'));
if (metadata.packages.length !== 1) {
    console.log(`${chalk.red('Metadata for contract must contain exactly one package')}`);
    exit(1);
}
const version = metadata.packages[0].version;
console.log(`> Contract version from metadata is ${chalk.bold(version)}`);