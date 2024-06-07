import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CurrencyState {
  rates: { [key: string]: number };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CurrencyState = {
  rates: {},
  status: 'idle',
  error: null,
};

export const fetchCurrencyRates = createAsyncThunk(
  'currency/fetchCurrencyRates',
  async () => {
    const response = await axios.get('/api/p24api/pubinfo?json&exchange&coursid=5');
    return response.data;
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rates = action.payload.reduce((acc: { [key: string]: number }, rate: any) => {
          acc[rate.ccy] = rate.buy;
          return acc;
        }, {});
      })
      .addCase(fetchCurrencyRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default currencySlice.reducer;