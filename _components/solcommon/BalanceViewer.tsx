import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import React, { FC,useState, useEffect } from 'react';

export const BalanceViewer: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const [balance, setBalance] = useState(0);


    const getBalance = () => {
        return (Math.round(balance/100000000) / 10) + " SOL" 
    }

    const getNetwork = () => {
        const net = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
        return net.toUpperCase();
    }

    const updateBalance = () => {
        if (publicKey != null ) {
            connection.getBalance(publicKey)
            .then((bal)=>{
                setBalance(bal)
            })
        }
    }

    useEffect(()=>{updateBalance()}, [publicKey, updateBalance])

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            { publicKey != null ? (
                <div>
                        {/* publicKey?.toString().slice(0, 10) */}
                        {/* <h6>Wallet Address: {publicKey.toString()}</h6> */}
                        {/* <h6>Network: {getNetwork()}</h6> */}
                        <h3>Your Balance: {getBalance()}</h3> 
                        {/* <Button onClick={toggleShowSol} >Show {showSol ? 'Lamports' : 'SOL'}</Button> */}
                        {/* <Button onClick={updateBalance}>Update Balance</Button> */}
                        {/* <button style={{height: '50%', margin: "auto"}} onClick=</button>
                        <button style={{height: '50%', margin: "auto"}} onClick={updateBalance}></button> */}
                </div>
            ): "Connect Your Wallet To View Your Balance"}
        </div>
    );
};