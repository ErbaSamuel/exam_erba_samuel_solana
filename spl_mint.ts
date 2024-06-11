import {
    Connection,
    Keypair,
    PublicKey,
    clusterApiUrl,
  } from '@solana/web3.js';
  import {
    getOrCreateAssociatedTokenAccount,
    mintTo,
  } from '@solana/spl-token';
  import * as fs from 'fs';
  
  const secretKeyString = fs.readFileSync('wallet.json', 'utf8');
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const wallet = Keypair.fromSecretKey(secretKey);
  
  
  const mintAddressString = fs.readFileSync('mint_address.json', 'utf8');
  const mintAddress = new PublicKey(JSON.parse(mintAddressString));
  
  (async () => {
    
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      mintAddress,
      wallet.publicKey
    );
  
    console.log(`Account del Token Creato: ${tokenAccount.address.toBase58()}`);
  
    
    await mintTo(
      connection,
      wallet,
      mintAddress,
      tokenAccount.address,
      wallet.publicKey,
      10000
    );
  
    console.log('Token mintati con successo!');
  })();
  