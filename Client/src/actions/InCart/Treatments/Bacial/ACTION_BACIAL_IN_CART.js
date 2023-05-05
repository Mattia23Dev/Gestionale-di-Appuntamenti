const BACIAL_IN_CART = "BACIAL_IN_CART";

const ACTION_BACIAL_IN_CART = (id, price, duration , name) => {
  console.log(id, "id")
  
  return {
    type: BACIAL_IN_CART,
    payload: {
      id: id, 
      name: name,
      price: price,
      duration: duration,
      
    },
  };
};

export default ACTION_BACIAL_IN_CART;
