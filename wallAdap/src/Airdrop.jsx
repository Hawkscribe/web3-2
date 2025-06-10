import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState("");

    async function requestAirdrop() {
        if (!wallet.publicKey) {
            alert("Connect your wallet first!");
            return;
        }

        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            alert("Enter a valid amount");
            return;
        }

        try {
            const signature = await connection.requestAirdrop(wallet.publicKey, amountNum * 1e9);
            await connection.confirmTransaction(signature, "confirmed");
            alert(`Airdropped ${amountNum} SOL to ${wallet.publicKey.toBase58()}`);
        } catch (err) {
            alert("Airdrop failed: " + err.message);
        }
    }

    return (
        <div>
            <br /><br />
            <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                placeholder="Amount"
            />
            <button onClick={requestAirdrop} disabled={!wallet.connected}>
                Request Airdrop
            </button>
        </div>
    );
}
