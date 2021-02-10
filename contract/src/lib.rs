use near_sdk::collections::Vector;
use near_sdk::collections::UnorderedMap;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};
use near_sdk::serde::Serialize;

#[global_allocator]
static ALLOC: near_sdk::wee_alloc::WeeAlloc = near_sdk::wee_alloc::WeeAlloc::INIT;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Model {
    corgis: UnorderedMap<String, Vector<Corgi>>
}

/// Represents a `Corgi`.
/// The `name` and `quote` are set by the user.
/// 
/// The `Corgi` struct is used as part of the public interface of the contract.
/// See, for example, [`get_corgis_by_owner`](Model::get_corgis_by_owner).
/// Every struct that is part of the public interface needs to be serializable
/// to JSON as well.
/// The following attributes allows JSON serialization with no need to import 
/// serde directly. 
/// 
/// ```ignore
/// #[derive(Serialize)]
/// #[serde(crate = "near_sdk::serde")]
/// ```
/// 
#[derive(BorshDeserialize, BorshSerialize)]
#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Corgi {
    id: String,
    name: String,
    quote: String,
}

impl Default for Model {
    fn default() -> Self {
        env::log(b"Default initialization of corgis model");
        Self {
            corgis: UnorderedMap::new(b"corgis".to_vec()),
        }
    }
}

#[near_bindgen]
impl Model {

    /// Initializes the contract.
    /// 
    /// ```sh
    /// near deploy --wasmFile target/wasm32-unknown-unknown/release/rust_corgis.wasm --initFunction init --initArgs '{}'  
    /// ```
    /// 
    #[init]
    pub fn new() -> Self {
        env::log(b"Init non-default CorgisContract");
        Self {
            corgis: UnorderedMap::new(b"corgis".to_vec()),
        }
    }

    /// Creates a `Corgi` under the `signer_account_id`.
    /// 
    /// 
    pub fn create_corgi(&mut self, name: String, quote: String) {
        let owner = env::signer_account_id();
        env::log(format!("create corgi owned by {}", owner).as_bytes());

        let corgi = Corgi {id: "doggy".to_owned(), name, quote};
        match self.corgis.get(&owner) {
            None => {
                let mut list = Vector::new(b"owner".to_vec());
                list.push(&corgi);
                self.corgis.insert(&owner, &list);
            }
            Some(mut list) => {
                list.push(&corgi);
                self.corgis.insert(&owner, &list);
            }
        }
    }

    /// Returns 8-bit signed integer of the counter value.
    ///
    /// This must match the type from our struct's 'val' defined above.
    ///
    /// Note, the parameter is `&self` (without being mutable) meaning it doesn't modify state.
    /// In the frontend (/src/main.js) this is added to the "viewMethods" array
    /// using near-cli we can call this by:
    ///
    /// ```bash
    /// near view counter.YOU.testnet get_num
    /// ```
    /// 
    pub fn get_corgis_by_owner(&self, owner: String) -> Vec<Corgi> {
        env::log(format!("get corgis by owner <{}>", owner).as_bytes());

        match self.corgis.get(&owner) {
            None => Vec::new(),
            Some(list) => list.to_vec(),
        }
    }

    /// Get current users `Corgi`s.
    pub fn get_my_corgis(&self) -> Vec<Corgi> {
        let owner = env::current_account_id();
        env::log(format!("get current user's <{}> corgis", owner).as_bytes());

        self.get_corgis_by_owner(owner)
    }

    pub fn get_global_corgis(&self) -> Vec<Corgi> {
        env::log(format!("get global list of corgis").as_bytes());

        let mut list = Vec::new();
        for set in self.corgis.values() {
            for corgi in set.iter() {
                list.push(corgi);
            }
        }
        list
    }

}

// use the attribute below for unit tests
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};

    // part of writing unit tests is setting up a mock context
    // in this example, this is only needed for env::log in the contract
    // this is also a useful list to peek at when wondering what's available in env::*
    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice.testnet".to_string(),
            signer_account_id: "robert.testnet".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "jane.testnet".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    #[test]
    fn initial_global_corgis() {
        let context = get_context(vec![], false);
        testing_env!(context);

        let contract = Model::new();
        let corgis = contract.get_global_corgis();
        assert_eq!(0, corgis.len());
    }

    #[test]
    fn create_a_corgi() {
        let context = get_context(vec![], false);
        let signer = context.signer_account_id.to_owned();
        testing_env!(context);

        let mut contract = Model::new();
        assert_eq!(0, contract.get_global_corgis().len());

        contract.create_corgi("doggy".to_owned(), "dog".to_owned());

        assert_eq!(1, contract.get_global_corgis().len());
        assert_eq!(1, contract.get_corgis_by_owner(signer).len());
    }

    #[test]
    fn create_a_few_corgis() {
        let context = get_context(vec![], false);
        let signer = context.signer_account_id.to_owned();
        testing_env!(context);

        let mut contract = Model::new();
        assert_eq!(0, contract.get_global_corgis().len());

        let n = 5;
        for _ in 1..=n {
            contract.create_corgi("doggy".to_owned(), "dog".to_owned());
        }

        assert_eq!(n, contract.get_global_corgis().len());
        assert_eq!(n, contract.get_corgis_by_owner(signer).len());
    }

}