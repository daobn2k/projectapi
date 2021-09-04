const storage = {
    getCurentUser: () => {
      return JSON.parse(window.localStorage.getItem(`currentUser`));
    },
    setCurrentUser:(data) =>{
      window.localStorage.setItem(`currentUser`, JSON.stringify(data));
    },
    clearAll: () => {
      window.localStorage.clear();
    },
  };
  
  export { storage };
  