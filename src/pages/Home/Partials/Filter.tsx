import React, { useState, useMemo, MouseEvent} from 'react';

// Components
import XSelectBox from '../../../components/FormElements/XSelectBox';
import XInput from '../../../components/FormElements/XInput';
import XButton from '../../../components/FormElements/XButton';

// Formik for form
import { useFormik } from 'formik';

// Material UI And icons
import { 
    Grid2 as Grid,
    Box,
    Typography,
    Drawer
} from '@mui/material';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';

// İnterfaces and types
import { ProductsProps } from '../Home';

interface FilterProps {
    products?: ProductsProps[],
    onFilter: (filters: { category: string; minPrice: number | null; maxPrice: number | null; search: string }) => void
}

function Filter({
    products,
    onFilter,
}: FilterProps) {

    // useStates
    const [mobileFilter, setMobileFilter] = useState<null | HTMLElement>(null);

    // Usememo's
    /*
        Takes category from Product data and makes it unique
    */
    const uniqueCategories = useMemo(() => {
        const categorySet = new Set<string>();
    
        products && products.forEach(product => {
            if (product.category) {
                categorySet.add(product.category);
            }
        });
    
        // Add "Tümü" options 
        const allCategories = [
            { id: 'all', value: 'TÜMÜ' }, // "Tümü" options
            ...Array.from(categorySet).map(category => ({
                id: category,
                value: category.toUpperCase()
            }))
        ];
    
        return allCategories;
    
    }, [products]);


    // Formiks
    /* 
        For filtering
    */
    const formik = useFormik({
        initialValues: {
          minPrice: '',
          maxPrice: '',
          selectCategory: 'all',
          search: ''
        },
        onSubmit: async (values) => {
          const {search, minPrice, maxPrice, selectCategory} = values;

          onFilter({
            category: selectCategory,
            minPrice: minPrice !== '' ? Number(minPrice) : null,
            maxPrice: maxPrice !== '' ? Number(maxPrice) : null,
            search: search
          });
          
          closeMobileFilter()
          
        }
    })

    // Forms
    const productFilterForm = (
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
    )
    
    // Functions
    /* 
        For the "Temizle" button
    */
    const handleResetForm = () => {

        onFilter({
            category: 'all',
            minPrice: null,
            maxPrice:null,
            search: ''
        });
    }
    
    // Drawer functions
    const openMobileFilter = (event: MouseEvent<HTMLElement>) => {

        setMobileFilter(event.currentTarget);
    }

    const closeMobileFilter = () => {

        setMobileFilter(null)
    }
    
    return (
        <React.Fragment>
            {/* Desktop filter */}
            <Box
                sx={{
                    display: {xs: 'none', lg: 'block'}
                }}
            >
                {productFilterForm}
            </Box>
              {/* Mobile filter */}
            <Box
                sx={{ 
                    position: 'absolute',
                    display: {xs: 'block', lg: 'none'}
                }}
            >
                <XButton 
                    text={<FilterAltIcon  />}
                    variant="contained" 
                    buttonSize="large"
                    onClick={openMobileFilter}
                    sx={{ color: '#17a77f', backgroundColor: '#ffffff' }}
                />
                <Drawer
                    anchor={'right'}
                    open={Boolean(mobileFilter)}
                    onClose={closeMobileFilter}
                    PaperProps={{
                        sx: {
                            height: '100%',
                            maxHeight: 'none',
                        },
                    }}
                >
                    <Box>
                        <XButton 
                        text={<CloseIcon />}
                        variant="contained" 
                        buttonSize="large"
                        onClick={() => closeMobileFilter()}
                        sx={{ color: '#17a77f', backgroundColor: '#ffffff', width: 'fit-content', float: 'right' }}
                        />
                    </Box>
                    {productFilterForm}
                </Drawer>
            </Box>
        </React.Fragment>
    )
}

export default Filter