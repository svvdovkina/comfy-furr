import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART){
    const {id, color, amount, product} = action.payload;
    const tempItem = state.cart.find(it=>it.id === id + color);
    if (tempItem){
      const tempCart = state.cart.map(cartItem=>{
        if (cartItem.id !== id + color) return cartItem

        let newAmount = cartItem.amount + amount
        if (newAmount > cartItem.max) {
          newAmount = cartItem.max;
        }
        return {...cartItem, amount: newAmount}
      });
      return {
        ...state,
        cart: tempCart
      }
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      };
      return {
        ...state,
        cart: [...state.cart, newItem]
      }
    }
    
  }

  if (action.type === REMOVE_CART_ITEM) {
    const delId = action.payload;
    const newCart = state.cart.filter(it=>it.id!==delId);
    return {
      ...state,
      cart: newCart
    }
  }

  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: []
    }
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const {id, value} = action.payload;
    const newCart = state.cart.map(item=>{
        if (item.id !== id) return item
        item.amount += value;
        if (item.amount > item.max) {
          item.amount = item.max;
        } 
        if (item.amount < 1) {
          item.amount = 1;
        } 
        return item
      })

    return {
      ...state,
      cart: newCart
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
