import { storage } from "./storage";
export const addToCart = (data) => {
  const cart = storage.getCartCurrent();

  if (cart) {
    const exist = cart?.find((e) => e.id === data.id);
    if (exist) {
      const index = cart?.findIndex((e) => e.id === data.id);
      cart[index] = {
        ...exist,
        product_quantity: exist.product_quantity + 1,
      };
      storage.setCartCurrent(cart);
    } else {
      const dataSet = {
        id: data.id,
        product_name: data.product_name,
        product_image: data.product_image,
        product_price: data.product_price,
        product_quantity: 1,
        product_description: data.product_description,
      };
      storage.setCartCurrent([...cart, dataSet]);
    }
  } else {
    const dataSet = [
      {
        id: data.id,
        product_name: data.product_name,
        product_image: data.product_image,
        product_price: data.product_price,
        product_quantity: 1,
        product_description: data.product_description,
      },
    ];
    storage.setCartCurrent(dataSet);
  }
};

export const incrementCart = (id) => {
  const cart = storage.getCartCurrent();

  const exist = cart?.find((e) => e.id === id);
  const idCartItem = cart?.findIndex((e) => e.id === id);
  cart[idCartItem] = {
    ...exist,
    product_quantity: exist.product_quantity + 1,
  };

  storage.setCartCurrent(cart);
};

export const decrementCart = (id) => {
  const cart = storage.getCartCurrent();

  const exist = cart?.find((e) => e.id === id);
  const idCartItem = cart?.findIndex((e) => e.id === id);
  if (cart.length < 0) {
    storage.clearCartCurrent();
  } else {
    if (exist.product_quantity === 1) {
      cart.splice(idCartItem, 1);
      storage.setCartCurrent(cart);
    } else {
      cart[idCartItem] = {
        ...exist,
        product_quantity: exist.product_quantity - 1,
      };
      storage.setCartCurrent(cart);
    }
  }
};

export const deleteCart = (data) => {
  const cart = storage.getCartCurrent();
  if (cart) {
    const index = cart?.findIndex((e) => e.id === data.id);
    cart.splice(index, 1);
    storage.setCartCurrent(cart);
  }
};
