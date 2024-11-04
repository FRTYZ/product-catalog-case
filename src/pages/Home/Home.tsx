import {useState, useMemo, lazy, Suspense } from 'react';

// Components
import XSelectBox from '../../components/FormElements/XSelectBox';
import ProductCard from '../../components/Cards/ProductCard';
import LazyCard from '../../components/Cards/LazyCard';

// Partials
import Filter from './Partials/Filter';

// React Query
import { useQuery } from 'react-query';

// Alert
import Swal from 'sweetalert2';

// Material UI
import { 
  Container,
  Grid2 as Grid,
  Box,
  Typography,
  Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components
const StyledHeadTypography = styled(Typography)(({ theme }) => ({
    marginInline: '30px',
    [theme.breakpoints.down('sm')]: {
      marginInline: '0'
    },
    mb: '10px',
    fontSize: '24px',
    fontWeight: 500
}));

const StyledHeadSkeleton = styled(Skeleton)(({ theme }) => ({
    marginInline: '30px',
    [theme.breakpoints.down('sm')]: {
      marginInline: '0'
    }
}));

const StyledCardBox = styled(Box)(({ theme }) => ({
    marginBlock: '30px',
    display: 'inline-block'
}));

// Interfaces and types
export interface ProductsProps {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  images: string[],
}

type filters = {
  category: string,
  minPrice: number | null,
  maxPrice: number | null,
  search: string | null,
}

function Home() {

  // useStates
  const [sortOption, setSortOption] = useState<string>('default');

  const [filters, setFilters] = useState<filters>({
    category: 'all',
    minPrice: null,
    maxPrice: null,
    search: '',
  });

  // useQuery
  /*      
    Product retrieves data and caches
  */
  const { 
      data: products, 
      isLoading, 
      isError, 
      error
    } = useQuery<ProductsProps[]>(['products'], () => getProducts(), {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchInterval: false,
  });

  // Functions
  /*      
    Get product values
  */
  const getProducts = async () => {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();

      return data.products.reverse();
  }

  // useMemos
  /*      
    Filtering and sorting Product data
  */
  const filteredProducts = useMemo(() => {
    let result = products && products.filter(product => {
      const matchesCategory = filters.category ? filters.category === 'all' ? product : product.category === filters.category : true;
      const matchesMinPrice = filters.minPrice !== null ? product.price >= filters.minPrice : true;
      const matchesMaxPrice = filters.maxPrice !== null ? product.price <= filters.maxPrice : true;
      const matchesSearch = filters.search !== null ? product.title.toLowerCase().includes(filters.search.toLowerCase()): true

      return matchesCategory && matchesMinPrice && matchesMaxPrice && matchesSearch;
    });

    // Sorting
    if (sortOption === 'max_rate') {
      result = result?.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'desc_price') {
      result = result?.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'asc_price') {
      result = result?.sort((a, b) => a.price - b.price);
    }

    return result;

  }, [products, filters, sortOption]);

  // Check error
  if(isError){
    Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: 'Bir hata oluştu' + error,
    })
  }

  return (
    <Container>
      <Grid container>
          {/* Filtering side */}
          <Grid size={{ xs: 12, lg: 4 }}>
              {isLoading ? (
                <StyledHeadSkeleton variant="rectangular" width={200} height={40} />
              ): (
                <StyledHeadTypography>
                  Ürünlerimiz
                </StyledHeadTypography>
              )}
             
              <Filter 
                  products={products && products}
                  onFilter={setFilters}
                  isLoading={isLoading}
              />
          </Grid>
          {/* Product card and sorting side and lazy loading */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box>
              {/* Product sorting */}
              {!isLoading ? (
                <XSelectBox 
                    isFullWidth={false}
                    selectItems={[
                      { id: 'default', value: 'Varsayılan' },
                      { id: 'max_rate', value: 'Popülerlik' },
                      { id: 'desc_price', value: 'Azalan fiyat' },
                      { id: 'asc_price', value: 'Artan fiyat' }
                    ]}
                    value={sortOption}
                    handleChange={(e: any) => setSortOption(e.target.value)}
                    sx={{ float: 'right' }}
                />
              ): (
                  <Skeleton variant="rectangular" width={120} height={40} sx={{ float: 'right' }} />
              )}
          </Box>
          <StyledCardBox>
            {/* Product card and lazy loading */}
            <Suspense fallback={<LazyCard amount={12} grid={[4,4,4,6]} />}>
                {!isLoading ? (
                  <ProductCard data={filteredProducts} grid={[4,4,4,6]} />
                ): (
                  <LazyCard amount={12} grid={[4,4,4,6]} />
                )}
            </Suspense>
          </StyledCardBox>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home