import { Box, TextField, Typography } from '@mui/material';

interface TransferSectionProps {
  network: 'Ethereum' | 'Cardano';
  symbol: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export const TransferSection = ({ 
  network, 
  symbol, 
  disabled, 
  value, 
  onChange 
}: TransferSectionProps) => {
  return (
    <Box sx={{ 
      backgroundColor: '#f8f9fa',
      borderRadius: 1,
      p: 2,
      mb: 2
    }}>
      <Box sx={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 1,
        px: 2,
        py: 0.5,
        mb: 1
      }}>
        <Typography sx={{ mr: 1 }}>{symbol}</Typography>
        <Typography>{network}</Typography>
      </Box>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        placeholder={disabled ? '≈$0.0' : 'Enter amount'}
        variant="outlined"
        size="small"
      />
    </Box>
  );
};
