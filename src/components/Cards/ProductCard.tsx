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
    Button,
    Rating,
    } from '@mui/material';

// Assets
import noImage from '/no-image.png'

// Styles

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
                        <Card sx={{
                            maxWidth: '345px'
                        }}>
                            <CardMedia
                                component="img"
                                height="194"
                                image={item?.images[0] || noImage}
                                alt={item.title}
                                loading="lazy"
                            />
                            <CardContent
                                sx={{
                                    paddingInline: '10px',
                                }}
                            >
                                <Rating name="half-rating" defaultValue={item.rating} precision={item.rating} />
                                <Typography
                                    variant="body2" 
                                    sx={{
                                        fontSize: '16px',
                                        lineHeight: '24px',
                                        fontWeight: 500,
                                        color: '#3b3b3b',
                                        paddingLeft: '4px',
                                        marginTop: '10px'
                                    }}
                                > {item?.title}</Typography>
                            </CardContent>
                            <CardActions 
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingInline: '10px'
                                }}
                            >
                                    <Typography 
                                        sx={{
                                            textAlign: 'right',
                                            fontSize: '20px',
                                            lineHeight: '26px',
                                            fontWeight: 500,
                                            color: '#3b3b3b'
                                        }}
                                    >
                                        {item.price} TL
                                    </Typography>
                                    <Box sx={{ textAlign: 'right', float: 'right' }}>
                                        <ShopBag 
                                            itemProduct={item}
                                        />
                                    </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            ): (
                <Grid size={{xs: 12, lg: 12}}>
                    <Typography
                        sx={{
                            fontSize: '18px',
                            mt: 4,
                            
                        }}
                    >Veri bulunamadı veya farklı filtreleme işlemi uygulayabilirsiniz.</Typography>
                </Grid>
            )}
        </Grid>
    )
}

export default ProductCard