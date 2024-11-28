import { useState } from 'react';
import { ethers } from 'ethers';

export const useEthereumWallet = () => {
  const [account, setAccount] = useState<string>('');

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting to Ethereum wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return { account, connect };
};
