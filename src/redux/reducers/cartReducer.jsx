import { ADD_ORDER } from "../actions/cartActions";

const initialState = {
  orders: [],
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state, action.payload],
      };
    default:
      return state;
  }
};
export default cartReducer;
