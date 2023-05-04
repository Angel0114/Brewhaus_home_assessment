import React, { createContext, useReducer } from "react";

import appReducer from "./reducer";

const initialState = {
  beerList: [],
  lightMode: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function updateBeerList(beers) {
    dispatch({
      type: "UPDATE_BEER_LIST",
      payload: beers,
    });
  }

  function setLightMode(mode) {
    dispatch({
      type: "SET_LIGHT_MODE",
      payload: mode,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        beerList: state.beerList,
        lightMode: state.lightMode,
        updateBeerList,
        setLightMode,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
