import { Grid } from '@mui/material';
import { StoreItem } from '../components/StoreItem';
import storeItems from '../data/items.json';

export function Store() {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 3, sm: 8, md: 12 }}
      sx={{}}>
      {storeItems.map((storeItem) => (
        <Grid item xs={4} sm={4} md={3} key={storeItem.id}>
          <StoreItem storeItem={storeItem} />
        </Grid>
      ))}
    </Grid>
  );
}
