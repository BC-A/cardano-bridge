import { useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { Header } from './components/Header';
import { BridgeCard } from './components/BridgeCard';
import { ConfirmDialog } from './components/ConfirmDialog'; // 确保引入 ConfirmDialog
import { useEthereumWallet } from './hooks/useEthereumWallet';
import { useCardanoWallet } from './hooks/useCardanoWallet';

function App() {
  const [amount, setAmount] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false); // 添加 confirmOpen 状态
  const { connect: connectEthereum } = useEthereumWallet();
  const { connect: connectCardano } = useCardanoWallet();

  const handleTransferClick = () => {
    if (!amount) {
      alert('Please enter an amount before transferring.'); // 简单验证
      return;
    }
    setConfirmOpen(true); // 打开 ConfirmDialog
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    console.log('Transfer confirmed! Amount:', amount); // 可以替换为实际逻辑
  };

  const handleClose = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="stretch"
        sx={{ height: '100vh', width: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 2,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Header 
            connectEthereum={connectEthereum}
            connectCardano={connectCardano}
          />
        </Box>

        <BridgeCard
          amount={amount}
          setAmount={setAmount}
          onTransfer={handleTransferClick}
        />

        {/* ConfirmDialog */}
        <ConfirmDialog
          open={confirmOpen}
          onClose={handleClose}
          amount={amount}
          fee={(parseFloat(amount) * 0.01).toFixed(4)} // 假设费用是 1%
          estimatedTime="5-10 minutes"
          onConfirm={handleConfirm}
        />
      </Box>
    </>
  );
}

export default App;
