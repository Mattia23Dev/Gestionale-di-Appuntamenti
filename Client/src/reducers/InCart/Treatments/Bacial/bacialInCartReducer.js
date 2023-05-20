const BACIAL_IN_CART = "BACIAL_IN_CART";
const BACIAL_NOT_IN_CART = "BACIAL_NOT_IN_CART";
const TREATMENTS_CART_RESET = "TREATMENTS_CART_RESET";
const initialState = {
  id: "",
  duration: "",
  name: "",
  price: "",
  in_cart: false,
};
const bacialInCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case BACIAL_IN_CART:
      const { id, price, duration, name, employees } = action.payload;
      console.log({ ...state, in_cart: true }, "bacial in cart reducer");
      return {
        ...state,
        id,
        price,
        duration,
        name,
        employees,
        in_cart: true,
      };
    case TREATMENTS_CART_RESET:
    case BACIAL_NOT_IN_CART:
      return    {
        ...state,
        id,
        price,
        duration,
        name,
        in_cart: false,
      };
    default:
      return { ...state };
  }
};

export default bacialInCartReducer;
