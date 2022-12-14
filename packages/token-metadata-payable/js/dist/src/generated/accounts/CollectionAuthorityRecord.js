"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionAuthorityRecordBeet = exports.CollectionAuthorityRecord = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const Key_1 = require("../types/Key");
class CollectionAuthorityRecord {
    constructor(key, bump, updateAuthority) {
        this.key = key;
        this.bump = bump;
        this.updateAuthority = updateAuthority;
    }
    static fromArgs(args) {
        return new CollectionAuthorityRecord(args.key, args.bump, args.updateAuthority);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return CollectionAuthorityRecord.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find CollectionAuthorityRecord account at ${address}`);
        }
        return CollectionAuthorityRecord.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('h39cuaMfR1mQBrz4udyCJjVTKWuYuyGmdb6Nqw44F3d')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.collectionAuthorityRecordBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.collectionAuthorityRecordBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.collectionAuthorityRecordBeet.serialize(this);
    }
    static byteSize(args) {
        const instance = CollectionAuthorityRecord.fromArgs(args);
        return exports.collectionAuthorityRecordBeet.toFixedFromValue(instance).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(CollectionAuthorityRecord.byteSize(args), commitment);
    }
    pretty() {
        return {
            key: 'Key.' + Key_1.Key[this.key],
            bump: this.bump,
            updateAuthority: this.updateAuthority,
        };
    }
}
exports.CollectionAuthorityRecord = CollectionAuthorityRecord;
exports.collectionAuthorityRecordBeet = new beet.FixableBeetStruct([
    ['key', Key_1.keyBeet],
    ['bump', beet.u8],
    ['updateAuthority', beet.coption(beetSolana.publicKey)],
], CollectionAuthorityRecord.fromArgs, 'CollectionAuthorityRecord');
//# sourceMappingURL=CollectionAuthorityRecord.js.map