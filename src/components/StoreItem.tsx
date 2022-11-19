import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';

type StoreItemProps = {
  storeItem: {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
  };
};

export function StoreItem({
  storeItem: { id, name, price, imgUrl },
}: StoreItemProps) {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component='img' height='140' image={imgUrl} alt={name} />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {formatCurrency(price)}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        {quantity === 0 && (
          <Button
            sx={{ width: '100%' }}
            variant='contained'
            color='primary'
            onClick={() => increaseItemQuantity(id)}>
            Add to cart
          </Button>
        )}
        {quantity > 0 && (
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '120px',
              boxShadow: 'none',
            }}>
            <IconButton onClick={() => increaseItemQuantity(id)}>
              <AddBoxIcon sx={{ color: 'primary.main' }} />
            </IconButton>
            <Typography
              variant='h5'
              color='text.secondary'
              sx={{ fontWeight: 'bold' }}>
              {quantity}
            </Typography>
            <IconButton
              onClick={() => {
                if (quantity > 0) {
                  decreaseItemQuantity(id);
                }
              }}>
              <IndeterminateCheckBoxIcon sx={{ color: 'primary.main' }} />
            </IconButton>
          </Paper>
        )}
        {quantity > 0 && (
          <Button
            variant='contained'
            color='error'
            onClick={() => removeFromCart(id)}>
            Remove
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
