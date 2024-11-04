// Components
import XButton from '../../components/FormElements/XButton';
import ShopCard from '../../components/Cards/ShopCard';

// Redux
import { useAppSelector } from '../../redux/store';

// Material UI
import { Container, Box, Grid2 as Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledHeadTypography = styled(Typography)(({ theme }) => ({
    fontSize: '21px',
    fontWeight: 600,
    lineHeight: '26.25px',
    marginBottom: '40px',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
        textAlign: 'center'
      },
}));

const StyledSubTypography = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    color: 'gray',
    textAlign: 'center',
    fontWeight: 400
}));

const StyledCartBox = styled(Box)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'flex'
    },
    gap: '20px',
    marginBottom: '40px',
    textAlign: 'center',
    justifyContent: 'center'
}));

const StyledRightBox = styled(Box)(({ theme }) => ({
    paddingBottom:'40px',
    paddingTop: '10px',
    gap: 4,
}));

const StyledRightContentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'left',
    fontWeight: 400,
    color: 'black'
}));

const StyledRightContentTypography = styled(Typography)(({ theme }) => ({
    color: 'black', 
    fontWeight: 600, 
    fontSize: '18px'
}));

const StyledRightButtonBox = styled(Box)(({ theme }) => ({
    display: 'grid',
    marginTop: '40px'
}));

const StyledRightXButton = styled(XButton)(({ theme }) => ({
    backgroundColor: '#17a77f',
    color: 'white',
    fontWeight: 600,
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
}));

const StyledNoResultCartBox = styled(Box)(({ theme }) => ({
    display: 'block',
    gap: '20px',
    marginBottom: '40px',
    textAlign: 'center',
    justifyContent: 'center'
}));

const StyledNoResultXButton = styled(XButton)(({ theme }) => ({
    marginTop: '40px',
    backgroundColor: '#17a77f',
    color: 'white',
    fontWeight: 600,
    justifyContent: 'center',
    textAlign: 'center',
}));


function Cart() {
    // Get value in bag
    const {bagItems}  = useAppSelector((state) => state?.shopBagItems);

    // Functions
    /* 
        Takes Amount and Price data and calculates the total price
    */
    const totalPrice = bagItems.reduce((accumulator, product) => {
        return accumulator + product.price * product.amount;
    }, 0);

    /*
        Filters more than 2 digits after comma in total price data
    */
    const roundedTotalPrice = Math.round(totalPrice * 100) / 100

    return (
        <Container>
            {bagItems.length > 0 ? (
                <Grid container spacing={8}>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <StyledHeadTypography>
                            Sepet
                        </StyledHeadTypography>
                        <StyledCartBox>
                            <StyledSubTypography> {bagItems.length} ürün </StyledSubTypography>
                            <Typography>|</Typography>
                            <StyledSubTypography> {roundedTotalPrice} TL</StyledSubTypography>
                        </StyledCartBox>
                        <ShopCard bagItems={bagItems} />
                    </Grid>
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <StyledHeadTypography>
                            Özet
                        </StyledHeadTypography>
                        <StyledRightBox>
                            <StyledRightContentBox>
                                <Typography>Ürün sayısı</Typography>
                                <StyledRightContentTypography>{bagItems.length}</StyledRightContentTypography>
                            </StyledRightContentBox>
                            <StyledRightContentBox>
                                <Typography>Toplam</Typography>
                                <StyledRightContentTypography>{roundedTotalPrice} TL </StyledRightContentTypography>
                            </StyledRightContentBox>
                            <StyledRightButtonBox>
                                <StyledRightXButton 
                                    text='Ödeme İşlemine Geç' 
                                    variant="contained" 
                                    buttonSize="large"
                                />
                            </StyledRightButtonBox>
                        </StyledRightBox>
                    </Grid>
                </Grid>
            ): (
                <>
                    <StyledHeadTypography>
                        Sepet
                    </StyledHeadTypography>
                    <StyledNoResultCartBox>
                        <StyledSubTypography>Sepetinizde henüz ürün bulunmuyor. Dilerseniz ürün katalog sayfasına gidip, dilediğiniz ürünü seçebilirsiniz.</StyledSubTypography>
                        <StyledNoResultXButton 
                            text='Ürün katalog sayfası' 
                            variant="contained" 
                            buttonSize="large"
                            href='/'
                        />
                    </StyledNoResultCartBox>
                </>
            )}
        </Container>
    )
}

export default Cart