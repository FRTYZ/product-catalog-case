import {useEffect, useState, useMemo} from 'react';

// Components
import XSelectBox from '../../components/FormElements/XSelectBox';
import XInput from '../../components/FormElements/XInput';
import XButton from '../../components/FormElements/XButton';

import ProductCard from '../../components/Cards/ProductCard';

import { useQuery, useQueryClient } from 'react-query';

import Swal from 'sweetalert2';

import { useFormik } from 'formik';

import { 
  Container,
  Grid2 as Grid,
  Box,
  Typography,
 } from '@mui/material';


// Interfaces
export interface ProductsProps {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  images: string[],
}

function Home() {

  const [sortOption, setSortOption] = useState<string>('default');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [search, setSearch] = useState<string | null>('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

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

  const getProducts = async () => {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();

      return data.products.reverse();
  }

  const uniqueCategories = useMemo(() => {
    const categorySet = new Set<string>();

    products && products.forEach(product => {
        if (product.category) {
            categorySet.add(product.category);
        }
    });

    // "Tümü" seçeneğini ekle
    const allCategories = [
        { id: 'all', value: 'TÜMÜ' }, // "Tümü" seçeneği
        ...Array.from(categorySet).map(category => ({
            id: category,
            value: category.toUpperCase()
        }))
    ];

    return allCategories;

  }, [products]);


  const filteredProducts = useMemo(() => {

    let result = products && products.filter(product => {
      const matchesCategory = selectedCategory ? selectedCategory === 'all' ? product : product.category === selectedCategory : true;
      const matchesMinPrice = minPrice !== null ? product.price >= minPrice : true;
      const matchesMaxPrice = maxPrice !== null ? product.price <= maxPrice : true;
      const matchesSearch = search !== null ? product.title.toLowerCase().includes(search!.toLowerCase()): true

      return matchesCategory && matchesMinPrice && matchesMaxPrice && matchesSearch;
    });

    // Sıralama işlemi
    if (sortOption === 'max_rate') {
      result = result?.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'desc_price') {
      result = result?.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'asc_price') {
      result = result?.sort((a, b) => a.price - b.price);
    }

    return result;

  }, [products, selectedCategory, minPrice, maxPrice, search, sortOption]);

  const formik = useFormik({
      initialValues: {
        minPrice: '',
        maxPrice: '',
        selectCategory: 'all',
        search: ''
      },
      onSubmit: async (values) => {
        const {search, minPrice, maxPrice, selectCategory} = values;

        if(selectCategory){
          setSelectedCategory(selectCategory);
        }
        if(maxPrice !== ''){
          setMaxPrice(Number(maxPrice));
        }else{
          setMaxPrice(null);
        }

        if(minPrice !== ''){
          setMinPrice(Number(minPrice));
        }else{
          setMinPrice(null);
        }

        if(search !== ''){
          setSearch(search);
        }else{
          setSearch(null);
        }
        
      }
  })

  const handleResetForm = () => {
    formik.resetForm();
    setSelectedCategory('all')
    setMaxPrice(null)
    setMinPrice(null)
    setSearch(null)
  }

  return (
    <Container>
      <Grid container>
          <Grid size={{ xs: 12, lg: 4 }}>
              <Typography
                sx={{
                   marginInline: '30px',
                   fontSize: '24px',
                   fontWeight: 500
                }}
              >
                Ürünlerimiz
              </Typography>
              <form 
                  method='POST'
                  onSubmit={formik.handleSubmit}
              >
                <Box 
                  sx={{ 
                    display: 'grid',
                    marginTop: '30px', 
                    gridGap: '30px',
                    marginInline: '30px'
                  }}
                >
                  <Box>
                    <Typography>Arama</Typography>
                    <XInput 
                        type='text'
                        label=""
                        name="search"
                        placeholder='Ürün ismi ile ara'
                        value={formik.values.search}
                        handleChange={formik.handleChange}
                        size="small"
                    />
                </Box>
                  <Box>
                      <Typography>Kategoriler</Typography>
                      <XSelectBox 
                        isFullWidth={true}
                        name="selectCategory"
                        value={formik.values.selectCategory}
                        selectItems={uniqueCategories}
                        handleChange={formik.handleChange}
                    />
                  </Box>
                  <Box>
                      <Typography>Fiyat Aralığı</Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <XInput 
                            type='number'
                            label=""
                            name="minPrice"
                            placeholder='Minimum'
                            value={formik.values.minPrice}
                            handleChange={formik.handleChange}
                            size="small"
                        />
                        <Typography sx={{
                            textAlign: 'center', 
                            marginInline: '10px'
                        }}>
                            -
                        </Typography>
                        <XInput 
                            type='number'
                            label=""
                            name="maxPrice"
                            placeholder='Maximum'
                            value={formik.values.maxPrice}
                            handleChange={formik.handleChange}
                            size="small"
                        />
                      </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'contents',
                      gap: '1px'
                    }}
                  >
                     <XButton 
                      text='Ara' 
                      type="submit" 
                      variant="contained" 
                      buttonSize="large"
                      sx={{ backgroundColor: '#17a77f' }}
                    />
                     <XButton 
                      text='Temizle'
                      variant="contained" 
                      buttonSize="large"
                      onClick={() => handleResetForm()}
                      sx={{ color: '#17a77f', backgroundColor: '#ffffff' }}
                    />
                  </Box>
                 
                </Box>
              </form>
          </Grid>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box>
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
          </Box>
          {!isLoading && filteredProducts!.length > 0 ? (
            <ProductCard data={filteredProducts!} grid={[4,4,4,6]} />
          ): (
            <>ürün yok</>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home