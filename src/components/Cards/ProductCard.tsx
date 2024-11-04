import React, { useEffect, useState } from 'react'

// Components
import ShopBag from './Partials/ShopBag';

// Material UI elements
import { 
    Box, 
    Grid2 as Grid, 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Typography,
    Rating,
    } from '@mui/material';

import { styled } from '@mui/material/styles';

// Assets
import noImage from '/no-image.png'

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
   maxWidth: '345px'
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
   paddingInline: '10px'
}));

const StyledTitleTypography = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 500,
    color: '#3b3b3b',
    paddingLeft: '4px',
    marginTop: '10px'
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    paddingInline: '10px'
}));

const StyledPriceTypography = styled(Typography)(({ theme }) => ({
    textAlign: 'right',
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 500,
    color: '#3b3b3b'
}));

const StyledShopBagBox = styled(Box)(({ theme }) => ({
    textAlign: 'right', 
    float: 'right'
}));


// Interfaces or Types
import { ProductsProps } from '../../pages/Home/Home';

interface AdCardProps {
    data?: ProductsProps[];
    grid: number[];
}

const ProductCard = ({ data, grid }: AdCardProps) => {
  
    // useState
    const [cardData, setCardData] = useState<ProductsProps[]>(data!);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const pageSize: number = 10;
    
    useEffect(() => {
        setPageNumber(1)
        if(data && data.length > 0){
            setCardData(Array.isArray(data) ? data.slice(0, pageSize) : []);
        }
    },[data])

    useEffect(() => {
        const limitsData = () => {
            const startIndex = (pageNumber - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const limitedData = data!.slice(startIndex, endIndex);

            if(limitedData.length > 0){
                setCardData((prevData) => [ ...prevData, ...limitedData ]);
            }
        }
        if(pageNumber > 1){
            limitsData();
        }
    }, [pageNumber])

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
                setPageNumber((prev) =>  prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Grid container spacing={2}>
            {data && data.length > 0 ? (

                cardData.map((item, index) => (
                    <Grid size={{ lg: grid[0], md: grid[1], sm:grid[2], xs: grid[3]}} key={index}>
                        <StyledCard>
                            <CardMedia
                                component="img"
                                height="194"
                                image={item?.images[0] || noImage}
                                alt={item.title}
                                loading="lazy"
                            />
                            <StyledCardContent>
                                <Rating name="half-rating" defaultValue={item.rating} precision={item.rating} />
                                <StyledTitleTypography variant="body2">{item?.title}</StyledTitleTypography>
                            </StyledCardContent>
                            <StyledCardActions>
                                    <StyledPriceTypography>{item.price} TL</StyledPriceTypography>
                                    <StyledShopBagBox>
                                        <ShopBag 
                                            itemProduct={item}
                                        />
                                    </StyledShopBagBox>
                            </StyledCardActions>
                        </StyledCard>
                    </Grid>
                ))
            ): (
                <Grid size={{xs: 12, lg: 12}}>
                    <StyledTitleTypography>Veri bulunamadı veya farklı filtreleme işlemi uygulayabilirsiniz.</StyledTitleTypography>
                </Grid>
            )}
        </Grid>
    )
}

export default ProductCard