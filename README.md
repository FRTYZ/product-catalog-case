# E-Ticaret Ürün Kataloğu | Case | Fırat YILDIZ

Merhaba, case study görevini istenilen şekilde tamamlanmıştır.

Projede kullanılan teknolojiler
* React
* Typescript
* Redux
* Material UI
* Jest

![alt text](https://github.com/FRTYZ/product-catalog-case/blob/main/public/home.png?raw=true)

![alt text](https://github.com/FRTYZ/product-catalog-case/blob/main/public/cart.png?raw=true)

## Proje kurulumu için gereklilikler
* NodeJS (version minimum v20.10.0)

## Proje nasıl kurulur (Git ile)

* #### Terminali açıp bu komutu kullanabilirsiniz

```
(HTTPS)

git clone https://github.com/FRTYZ/product-catalog-case.git

(SSH)

git clone git@github.com:FRTYZ/product-catalog-case.git
```

* #### Projeyi localinize klonladıktan sonra projenin dizininden terminali açıp sırasıyla bu komutları kullanabilirisiniz

#### Paketleri yükleme
```
npm install
```

#### Projeyi çalıştırma
```
npm run dev
```

#### Projeden build alma
```
npm run dev
```

#### Projedeki testleri çalıştırma
```
npm run test
```

## Projenin ekran görüntüleri

* ### Filtreleme (Kategori)

![alt text](https://github.com/FRTYZ/product-catalog-case/blob/main/public/product-category.png?raw=true)

* ### Filtreleme (Arama)

![alt text](https://github.com/FRTYZ/product-catalog-case/blob/main/public/product-search.png?raw=true)

* ### Filtreleme (Fiyat Aralığı)

![alt text](https://github.com/FRTYZ/product-catalog-case/blob/main/public/product-price.png?raw=true)

* ### Sıralamalar

![alt text](https://github.com/FRTYZ/product-catalog-case/blob/main/public/product-sort.png?raw=true)

* ### Sepet sayfası (miktari güncelleme)

![alt text](https://github.com/FRTYZ/product-catalog-case/blob/main/public/shopbag.png?raw=true)

### Package.json
```
{
  "name": "product-catalog-case",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "jest"
  },
  "dependencies": {
    "@emotion/react": "^11.13.3",
    "@emotion/styled": "^11.13.0",
    "@fontsource/roboto": "^5.1.0",
    "@jest/types": "^29.6.3",
    "@mui/icons-material": "^6.1.6",
    "@mui/material": "^6.1.6",
    "@mui/styled-engine-sc": "^6.1.6",
    "@reduxjs/toolkit": "^2.3.0",
    "formik": "^2.4.6",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-query": "^3.39.3",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.27.0",
    "styled-components": "^6.1.13",
    "sweetalert2": "^11.14.4"
  },
  "devDependencies": {
    "@eslint/js": "^9.13.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.0.1",
    "@testing-library/user-event": "^14.5.2",
    "@types/jest": "^29.5.14",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "eslint": "^9.13.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "globals": "^15.11.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "ts-jest": "^29.2.5",
    "ts-node": "^10.9.2",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.11.0",
    "vite": "^5.4.10"
  }
}

```