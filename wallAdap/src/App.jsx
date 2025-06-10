import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import WalletBalance from './balance.jsx';
import { Airdrop } from './Airdrop';

import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css';

function App() {
    const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint="https://api.devnet.solana.com">
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <main className="main-container">
                        <section className="faucet-panel">
                            <header className="header">
                                {/* <img src="https://cryptolohttps://create.vista.com/photos/solana/gos.cc/logos/solana-sol-logo.png" alt="Solana Logo" className="logo" /> */}
                                <h1>Solana Devnet Faucet</h1>
                                <p className="subtext">Test, build, and prototype faster with free Devnet SOL.</p>
                            </header>

                            <div className="wallet-section">
                                <WalletMultiButton className="wallet-btn" />
                                <WalletDisconnectButton className="wallet-btn secondary" />
                            </div>

                            <div className="balance-section">
                                <WalletBalance />
                            </div>

                            <div className="airdrop-section">
                                <Airdrop />
                            </div>

                            <footer className="footer">
                                <p>Powered by <a href="https://solana.com" target="_blank" rel="noreferrer">Solana Devnet</a></p>
                            </footer>
                        </section>
                    </main>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;
