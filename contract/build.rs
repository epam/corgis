use std::{
    env,
    fs::{self, File},
    io::Write,
    path::Path,
};

use serde::Deserialize;
use serde_json::Result;

#[derive(Deserialize)]
struct Config {
    mint_fee: String,
    page_limit: u32,
}

fn main() -> Result<()> {
    println!("cargo:rerun-if-changed=config.json");

    let out_dir = env::var("OUT_DIR").expect("Output dir not defined");
    let dest_path = Path::new(&out_dir).join("config.rs");
    let mut f = File::create(&dest_path).expect("Could not create file");

    let data = fs::read_to_string("config.json").expect("Unable to read config file");
    let config: Config = serde_json::from_str(data.as_ref())?;

    writeln!(&mut f, "const MINT_FEE: u128 = {};", config.mint_fee).expect("Could not write");
    writeln!(&mut f, "const PAGE_LIMIT: u32 = {};", config.page_limit).expect("Could not write");

    Ok(())
}
