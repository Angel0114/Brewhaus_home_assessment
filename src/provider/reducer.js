export default function appReducer(state, action) {
  switch (action.type) {
    case "UPDATE_BEER_LIST":
      return {
        ...state,
        beerList: [...action.payload],
      };

    case "SET_LIGHT_MODE":
      return { ...state, lightMode: action.payload };

    default:
      return state;
  }
}
