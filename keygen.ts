import { Keypair } from "@solana/web3.js";
import * as fs from 'fs';

const keypair = Keypair.generate();
const secretKey = JSON.stringify(Array.from(keypair.secretKey));
fs.writeFileSync('wallet.json', secretKey);

console.log(`Hai generato il tuo nuovo wallet: ${keypair.publicKey.toBase58()}`)
