import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchCurrencyRates } from '../features/currency/currencySlice';

const CurrencyWidget: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rates = useSelector((state: RootState) => state.currency.rates);
  const status = useSelector((state: RootState) => state.currency.status);
  const error = useSelector((state: RootState) => state.currency.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCurrencyRates());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div className='rates'>
      <h3>Currency Rates</h3>
      <ul>
        {Object.entries(rates).map(([currency, rate]) => (
          <li key={currency}>{currency}: {rate}</li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyWidget;