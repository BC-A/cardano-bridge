import { Dialog, DialogTitle, IconButton, Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  amount: string;
  fee: string;
  estimatedTime: string;
  onConfirm: () => void;
}

export const ConfirmDialog = ({
  open,
  onClose,
  amount,
  fee,
  estimatedTime,
  onConfirm
}: ConfirmDialogProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#1a1a1a',
          color: 'white',
          borderRadius: 3,
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={onClose} sx={{ color: 'white', mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Confirm transaction</Typography>
        </Box>

        <Box sx={{ 
          bgcolor: 'rgba(255,255,255,0.1)', 
          borderRadius: 2, 
          p: 2, 
          mb: 3 
        }}>
          <Typography color="grey.400">You bridge</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="h6">{amount} ETH</Typography>
            <Typography color="grey.400">${(parseFloat(amount) * 1800).toFixed(2)}</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="grey.400">From</Typography>
            <Box component="img" src="/ethereum-logo.png" sx={{ width: 24, height: 24 }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="grey.400">To</Typography>
            <Box component="img" src="/cardano-logo.png" sx={{ width: 24, height: 24 }} />
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          color: 'grey.400',
          mb: 3
        }}>
          <Typography>Fee: ${fee} of ETH</Typography>
          <Typography>~{estimatedTime} minutes</Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={onConfirm}
          sx={{
            bgcolor: '#6c8ff8',
            py: 1.5,
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#5b7ee7'
            }
          }}
        >
          Confirm
        </Button>
      </Box>
    </Dialog>
  );
};
