const BACIAL_NOT_IN_CART = "BACIAL_NOT_IN_CART";

const ACTION_BACIAL_NOT_IN_CART = (id, price, duration , name) => {
  console.log(id, "id in not cart")
  
  return {
    type: BACIAL_NOT_IN_CART,
    payload: {
      id: id, 
      name: name,
      price: price,
      duration: duration,
      
    },
  };
};

export default ACTION_BACIAL_NOT_IN_CART;
