import ClearIcon from '@mui/icons-material/Clear';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useShoppingCart } from '../context/ShoppingCartContext';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();

  const item = storeItems.find((item) => item.id === id);
  if (!item) {
    return null;
  }

  return (
    <Stack
      spacing={2}
      sx={{
        pt: 2,
      }}>
      <Grid
        container
        spacing={1}
        sx={{
          pl: 1,
        }}>
        <Grid item xs={4}>
          <img
            src={item.imgUrl}
            alt={item.name}
            width='100'
            style={{
              borderRadius: '4px',
              height: '80px',
              objectFit: 'cover',
              width: '120px',
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h6' color='text.secondary'>
            {item.name}
            <sub>
              <small>x{quantity}</small>
            </sub>
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {formatCurrency(item.price)}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            pr: 1,
          }}>
          <Typography variant='caption' color='text.secondary'>
            {formatCurrency(item.price * quantity)}
          </Typography>
          <IconButton
            sx={{
              ml: 1,
              border: '1px solid #ccc',
              borderRadius: '4px',
              height: '32px',
              width: '32px',
              ':hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
            onClick={() => removeFromCart(id)}>
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
    </Stack>
  );
}
