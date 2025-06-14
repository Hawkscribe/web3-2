import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { useState } from "react"; // ✅ Added this

export function SendToken(){
    const wallet = useWallet();
    const [senderPubkey, setSenderPubkey] = useState("");
    const [amount, setAmount] = useState("");
    const { connection } = useConnection(); // ✅ Added ()

    async function sendToken(){
        let to = senderPubkey;
        let sum = parseFloat(amount); // ✅ Parse amount
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey, // ✅ fixed typo (fromPubKey → fromPubkey)
            toPubkey: new PublicKey(to),   // ✅ fixed typo (toPubKey → toPubkey)
            lamports: sum * LAMPORTS_PER_SOL,
        }));
        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + sum + " SOL to " + senderPubkey);
    }

    return (
        <>
            <input type="text" placeholder="Receiver's Public key..." onChange={(e)=>{
                setSenderPubkey(e.target.value);
            }}/>
            <input type="text" placeholder="Enter the amount" onChange={(e)=>{
                setAmount(e.target.value);
            }}/>
            <button onClick={sendToken}>Send</button>
        </>
    );
}
