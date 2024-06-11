import {
    Connection,
    Keypair,
    clusterApiUrl,
  } from '@solana/web3.js';
  import {
    createMint,
  } from '@solana/spl-token';
  import * as fs from 'fs';
  
 
  const secretKeyString = fs.readFileSync('wallet.json', 'utf8');
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const wallet = Keypair.fromSecretKey(secretKey);
  
  (async () => {
    
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  
    const mint = await createMint(
      connection,
      wallet, 
      wallet.publicKey, 
      null, 
      9 
    );
  
    console.log(`Token creato con successo! Mint Address: ${mint.toBase58()}`);
  
  
    fs.writeFileSync('mint_address.json', JSON.stringify(mint.toBase58()));
  })();
  