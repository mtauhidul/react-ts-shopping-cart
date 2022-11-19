import DisabledByDefaultTwoToneIcon from '@mui/icons-material/DisabledByDefaultTwoTone';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { useShoppingCart } from '../context/ShoppingCartContext';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';
import { CartItem } from './CartItem';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

type ShoppingCartProps = {
  isOpen: boolean;
};

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400,
        maxWidth: '100%',
      }}
      role='presentation'>
      <List>
        {cartItems.map((item) => (
          <CartItem key={item.id} id={item.id} quantity={item.quantity} />
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer anchor='right' open={isOpen} onClose={closeCart}>
        <Box
          sx={{
            p: 1,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Typography variant='h6'>Shopping Cart</Typography>
          <IconButton
            onClick={closeCart}
            sx={{
              p: 1,
              ':hover': {
                backgroundColor: 'primary.dark',
              },
            }}>
            <DisabledByDefaultTwoToneIcon />
          </IconButton>
        </Box>
        {list('right')}
        <Box>
          {cartItems.length === 0 && (
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{
                p: 2,
                textAlign: 'center',
              }}>
              Your cart is empty
            </Typography>
          )}
          {cartItems.length > 0 && (
            <Typography
              variant='h6'
              color='text.secondary'
              sx={{
                textAlign: 'right',
                pr: 1,
              }}>
              Total:{' '}
              {formatCurrency(
                cartItems.reduce((acc, item) => {
                  const storeItem = storeItems.find(
                    (storeItem) => storeItem.id === item.id
                  );
                  if (!storeItem) {
                    return acc;
                  }
                  return acc + storeItem.price * item.quantity;
                }, 0)
              )}
            </Typography>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
