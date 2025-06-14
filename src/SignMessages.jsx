import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import * as ed25519 from "@noble/ed25519";
import bs58 from "bs58";

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState("");

    async function onClick() {
        if (!publicKey) {
            throw new Error("Wallet not connected");
        }
        if (!signMessage) {
            throw new Error("Wallet does not support message signing");
        }

        const encodedMessage = new TextEncoder().encode(message);
        const signature = new Uint8Array(await signMessage(encodedMessage));
        const pubkeyBytes = new Uint8Array(publicKey.toBuffer());

        const isValid = await ed25519.verifyAsync(
            signature,
            encodedMessage,
            pubkeyBytes
        ); // ✅ use verifyAsync instead of verify

        if (!isValid) {
            throw new Error("Message signature invalid!");
        }

        alert(`✅ Success!\nSignature: ${bs58.encode(signature)}`);
    }

    return (
        <>
            <input
                type="text"
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={onClick}>Sign Message</button>
        </>
    );
}
