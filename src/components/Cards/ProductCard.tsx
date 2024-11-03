import React, { useEffect, useState } from 'react'

// Material UI elements
import { 
    Box, 
    Grid, 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Typography, 
    Chip, 
    IconButton,
    CardHeader,
    Avatar,
    Button,
    Rating,
    } from '@mui/material';


// Material UI Icons
import { AddShoppingCart as AddShoppingCartIcon} from '@mui/icons-material';


// Styles

// Interfaces or Types

import { ProductsProps } from '../../pages/Home/Home';

interface AdCardProps {
    data: ProductsProps[];
    grid: number[];
}

const ProductCard: React.FC<AdCardProps> = ({ data, grid }) => {
  
    // useState
    const [cardData, setCardData] = useState<ProductsProps[]>(data);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [endPagination, setEndPagination] = useState<boolean>(false);
    const pageSize: number = 10;
    
    useEffect(() => {
        if(data.length > 0){
            setCardData(Array.isArray(data) ? data.slice(0, pageSize) : []);
        }
    },[data])

    useEffect(() => {
        const limitsData = () => {
            const startIndex = (pageNumber - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const limitedData = data.slice(startIndex, endIndex);

            if(limitedData.length > 0){
                setCardData((prevData) => [ ...prevData, ...limitedData ]);
            }else{
                setEndPagination(true)
            }
        }
        if(pageNumber > 1){
            limitsData();
        }
    }, [pageNumber])

    const handlePagination = () => {
        setPageNumber((prev) => prev + 1)
    }

    return (
        <Grid container spacing={2}>
            {cardData.map((item, index) => (
                <Grid item={true} lg={grid[0]} md={grid[1]} sm={grid[2]} xs={grid[3]} key={index}>
                        <Card sx={{
                            maxWidth: '345px'
                        }}>
                            <CardMedia
                                component="img"
                                height="194"
                                image={item.images[0]}
                                alt={item.title}
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
                            <CardActions sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingInline: '10px'
                            }}>
                                    <Typography sx={{
                                        textAlign: 'right',
                                        fontSize: '20px',
                                        lineHeight: '26px',
                                        fontWeight: 500,
                                        color: '#3b3b3b'
                                    }}>
                                        {item.price} TL
                                    </Typography>
                                    <Box sx={{ textAlign: 'right', float: 'right' }}>
                                        <IconButton color="primary" aria-label="add to shopping cart">
                                            <AddShoppingCartIcon />
                                        </IconButton>
                                    </Box>
                            </CardActions>
                        </Card>
                </Grid>
            ))}
            {(!endPagination && data.length > 10 )&& (
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box sx={{
                         textAlign: 'center', 
                         marginTop: '30px'
                    }}>
                        <Button
                            variant="outlined"
                            sx={{
                                    backgroundColor: '#25d6a2',
                                    color: '#FFFFFF',
                                    borderRadius: '50px',
                                    border: '3px solid transparent',
                                    textTransform: 'none',
                                    marginRight: {xl: '20px', lg: '20px', md: '0px', sm:'0px', xs: '0px'}, 
                                    marginBottom: '60px',
                                    fontSize :'16',
                                    fontWeight: 700,
                                    '&:hover': { 
                                        backgroundColor: '#FFFFFF', 
                                        border: '3px solid #25d6a2', 
                                        color: '#25d6a2' 
                                    },
                            }}
                            onClick={() => handlePagination()}
                        >
                            Daha fazla yükle
                        </Button>
                    </Box>
                </Grid>
            )}
        </Grid>
    )
}

export default ProductCard