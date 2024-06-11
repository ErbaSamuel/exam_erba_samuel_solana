import { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import * as fs from 'fs';


const secretKeyString = fs.readFileSync('wallet.json', 'utf8');
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const wallet = Keypair.fromSecretKey(secretKey);

(async () => {
  
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  
  console.log('Richiesta di airdrop di 2 SOL...');
  const airdropSignature = await connection.requestAirdrop(
    wallet.publicKey,
    2 * LAMPORTS_PER_SOL
  );

 
  await connection.confirmTransaction(airdropSignature);

  console.log('Airdrop completato con successo!');
})();
