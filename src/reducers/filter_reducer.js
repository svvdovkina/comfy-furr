import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const maxPrice = Math.max(...action.payload.map(p=>p.price));
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        price: maxPrice,
        maxPrice
      }
    }
  }
  if (action.type === SET_GRIDVIEW){
    return {
      ...state,
      grid_view: true
    }
  }
  if (action.type === SET_LISTVIEW){
    return {
      ...state,
      grid_view: false
    }
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload
    }
  }
  if (action.type === SORT_PRODUCTS) {
    const {sort, filtered_products} = state;
    let tempProducts = [...filtered_products];
    if (sort === 'price-lowest'){
      tempProducts.sort((pr1, pr2)=>pr1.price - pr2.price )
    }
    if (sort === 'price-highest'){
      tempProducts.sort((pr1, pr2)=>pr2.price - pr1.price )
    }
    if (sort === 'name-a'){
      tempProducts.sort((pr1, pr2)=>pr1.name.localeCompare(pr2.name) )
    }
    if (sort === 'name-z'){
      tempProducts.sort((pr1, pr2)=>pr2.name.localeCompare(pr1.name) )
    }
    return {
      ...state,
      filtered_products: tempProducts
    }
  }

  if (action.type === UPDATE_FILTERS) {
    const {name, value} = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value
      }
    }
  }

  if (action.type === FILTER_PRODUCTS) {
    const {all_products} = state;
    const {
      text,
      category,
      company,
      color,
      price,
      maxPrice,
      shipping
    } = state.filters;
    let tempProducts = [...all_products];

    if(text) {
      tempProducts = tempProducts.filter(pr=>
        pr.name.toLowerCase().includes(text.toLowerCase()))
    }

    if(category!=='all') {
      tempProducts = tempProducts.filter(pr=>
        pr.category===category)
    }

    if(company!=='all') {
      tempProducts = tempProducts.filter(pr=>
        pr.company===company)
    }

    if(color!=='all') {
      tempProducts = tempProducts.filter(pr=>
        pr.colors.includes(color))
    }

    if(price!==maxPrice) {
      tempProducts = tempProducts.filter(pr=>
        pr.price <=price)
    }

    if(shipping) {
      tempProducts = tempProducts.filter(pr=>
        pr.shipping === true)
    }


    return {
      ...state,
      filtered_products: tempProducts
    }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...action.payload,
        minPrice: state.filters.minPrice,
        maxPrice: state.filters.maxPrice,
        price: state.filters.maxPrice,
      }
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
  
}

export default filter_reducer
