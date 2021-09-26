
const storage = {
  getCartCurrent: () => {
    return JSON.parse(window.localStorage.getItem('cartCurrent'));
  },
  setCartCurrent:(data) =>{
    window.localStorage.setItem(`cartCurrent`, JSON.stringify(data));
  },
  
  clearCartCurrent: () => {
    window.localStorage.removeItem(`cartCurrent`);
  },

  getCurrentUser: () => {
    return JSON.parse(window.localStorage.getItem('currentUser'));
  },
  setCurrentUser:(data) =>{
    window.localStorage.setItem(`currentUser`, JSON.stringify(data));
  },
};

export {storage};