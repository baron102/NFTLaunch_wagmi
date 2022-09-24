import React, { useState, useEffect, FC } from "react";
import { useContractWrite } from 'wagmi';
import wDragonFaucet from 'config/abi/wDragonFaucet.json';
const DonationTest = () => {
  const [recipient, setRecipient] = useState('0x9c00fdcA9A89a8E9b03f6ED73660f3C33d8Ed28a')
  const [amount, setAmount] = useState('100')
  const { data, isLoading, isSuccess, write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: '0x2e41D31478A5ba6cbD7A5052Cb158354C3851E2b',
    contractInterface: wDragonFaucet,
    functionName: 'transfer',
    args: [recipient, amount],
  })

  return (
    <div className="bg-gray-100">
        <div className="mx-auto py-3 container px-8 flex flex-row items-center justify-center pb-3 flex-wrap text-gray-600 gap-x-10 2xl:gap-x-60 2xl:gap-y-20">
            <input className="border" value={recipient} onChange={(e) => setRecipient(e.target.value)}/>
            <input className="border" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            <button className="big-btn nlk-gradient" disabled={!write} onClick={() => write?.()} >Donation</button>
        </div>
        <div className="mx-auto py-3">
        {isLoading && <div>Confirming</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </div>
    </div>  
  );
};

export default DonationTest;
