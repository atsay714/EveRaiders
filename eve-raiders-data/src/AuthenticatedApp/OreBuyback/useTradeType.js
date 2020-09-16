import React, { createContext, useContext } from "react";

const TradeTypeContext = createContext();

export const TradeTypeProvider = (props) => (
  <TradeTypeContext.Provider {...props} />
);

const useTradeType = () => useContext(TradeTypeContext);

export default useTradeType;
