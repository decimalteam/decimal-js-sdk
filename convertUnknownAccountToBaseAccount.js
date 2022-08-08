const cosmos = require('@cosmos-client/core')
const { proto, rest } = cosmosclient;


export const convertUnknownAccountToBaseAccount = (unknownAccount) => {
  if (unknownAccount === undefined) {
    return unknownAccount;
  } else if (unknownAccount === null) {
    return unknownAccount;
  } else if (unknownAccount instanceof proto.cosmos.auth.v1beta1.BaseAccount) {
    return unknownAccount;
  } else if (unknownAccount instanceof proto.cosmos.vesting.v1beta1.BaseVestingAccount) {
    if (unknownAccount.base_account === null) {
      return undefined;
    }
    return new proto.cosmos.auth.v1beta1.BaseAccount(unknownAccount.base_account);
  } else if (unknownAccount instanceof proto.cosmos.vesting.v1beta1.ContinuousVestingAccount) {
    if (unknownAccount.base_vesting_account?.base_account === null) {
      return undefined;
    }
    return new proto.cosmos.auth.v1beta1.BaseAccount(unknownAccount.base_vesting_account?.base_account);
  } else if (unknownAccount instanceof proto.cosmos.vesting.v1beta1.DelayedVestingAccount) {
    if (unknownAccount.base_vesting_account?.base_account === null) {
      return undefined;
    }
    return new proto.cosmos.auth.v1beta1.BaseAccount(unknownAccount.base_vesting_account?.base_account);
  } else if (unknownAccount instanceof proto.cosmos.vesting.v1beta1.PeriodicVestingAccount) {
    if (unknownAccount.base_vesting_account?.base_account === null) {
      return undefined;
    }
    return new proto.cosmos.auth.v1beta1.BaseAccount(unknownAccount.base_vesting_account?.base_account);
  } else if (unknownAccount instanceof proto.cosmos.vesting.v1beta1.PermanentLockedAccount) {
    if (unknownAccount.base_vesting_account?.base_account === null) {
      return undefined;
    }
    return new proto.cosmos.auth.v1beta1.BaseAccount(unknownAccount.base_vesting_account?.base_account);
  } else if (unknownAccount instanceof proto.cosmos.auth.v1beta1.ModuleAccount) {
    if (unknownAccount.base_account === null) {
      return undefined;
    }
    return new proto.cosmos.auth.v1beta1.BaseAccount(unknownAccount.base_account);
  } else {
    console.error('Unsupported Account!');
    console.error(unknownAccount);
    return undefined;
  }
};
