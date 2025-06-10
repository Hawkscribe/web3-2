import { useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

function WalletBalance() {
    const { connection } = useConnection(); // ✅ Access the Solana connection
    const { publicKey, connected } = useWallet();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            if (connected && publicKey) {
                try {
                    const lamports = await connection.getBalance(publicKey);
                    setBalance(lamports / LAMPORTS_PER_SOL); // Convert to SOL
                    console.log("Wallet Balance:", lamports / LAMPORTS_PER_SOL);
                } catch (error) {
                    console.error("Failed to fetch balance", error);
                }
            }
        };
        fetchBalance();
    }, [connected, publicKey, connection]);

    return (
        <div>
            {connected && balance !== null
                ? `The balance in the wallet is: ${balance.toFixed(4)} SOL`
                : `Please connect wallet`}
        </div>
    );
}

export default WalletBalance;
