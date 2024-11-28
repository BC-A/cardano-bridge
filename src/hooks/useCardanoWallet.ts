import { useState } from 'react';

export const useCardanoWallet = () => {
  const [account, setAccount] = useState<string>('');

  const connect = async () => {
    // 实现 Cardano 钱包连接逻辑
    alert('Cardano wallet connection to be implemented');
  };

  return { account, connect };
};
