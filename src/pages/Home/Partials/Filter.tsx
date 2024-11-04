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
    Drawer,
    Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';

// Styled components
const StyledMainFormBox = styled(Box)(({ theme }) => ({
    display: 'grid',
    marginTop: '30px', 
    gridGap: '30px',
    marginInline: '30px'
}));

const StyledPricesBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

const StyledBetweenPricesTypography = styled(Typography)(({ theme }) => ({
    textAlign: 'center', 
    marginInline: '10px'
}));

const StyledButtonBox = styled(Box)(({ theme }) => ({
    display: 'contents',
    gap: '1px'
}));

const StyledDrawerOpenButton = styled(XButton)(({ theme }) => ({
    color: '#17a77f', 
    backgroundColor: '#ffffff', 
    width: 'fit-content', 
    float: 'right'
}));

const StyledDrawerCloseButton = styled(XButton)(({ theme }) => ({
    color: '#17a77f', 
    backgroundColor: '#ffffff'
}));


// İnterfaces and types
import { ProductsProps } from '../Home';

interface FilterProps {
    products?: ProductsProps[],
    onFilter: (filters: { category: string; minPrice: number | null; maxPrice: number | null; search: string }) => void,
    isLoading: boolean
}

function Filter({
    products,
    onFilter,
    isLoading
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
        validate: (values) => {
            const errors: { [key: string]: string } = {};

            const {maxPrice, minPrice } = values;

            if (minPrice !== '' && !((/^\d+$/.test(minPrice) && Number(minPrice) >= 1))) {
              errors.minPrice = "0'dan büyük fiyat belirlemelisiniz.";
            }
        
            if (maxPrice !== '' && !((/^\d+$/.test(maxPrice) && Number(maxPrice) >= 1))) {
              errors.maxPrice = "0'dan büyük fiyat belirlemelisiniz.";
            }

            return errors;
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
          <StyledMainFormBox>
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
                  placeholder='Kategoriler'
                  value={formik.values.selectCategory}
                  selectItems={uniqueCategories}
                  handleChange={formik.handleChange}
              />
            </Box>
            <Box>
                <Typography>Fiyat Aralığı</Typography>
                <StyledPricesBox>
                  <XInput 
                      type='number'
                      label=""
                      name="minPrice"
                      placeholder='Minimum'
                      value={formik.values.minPrice}
                      handleChange={formik.handleChange}
                      hasError={formik.errors.minPrice}
                      size="small"
                  />
                  <StyledBetweenPricesTypography>
                      -
                  </StyledBetweenPricesTypography>
                  <XInput 
                      type='number'
                      label=""
                      name="maxPrice"
                      placeholder='Maximum'
                      value={formik.values.maxPrice}
                      hasError={formik.errors.maxPrice}
                      handleChange={formik.handleChange}
                      size="small"
                  />
                </StyledPricesBox>
              
                <Box
                    sx={{
                        marginTop: 2,
                        color: 'red'
                    }}
                >
                    {formik.errors.maxPrice || formik.errors.minPrice && 
                        <Typography>{formik.errors.maxPrice || formik.errors.minPrice}</Typography>
                    }
                </Box>
            </Box>
           
            <StyledButtonBox>
              <XButton 
                text='Ara' 
                type="submit" 
                variant="contained" 
                buttonSize="large"
                sx={{ backgroundColor: '#17a77f' }}
                disabled={!formik.isValid}
              />
              <XButton 
                text='Temizle'
                variant="contained" 
                buttonSize="large"
                onClick={() => handleResetForm()}
                sx={{ color: '#17a77f', backgroundColor: '#ffffff' }}
              />
            </StyledButtonBox>
          
          </StyledMainFormBox>
        </form>
    )

    const lazyProductFilterForm = (
        <StyledMainFormBox>
            <Box sx={{ display: 'grid', gap: '5px' }}>
                <Skeleton variant="rectangular" width={200} height={15} />
                <Skeleton variant="rectangular" width={310} height={40} />
            </Box>
            <Box sx={{ display: 'grid', gap: '5px' }}>
                <Skeleton variant="rectangular" width={200} height={15} />
                <Skeleton variant="rectangular" width={310} height={40} />
            </Box>
            <Box sx={{ display: 'grid', gap: '5px' }}>
                <Skeleton variant="rectangular" width={200} height={15} />
                <Skeleton variant="rectangular" width={310} height={40} />
            </Box>
            <StyledButtonBox>
                <Skeleton variant="rectangular" width={310} height={50} sx={{ float: 'right' }} />
                <Skeleton variant="rectangular" width={310} height={50} sx={{ float: 'right' }} />
            </StyledButtonBox>
      </StyledMainFormBox>
    )
    
    // Functions
    /* 
        For the "Temizle" button
    */
    const handleResetForm = () => {

        onFilter({
            category: 'all',
            minPrice: null,
            maxPrice: null,
            search: ''
        });

        formik.resetForm();
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
                {isLoading ? lazyProductFilterForm : productFilterForm}
            </Box>
              {/* Mobile filter */}
            <Box
                sx={{ 
                    position: 'absolute',
                    display: {xs: 'block', lg: 'none'}
                }}
            >
                {isLoading ? (
                      <Skeleton variant="rectangular" width={70} height={45} sx={{ float: 'right' }} />
                ): (
                    <StyledDrawerOpenButton 
                        text={<FilterAltIcon  />}
                        variant="contained" 
                        buttonSize="large"
                        onClick={openMobileFilter}
                    />
                )}
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
                        <StyledDrawerCloseButton 
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