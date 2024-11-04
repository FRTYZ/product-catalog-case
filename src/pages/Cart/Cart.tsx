// Components
import XButton from '../../components/FormElements/XButton';
import ShopCard from '../../components/Cards/ShopCard';

// Redux
import { useAppSelector } from '../../redux/store';

// Material UI
import { Container, Box, Grid2 as Grid, Typography } from '@mui/material'

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
                        <Typography
                            sx={{
                                fontSize: '21px',
                                fontWeight: 600,
                                lineHeight: '26.25px',
                                marginBottom: 4,
                                textAlign: {xs: 'center', lg: 'left'}
                            }}
                        >
                            Sepet
                        </Typography>
                        <Box
                            sx={{
                                display: {xs: 'flex', lg: 'none'},
                                gap: 2,
                                my: 4,
                                textAlign: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    color: 'gray',
                                    textAlign: 'center',
                                    fontWeight: 400
                                }}
                            >
                                {bagItems.length} ürün
                            </Typography>
                            <Typography>|</Typography>
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    color: 'gray',
                                    textAlign: 'center',
                                    fontWeight: 400
                                }}
                            >
                                ${roundedTotalPrice}
                            </Typography>
                        </Box>
                        <ShopCard bagItems={bagItems} />
                    </Grid>
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Typography
                            sx={{
                                fontSize: '21px',
                                fontWeight: 600,
                                lineHeight: '26.25px',
                                marginBottom: 4,
                                textAlign: {xs: 'center', lg: 'left'}
                            }}
                        >
                            Özet
                        </Typography>
                        <Box
                            sx={{
                                py: 4,
                                gap: 4
                            }}
                        >
                            <Box
                                sx={{
                                    gap: 4
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        textAlign: 'left',
                                        fontWeight: 400,
                                        color: 'black'
                                    }}
                                >
                                    <Typography>Ürün sayısı</Typography>
                                    <Typography sx={{ color: 'black', fontWeight: 600, fontSize: '18px' }}>{bagItems.length}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        textAlign: 'left',
                                        fontWeight: 400,
                                        color: 'black'
                                    }}
                                >
                                    <Typography>Toplam</Typography>
                                    <Typography sx={{ color: 'black', fontWeight: 600, fontSize: '18px' }}>{roundedTotalPrice} TL </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        mt: 4
                                    }}
                                >
                                    <XButton 
                                        text='Ödeme İşlemine Geç' 
                                        variant="contained" 
                                        buttonSize="large"
                                        sx={{ 
                                            backgroundColor: '#17a77f',
                                            color: 'white',
                                            fontWeight: 600,
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            width: '100%',
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            ): (
                <>
                <Typography
                    sx={{
                        fontSize: '21px',
                        fontWeight: 600,
                        lineHeight: '26.25px',
                        marginBottom: 4,
                        textAlign: {xs: 'center', lg: 'left'}
                    }}
                >
                    Sepet
                </Typography>
                <Box
                    sx={{
                        display: 'block',
                        gap: 2,
                        my: 4,
                        textAlign: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '18px'
                        }}
                    >Sepetinizde henüz ürün bulunmuyor. Dilerseniz ürün katalog sayfasına gidip, dilediğiniz ürünü seçebilirsiniz.</Typography>
                    <XButton 
                        text='Ürün katalog sayfası' 
                        variant="contained" 
                        buttonSize="large"
                        href='/'
                        sx={{ 
                            mt: 4,
                            backgroundColor: '#17a77f',
                            color: 'white',
                            fontWeight: 600,
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    />

                </Box>
                </>
            )}
        </Container>
    )
}

export default Cart