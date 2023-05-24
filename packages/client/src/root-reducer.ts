import { combineReducers } from 'redux';
import { marketData } from './market-data.reducer';

//-----------------------------------------
const clientReducers = {
  marketData,
};

//-----------------------------------------
export const rootReducer = combineReducers({
  ...clientReducers,
});

