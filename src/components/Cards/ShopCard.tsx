// Components
import XButton from '../FormElements/XButton';

// Redux
import { useAppDispatch, setBagItems, deleteBagItem } from '../../redux/store';

// Material UI and icons
import { 
  Grid2 as Grid,
  Box,
  Typography
} from '@mui/material'

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// interfaces and types
import { BagTypes } from '../../redux/interface'

interface ShopCardProps {
  bagItems: BagTypes[]
}

function ShopCard({
  bagItems
}: ShopCardProps) {
    // Redux
    const dispatch = useAppDispatch();

    // Default values
    const minValue = 0;
    const maxValue = 10;

    // Functions
    /*
        Increases product quantity count
    */
    const handleIncrementCounter = (id: string, amount: number) => {
        if (amount < maxValue) {

            const bagItems = [{
                id: id,
                amount: amount + 1,
            }];

            dispatch(setBagItems(bagItems))
        }
    };

    /*
        Decrease product quantity count
    */
    const handleDecrementCounter = (id: string, amount: number) => {
        if (amount > minValue) {
            const newAmount = amount - 1
            const bagItems = [{
                id: id,
                amount: amount - 1
            }];

            // If the number is 0, deletes the product from the cart
            if(newAmount == 0){
                handleRemoveItem(id);
            }else{
                dispatch(setBagItems(bagItems))
            }

        }
    };

    /*
      Deletes product from cart with incoming id
    */
    const handleRemoveItem = (id: string) => {
      dispatch(deleteBagItem(id))
    }

    return (
      <Grid container spacing={2}>
          {bagItems && bagItems.map((item, key) => (
            <Grid size={{ xs: 12, lg:12 }} key={key}>
              <Box
                sx={{
                  display: {xs: 'grid', sm: 'flex',xl: 'flex'}, 
                  gap: {xs: '20px', sm: '10px', lg: '10px'},
                  alignItems: 'center',
                  justifyContent: {xs: 'center', sm: 'space-between', lg:'space-between'},
                  boxShadow: 2,
                  px: 2,
                  py: 2,
                  borderRadius: '4px'
                }}
              >
                  <img 
                    src={item.image}
                    width={80}
                    height={80}
                   
                  />
                  <Typography
                      sx={{
                        textAlign: 'left',
                        width: '150px',
                        fontWeight: 500,
                        fontSize: '16px'
                      }}
                  >{item.title}</Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '10px',
                        width: 'min-content',
                        height: 'fit-content',
                        justifyItems: 'center',
                        backgroundColor: 'white',
                        overflow: 'hidden',
                        border: '1px solid gray',
                        borderRadius: '10px',
                        alignItems: 'center'
                      }}
                    > 
                      <XButton 
                          text={ <RemoveIcon sx={{ fontSize: '20px' }}  />} 
                          variant="contained" 
                          buttonSize="small"
                          onClick={() => {handleDecrementCounter(item.id, item.amount )}}
                          sx={{ 
                              backgroundColor: '#17a77f',
                              color: 'white',
                              minWidth: '45px',
                              height: '25px'
                          }}
                        />
                        <Typography>{item.amount}</Typography>
                        <XButton 
                            text={ <AddIcon sx={{ fontSize: '20px' }} />} 
                            variant="contained" 
                            buttonSize="small"
                            onClick={() => {handleIncrementCounter(item.id, item.amount)}}
                            sx={{ 
                                backgroundColor: '#17a77f',
                                color: 'white',
                                minWidth: '45px',
                                  height: '25px'
                            }}
                        />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '18px',
                        fontWeight: 600
                      }}
                    >{Math.round((item.price * item.amount)  * 100) / 100} TL</Typography>
                    <XButton 
                        text={<DeleteIcon />} 
                        variant="contained" 
                        buttonSize="small"
                        onClick={() => handleRemoveItem(item.id)}
                        sx={{ 
                            backgroundColor: 'red',
                            color: 'white',
                            minWidth: '45px',
                            width: 'fit-content',
                            height: '25px'
                        }}
                    />
                  </Box>
            </Grid>
          ))}
      </Grid>
    )
}

export default ShopCard