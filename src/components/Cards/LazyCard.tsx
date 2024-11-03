// Material UI elements
import { 
    Grid2 as Grid, 
    Card, 
    CardActions, 
    CardContent,
    Skeleton,
    } from '@mui/material';

// Interfaces or Types

interface LazyCardProps {
    amount: number,
    grid: number[];
}

const LazyCard = ({amount, grid}: LazyCardProps ) => {

    const dummyCards = Array.from({ length: amount });

    return (
        <Grid container spacing={2}>
            {dummyCards.map((_, index) => (
                <Grid size={{ lg: grid[0], md: grid[1], sm:grid[2], xs: grid[3]}} key={index}>
                    <Card sx={{
                        maxWidth: '345px'
                    }}>
                        <Skeleton variant="rectangular" height={194} />
                        <CardContent
                            sx={{
                                display:'grid',
                                gap: '5px',
                                paddingInline: '10px'
                            }}
                        >
                            <Skeleton variant="rectangular" height={30} />
                            <Skeleton variant="rectangular" height={30} />
                        </CardContent>
                        <CardActions sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingInline: '10px'
                        }}>
                                <Skeleton variant="rectangular" width={100} height={30} />
                                <Skeleton variant="rectangular" width={30} height={30} />
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default LazyCard