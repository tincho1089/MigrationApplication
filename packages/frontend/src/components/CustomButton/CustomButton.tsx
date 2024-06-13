import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const baseColor = '#1976D2';
const lightColor = '#4791db'; // Un poco más claro
const darkColor = '#115293'; // Más oscuro para hover

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(baseColor),
  backgroundColor: lightColor,
  '&:hover': {
    backgroundColor: darkColor,
  },
  width: '100%',
}));

export default function CustomButton({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <Stack spacing={2} direction='row'>
      <ColorButton variant='contained' onClick={onClick}>
        {children}
      </ColorButton>
    </Stack>
  );
}
