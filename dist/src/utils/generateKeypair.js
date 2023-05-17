"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const genKeyPair = () => {
    const keyPair = crypto_1.default.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });
    fs_1.default.writeFileSync(`${__dirname}/../keys/id_rsa_pub.pem`, keyPair.publicKey);
    fs_1.default.writeFileSync(`${__dirname}/../keys/id_rsa_priv.pem`, keyPair.privateKey);
};
genKeyPair();
