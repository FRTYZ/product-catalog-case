import { configureStore, createSlice, Middleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { ShopBagType } from './interface';

const bagSlice = createSlice({
    name: 'shopBagItems',
    initialState: { bagItems: [] } as ShopBagType,
    reducers: {
        setBagItems: (state, action) => {
      
        const newDataArray = Array.isArray(action.payload) ? action.payload : [action.payload];
  
        newDataArray.forEach((newData) => {
          const existingDataIndex = state.bagItems.findIndex(
            (data) => data.id === newData.id
          );
  
          if (existingDataIndex !== -1) {
            state.bagItems[existingDataIndex] = {
                ...state.bagItems[existingDataIndex], 
                ...newData,
            };
          } else {
            state.bagItems.push(newData);
          }
        });
      },
      deleteBagItem: (state, action) => {
          const id = action.payload;
          state.bagItems = state.bagItems.filter((item) => item.id !== id);
      },
    },
});

export const { setBagItems, deleteBagItem } = bagSlice.actions;

// rootReducer
const rootReducer = {
    shopBagItems: bagSlice.reducer,
};

// Middleware for localstorage
const saveToLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  localStorage.setItem('shopBagItems', JSON.stringify(store.getState().shopBagItems));
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    // Uploading data to local Storage
    shopBagItems: JSON.parse(localStorage.getItem('shopBagItems') || '{"bagItems": []}'),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorageMiddleware),
});


export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;