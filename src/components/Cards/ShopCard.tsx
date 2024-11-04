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
import { styled } from '@mui/material/styles';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// Styled components
const StyledCardBox = styled(Box)(({ theme }) => ({
  gap: '10px',
  display: 'flex', 
  justifyContent: 'space-between',
  [theme.breakpoints.up('xs')]: {
    display: 'grid',
    gap: '20px',
    justifyContent: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between'
  },
  alignItems: 'center',
  paddingInline: '20px',
  paddingTop: '20px',
  paddingBottom: '20px',
  borderRadius: '4px',
  border: '1px solid gray'
}));

const StyledTitleTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
  width: '150px',
  fontWeight: 500,
  fontSize: '16px'
}));

const StyledAmountCardBox = styled(Box)(({ theme }) => ({
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
}));

const StyledAmountButton = styled(XButton)(({ theme }) => ({
  backgroundColor: '#17a77f',
  color: 'white',
  minWidth: '45px',
  height: '25px'
}));

const StyledPriceTypography = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 600
}));

const StyledRemoveButton = styled(XButton)(({ theme }) => ({
  backgroundColor: 'red',
  color: 'white',
  minWidth: '45px',
  width: 'fit-content',
  height: '25px'
}));

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
              <StyledCardBox>
                  <img 
                    src={item.image}
                    width={80}
                    height={80}
                  />
                  <StyledTitleTypography>{item.title}</StyledTitleTypography>
                    <StyledAmountCardBox> 
                      <StyledAmountButton 
                          text={ <RemoveIcon sx={{ fontSize: '20px' }}  />} 
                          variant="contained" 
                          buttonSize="small"
                          onClick={() => {handleDecrementCounter(item.id, item.amount )}}
                        />
                        <Typography>{item.amount}</Typography>
                        <StyledAmountButton 
                            text={ <AddIcon sx={{ fontSize: '20px' }} />} 
                            variant="contained" 
                            buttonSize="small"
                            onClick={() => {handleIncrementCounter(item.id, item.amount)}}
                        />
                    </StyledAmountCardBox>
                    <StyledPriceTypography>{Math.round((item.price * item.amount)  * 100) / 100} TL</StyledPriceTypography>
                    <StyledRemoveButton 
                        text={<DeleteIcon />} 
                        variant="contained" 
                        buttonSize="small"
                        onClick={() => handleRemoveItem(item.id)}
                    />
                  </StyledCardBox>
            </Grid>
          ))}
      </Grid>
    )
}

export default ShopCard