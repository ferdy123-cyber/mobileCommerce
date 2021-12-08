const initialState = {
  isLogin: '',
  userId: '',
  data: [],
  detailData: {
    name: '',
    price: '',
    qty: '',
    type: '',
    description: '',
  },
  profil: {
    id: '',
    username: '',
    email: '',
    avatar: '',
  },
  loadingCart: false,
  cart: [],
  productId: '',
  transaction: [],
};

const Reducer = (state = initialState, action) => {
  if (action.type === 'isLogin') {
    return {
      ...state,
      isLogin: action.value,
    };
  }

  if (action.type === 'userId') {
    return {
      ...state,
      userId: action.value,
    };
  }

  if (action.type === 'get') {
    return {
      ...state,
      data: action.value,
    };
  }

  if (action.type === 'getDetail') {
    return {
      ...state,
      detailData: action.value,
    };
  }

  if (action.type === 'getProfil') {
    return {
      ...state,
      profil: action.value,
    };
  }

  if (action.type === 'setLoadingCart') {
    return {
      ...state,
      loadingCart: action.value,
    };
  }

  if (action.type === 'getCart') {
    return {
      ...state,
      cart: action.value,
    };
  }

  if (action.type === 'getTransaction') {
    return {
      ...state,
      transaction: action.value,
    };
  }

  if (action.type === 'productId') {
    return {
      ...state,
      productId: action.value,
    };
  }

  return state;
};

export default Reducer;
