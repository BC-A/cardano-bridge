import { useState } from 'react';
import { Box, Button, Paper, Typography, IconButton, Select, MenuItem, FormControl, InputLabel, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';  // 双箭头图标
import { ConfirmDialog } from './ConfirmDialog';

interface BridgeCardProps {
  onTransfer: () => void;
  amount: string;
  setAmount: (value: string) => void;
}

export const BridgeCard = ({ onTransfer, amount, setAmount }: BridgeCardProps) => {
  // State for the first (top) section
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = () => {
    setConfirmOpen(false);  // Close the dialog
    onTransfer();  // Proceed with the transfer
  };
  const handleClose = () => {
    setConfirmOpen(false);
  };

  const [network1, setNetwork1] = useState('Ethereum'); // Network 1
  const [token1, setToken1] = useState('ETH'); // Token 1
  const [amount1, setAmount1] = useState(amount); // Amount 1

  // State for the second (bottom) section
  const [network2, setNetwork2] = useState('Cardano'); // Network 2
  const [token2, setToken2] = useState('ADA'); // Token 2
  const [amount2, setAmount2] = useState(''); // Amount 2

  // State to control the order of the sections
  const [reverseOrder, setReverseOrder] = useState(false);

  // Handle network and token selection changes for section 1
  const handleNetwork1Change = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedNetwork = event.target.value as string;
    setNetwork1(selectedNetwork);
    setNetwork2(selectedNetwork === 'Ethereum' ? 'Cardano' : 'Ethereum'); // 自动切换下半部分网络
  };

  const handleToken1Change = (event: React.ChangeEvent<{ value: unknown }>) => {
    setToken1(event.target.value as string);
    setToken2(event.target.value as string);
  };

  // Handle amount change for section 1
  const handleAmount1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount1(event.target.value);
    setAmount(event.target.value)
    if (network1 === 'Ethereum' && token1 === 'ETH') {
      const calculatedAmount2 = (parseFloat(event.target.value) * 2000).toFixed(2);
      setAmount2(calculatedAmount2); // Calculate Cardano equivalent
    }
  };

  // Handle network and token selection changes for section 2
  const handleNetwork2Change = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedNetwork = event.target.value as string;
    setNetwork2(selectedNetwork);
    setNetwork1(selectedNetwork === 'Ethereum' ? 'Cardano' : 'Ethereum'); // 自动切换下半部分网络
  };

  const handleToken2Change = (event: React.ChangeEvent<{ value: unknown }>) => {
    setToken1(event.target.value as string);
    setToken2(event.target.value as string);
  };

  // Handle amount change for section 2
  const handleAmount2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount2(event.target.value);
    setAmount(event.target.value)
    if (network2 === 'Ethereum' && token2 === 'ETH') {
      const calculatedAmount1 = (parseFloat(event.target.value) / 2000).toFixed(2);
      setAmount1(calculatedAmount1); // Calculate Ethereum equivalent
    }
  };

  // Toggle the order of Ethereum and Cardano sections
  const toggleOrder = () => {
    setReverseOrder(!reverseOrder);
  };

  return (
    <Paper sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ color: '#666', mb: 3 }}>
        Cardano Bridge
      </Typography>

      {/* Top section */}
      {reverseOrder ? (
        <>
          {/* <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Network</InputLabel>
            <Select value={network2} onChange={handleNetwork2Change}>
              <MenuItem value="Ethereum">Ethereum</MenuItem>
              <MenuItem value="Cardano">Cardano</MenuItem>
            </Select>
          </FormControl> */}

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0', padding: '0.5rem', borderRadius: '4px', mr: 2 }}>
              From network:
            </Typography>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={network2}
                onChange={handleNetwork2Change}
                displayEmpty
                sx={{
                  '& .MuiSelect-icon': {
                    color: 'black', // 可以设置下拉箭头颜色
                  }
                }}
              >
                <MenuItem value="Ethereum">Ethereum</MenuItem>
                <MenuItem value="Cardano">Cardano</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
            <FormControl sx={{ width: '120px', mr: 2 }}>
              <Select value={token2} onChange={handleToken2Change}>
                <MenuItem value="ETH">ETH</MenuItem>
                <MenuItem value="ADA">ADA</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label={`Amount (${token2})`}
              value={amount2}
              onChange={handleAmount2Change}
              InputLabelProps={{ shrink: true }}  // Ensure the label stays on top
            />
          </Box>

          <IconButton onClick={toggleOrder} sx={{ mx: 2 }}>
            <ArrowForwardIosIcon />
          </IconButton>

          {/* <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Network</InputLabel>
            <Select value={network1} onChange={handleNetwork1Change}>
              <MenuItem value="Ethereum">Ethereum</MenuItem>
              <MenuItem value="Cardano">Cardano</MenuItem>
            </Select>
          </FormControl> */}

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0', padding: '0.5rem', borderRadius: '4px', mr: 2 }}>
              To network:
            </Typography>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={network1}
                onChange={handleNetwork1Change}
                displayEmpty
                sx={{
                  '& .MuiSelect-icon': {
                    color: 'black', // 可以设置下拉箭头颜色
                  }
                }}
              >
                <MenuItem value="Ethereum">Ethereum</MenuItem>
                <MenuItem value="Cardano">Cardano</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
            <FormControl sx={{ width: '120px', mr: 2 }}>
              <Select value={token1} onChange={handleToken1Change}>
                <MenuItem value="ETH">ETH</MenuItem>
                <MenuItem value="ADA">ADA</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label={`Amount (${token1})`}
              value={amount1}
              onChange={handleAmount1Change}
              InputLabelProps={{ shrink: true }}  // Ensure the label stays on top
            />
          </Box>
        </>
      ) : (
        <>
          {/* <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Network</InputLabel>
            <Select value={network1} onChange={handleNetwork1Change}>
              <MenuItem value="Ethereum">Ethereum</MenuItem>
              <MenuItem value="Cardano">Cardano</MenuItem>
            </Select>
          </FormControl> */}

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0', padding: '0.5rem', borderRadius: '4px', mr: 2 }}>
              From network:
            </Typography>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={network1}
                onChange={handleNetwork1Change}
                displayEmpty
                sx={{
                  '& .MuiSelect-icon': {
                    color: 'black', // 可以设置下拉箭头颜色
                  }
                }}
              >
                <MenuItem value="Ethereum">Ethereum</MenuItem>
                <MenuItem value="Cardano">Cardano</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
            <FormControl sx={{ width: '120px', mr: 2 }}>
              <Select value={token1} onChange={handleToken1Change}>
                <MenuItem value="ETH">ETH</MenuItem>
                <MenuItem value="ADA">ADA</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label={`Amount (${token1})`}
              value={amount1}
              onChange={handleAmount1Change}
              InputLabelProps={{ shrink: true }}  // Ensure the label stays on top
            />
          </Box>

          <IconButton onClick={toggleOrder} sx={{ mx: 2 }}>
            <ArrowForwardIosIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0', padding: '0.5rem', borderRadius: '4px', mr: 2 }}>
              To network:
            </Typography>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={network2}
                onChange={handleNetwork2Change}
                displayEmpty
                sx={{
                  '& .MuiSelect-icon': {
                    color: 'black', // 可以设置下拉箭头颜色
                  }
                }}
              >
                <MenuItem value="Ethereum">Ethereum</MenuItem>
                <MenuItem value="Cardano">Cardano</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
            <FormControl sx={{ width: '120px', mr: 2 }}>
              <Select value={token2} onChange={handleToken2Change}>
                <MenuItem value="ETH">ETH</MenuItem>
                <MenuItem value="ADA">ADA</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label={`Amount (${token2})`}
              value={amount2}
              onChange={handleAmount2Change}
              InputLabelProps={{ shrink: true }}  // Ensure the label stays on top
            />
          </Box>
        </>
      )}

      <Typography variant="body2" sx={{ color: '#666', my: 2 }}>
        Includes a xxx% xxxx fee
      </Typography>

      <Button
        fullWidth
        variant="contained"
        onClick={onTransfer}
        sx={{ backgroundColor: '#6c8ff8' }}
      >
        Transfer
      </Button>

      <Typography variant="caption" sx={{ 
        color: '#666',
        display: 'block',
        textAlign: 'center',
        mt: 2
      }}>
        By confirming, you agree to xxx
      </Typography>
      <ConfirmDialog
        open={confirmOpen}
        onClose={handleClose}
        amount={amount}
        fee={(parseFloat(amount) * 0.01).toFixed(4)} // 假设费用是 1%
        estimatedTime="5-10"
        onConfirm={handleConfirm}
      />
    </Paper>
  );
};
