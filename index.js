require('dotenv').config();
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
} = require('@solana/web3.js')
require('dotenv').config();

const SECRET_KEY = new Uint8Array(
    JSON.parse(process.env.CLI_PRIVATE_KEY)
)

const transfer_sol = async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
    var from = Keypair.fromSecretKey(SECRET_KEY)
    console.log('from: ', from.publicKey.toString());

    const to = new PublicKey(process.env.VIVEK_PUB_KEY)
    console.log('to: ', to.toString());

    var transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: LAMPORTS_PER_SOL / 100
        })
    )

    // sign transaction
    var signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    )
    console.log("Signature is: ", signature)
}

transfer_sol()