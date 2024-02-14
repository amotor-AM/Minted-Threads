import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // add to cart
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };

    case 'CART_REMOVE_ITEM':
      const item = action.payload;
      const updatedCart = state.cart.cartItems.filter(
        (cartItem) => cartItem._id !== item._id
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCart,
        },
      };

    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };

    case 'USER_SIGNOUT':
      return { ...state, userInfo: null };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}