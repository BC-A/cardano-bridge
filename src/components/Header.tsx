import { Button, Stack } from '@mui/material';

interface HeaderProps {
  connectEthereum: () => void;
  connectCardano: () => void;
}

export const Header = ({ connectEthereum, connectCardano }: HeaderProps) => {
  return (
    <Stack 
      direction="row" 
      spacing={2} 
      sx={{ 
        p: 2,
        justifyContent: 'flex-end',
        backgroundColor: 'white'
      }}
    >
      <Button 
        variant="contained" 
        onClick={connectEthereum}
        sx={{ backgroundColor: '#6c8ff8' }}
      >
        Connect Ethereum Wallet
      </Button>
      <Button 
        variant="contained" 
        onClick={connectCardano}
        sx={{ backgroundColor: '#4caf50' }}
      >
        Connect Cardano Wallet
      </Button>
    </Stack>
  );
};
