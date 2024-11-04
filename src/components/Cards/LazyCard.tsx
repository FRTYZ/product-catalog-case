// Material UI elements
import { 
    Grid2 as Grid, 
    Card, 
    CardActions, 
    CardContent,
    Skeleton,
    } from '@mui/material';

import { styled } from '@mui/material/styles';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: '345px'
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display:'grid',
    gap: '5px',
    paddingInline: '10px'
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    paddingInline: '10px'
}));

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
                    <StyledCard>
                        <Skeleton variant="rectangular" height={194} />
                        <StyledCardContent>
                            <Skeleton variant="rectangular" height={30} />
                            <Skeleton variant="rectangular" height={30} />
                        </StyledCardContent>
                        <StyledCardActions>
                                <Skeleton variant="rectangular" width={100} height={30} />
                                <Skeleton variant="rectangular" width={30} height={30} />
                        </StyledCardActions>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    )
}

export default LazyCard