use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    program::invoke,
    program_error::ProgramError,
    pubkey::Pubkey,
    system_instruction::transfer,
};
use spl_token::state::Account;

use crate::{
    assertions::{assert_initialized, assert_owned_by},
    error::MetadataError,
    state::{Metadata, TokenMetadataAccount},
};

pub fn process_split_royalty(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();

    let metadata_account_info = next_account_info(account_info_iter)?;
    let owner_info = next_account_info(account_info_iter)?;
    let token_account_info = next_account_info(account_info_iter)?;

    let token_account: Account = assert_initialized(token_account_info)?;
    let metadata = Metadata::from_account_info(metadata_account_info)?;

    assert_owned_by(metadata_account_info, program_id)?;
    // assert_owned_by(token_account_info, &spl_token::id())?;

    if !owner_info.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    if token_account.amount == 0 {
        return Err(MetadataError::NoBalanceInAccountForAuthorization.into());
    }

    if token_account.mint != metadata.mint {
        return Err(MetadataError::MintMismatch.into());
    }

    let total_amount = token_account.amount;

    for creator in metadata.data.creators.unwrap() {
        let result = invoke(
            &transfer(
                token_account_info.key,
                &creator.address,
                total_amount * (creator.share as u64) / 100 as u64,
            ),
            &[token_account_info.clone(), owner_info.clone()],
        );

        if !result.is_ok() {
            return Err(MetadataError::CouldNotSplitRoyalty.into());
        }
    }

    Ok(())
}
