const initialState = {
  isConnected: false,
  symbols: [],
};

export const marketData = (state = initialState, action: any) => {
  switch (action.type) {
    case "MARKET_DATA": {
      const { data } = action ?? {};
      return { ...state, symbols: data };
    }

    case "CONNECTED": {
      const { data } = action ?? {};
      return { ...state, isConnected: data };
    }
    default:
      return state;
  }
};
