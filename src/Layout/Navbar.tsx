import * as React from 'react';
import { styled } from '@mui/material/styles';

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge
} from '@mui/material';

import { 
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: '1px',
  backgroundColor: '#ffffff',
  marginBottom: '20px'
}));

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
    display:'flex'
}));

const StyledLogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  alignItems: 'center'
}));

const StyledLogoTypography = styled(Typography)(({ theme }) => ({
  display: 'block',
  fontSize: '18px',
  fontWeight: 500,
  color: '#000000',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px'
  },
}));

export default function Navbar() {

  return (
    <StyledAppBar position="static">
        <StyledToolBar>
            <Link 
              to='/' 
              style={{
                textDecoration: 'none'
              }}
            >
              <StyledLogoBox>
                 <img 
                    src={'https://yetisplus.com/images/brand_logo.png'} 
                    width={'40'} 
                    height={'40'} 
                    style={{
                      height: '40px',
                      objectFit: 'contain',
                      borderRadius: '5px'
                    }}
                />
                 <StyledLogoTypography>
                   Ürün Kataloğu Case
                </StyledLogoTypography>
              </StyledLogoBox>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="default"
              sx={{ display: 'flex' }}
            >
              <Badge badgeContent={17} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
        </StyledToolBar>
      </StyledAppBar>
  );
}