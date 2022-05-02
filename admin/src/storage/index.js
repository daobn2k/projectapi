const store = {
  getCurentUser: () => {
    return JSON.parse(window.localStorage.getItem(`currentUser`));
  },
  setCurrentUser: (data) => {
    window.localStorage.setItem(`currentUser`, JSON.stringify(data));
  },
  getCurrentTimeSheet: () => {
    return JSON.parse(window.localStorage.getItem(`timeS`));
  },
  setCurrentTimeSheet: (data) => {
    window.localStorage.setItem(`timeS`, JSON.stringify(data));
  },
  clearAll: () => {
    window.localStorage.clear();
  },
};

export { store };
