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
exports.tokenOwnedEscrowBeet = exports.TokenOwnedEscrow = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const Key_1 = require("../types/Key");
const EscrowAuthority_1 = require("../types/EscrowAuthority");
class TokenOwnedEscrow {
    constructor(key, baseToken, authority, bump) {
        this.key = key;
        this.baseToken = baseToken;
        this.authority = authority;
        this.bump = bump;
    }
    static fromArgs(args) {
        return new TokenOwnedEscrow(args.key, args.baseToken, args.authority, args.bump);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return TokenOwnedEscrow.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find TokenOwnedEscrow account at ${address}`);
        }
        return TokenOwnedEscrow.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('h39cuaMfR1mQBrz4udyCJjVTKWuYuyGmdb6Nqw44F3d')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.tokenOwnedEscrowBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.tokenOwnedEscrowBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.tokenOwnedEscrowBeet.serialize(this);
    }
    static byteSize(args) {
        const instance = TokenOwnedEscrow.fromArgs(args);
        return exports.tokenOwnedEscrowBeet.toFixedFromValue(instance).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(TokenOwnedEscrow.byteSize(args), commitment);
    }
    pretty() {
        return {
            key: 'Key.' + Key_1.Key[this.key],
            baseToken: this.baseToken.toBase58(),
            authority: this.authority.__kind,
            bump: this.bump,
        };
    }
}
exports.TokenOwnedEscrow = TokenOwnedEscrow;
exports.tokenOwnedEscrowBeet = new beet.FixableBeetStruct([
    ['key', Key_1.keyBeet],
    ['baseToken', beetSolana.publicKey],
    ['authority', EscrowAuthority_1.escrowAuthorityBeet],
    ['bump', beet.u8],
], TokenOwnedEscrow.fromArgs, 'TokenOwnedEscrow');
//# sourceMappingURL=TokenOwnedEscrow.js.map