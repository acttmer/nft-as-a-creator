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
exports.createCreateMasterEditionInstruction = exports.createMasterEditionInstructionDiscriminator = exports.CreateMasterEditionStruct = void 0;
const splToken = __importStar(require("@solana/spl-token"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const CreateMasterEditionArgs_1 = require("../types/CreateMasterEditionArgs");
exports.CreateMasterEditionStruct = new beet.FixableBeetArgsStruct([
    ['instructionDiscriminator', beet.u8],
    ['createMasterEditionArgs', CreateMasterEditionArgs_1.createMasterEditionArgsBeet],
], 'CreateMasterEditionInstructionArgs');
exports.createMasterEditionInstructionDiscriminator = 10;
function createCreateMasterEditionInstruction(accounts, args, programId = new web3.PublicKey('h39cuaMfR1mQBrz4udyCJjVTKWuYuyGmdb6Nqw44F3d')) {
    var _a, _b, _c;
    const [data] = exports.CreateMasterEditionStruct.serialize({
        instructionDiscriminator: exports.createMasterEditionInstructionDiscriminator,
        ...args,
    });
    const keys = [
        {
            pubkey: accounts.edition,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: accounts.mint,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: accounts.updateAuthority,
            isWritable: false,
            isSigner: true,
        },
        {
            pubkey: accounts.mintAuthority,
            isWritable: false,
            isSigner: true,
        },
        {
            pubkey: accounts.payer,
            isWritable: true,
            isSigner: true,
        },
        {
            pubkey: accounts.metadata,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: (_a = accounts.tokenProgram) !== null && _a !== void 0 ? _a : splToken.TOKEN_PROGRAM_ID,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: (_b = accounts.systemProgram) !== null && _b !== void 0 ? _b : web3.SystemProgram.programId,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: (_c = accounts.rent) !== null && _c !== void 0 ? _c : web3.SYSVAR_RENT_PUBKEY,
            isWritable: false,
            isSigner: false,
        },
    ];
    const ix = new web3.TransactionInstruction({
        programId,
        keys,
        data,
    });
    return ix;
}
exports.createCreateMasterEditionInstruction = createCreateMasterEditionInstruction;
//# sourceMappingURL=CreateMasterEdition.js.map