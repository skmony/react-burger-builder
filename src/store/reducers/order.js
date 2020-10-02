import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../utility";

const initialState = {
  order: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state) => {
  return updateObj(state, { purchased: false });
};
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObj(action.orderData, { id: action.orderId });

  return updateObj(state, {
    loading: false,
    purchased: true,
    orders: state.order.concat(newOrder),
  });
};

const purchaseBurgerFail = (state) => {
  return updateObj(state, { loading: false });
};

const purchaseBurgerStart = (state) => {
  return updateObj(state, { loading: true });
};

const fetchOrderStart = (state) => {
  return updateObj(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
  return updateObj(state, { loading: false, order: action.orders });
};

const fetchOrderFail = (state, action) => {
  return updateObj(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: {
      return purchaseInit(state);
    }
    case actionTypes.PURCHASE_BURGER_SUCCESS: {
      return purchaseBurgerSuccess(state, action);
    }
    case actionTypes.PURCHASE_BURGER_FAIL: {
      return purchaseBurgerFail(state);
    }
    case actionTypes.PURCHASE_BURGER_START: {
      return purchaseBurgerStart(state);
    }
    case actionTypes.FETCH_ORDERS_START: {
      return fetchOrderStart(state);
    }
    case actionTypes.FETCH_ORDERS_SUCCESS: {
      return fetchOrderSuccess(state, action);
    }
    case actionTypes.FETCH_ORDERS_FAIL: {
      return fetchOrderFail(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
