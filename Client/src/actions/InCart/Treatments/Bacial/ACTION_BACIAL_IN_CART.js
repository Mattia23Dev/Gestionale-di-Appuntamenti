const BACIAL_IN_CART = "BACIAL_IN_CART";

const ACTION_BACIAL_IN_CART = (id) => {
  console.log(id, "iddi")
  
  return {
    type: BACIAL_IN_CART,
    payload: {
      serviceID: id, //Added serviceID key with value of id
      name: "Bacial",
      price: 120,
      duration: 50,
    },
  };
};

export default ACTION_BACIAL_IN_CART;
