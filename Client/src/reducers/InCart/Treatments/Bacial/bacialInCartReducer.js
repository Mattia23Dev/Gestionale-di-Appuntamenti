const BACIAL_IN_CART = "BACIAL_IN_CART";
const BACIAL_NOT_IN_CART = "BACIAL_NOT_IN_CART";
const TREATMENTS_CART_RESET = "TREATMENTS_CART_RESET";
const initialState = {
  serviceID: "",
  price: "",
  in_cart: false
};
const bacialInCartReducer = (state= initialState , action) => {
  switch (action.type) {
    case BACIAL_IN_CART:
      const { serviceID, price } = action.payload;
      console.log({ ...state, in_cart: true }, "ao");
      return {
        ...state,
        serviceID,
        price,
        in_cart: true

      };
    case TREATMENTS_CART_RESET:
    case BACIAL_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default bacialInCartReducer;
