import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../utility";

const initialState = {
  order: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: {
      return updateObj(state, { purchased: false });
    }
    case actionTypes.PURCHASE_BURGER_SUCCESS: {
      const newOrder = updateObj(action.orderData, { id: action.orderId });

      return updateObj(state, {
        loading: false,
        purchased: true,
        orders: state.order.concat(newOrder),
      });
    }
    case actionTypes.PURCHASE_BURGER_FAIL: {
      return updateObj(state, { loading: false });
    }
    case actionTypes.PURCHASE_BURGER_START: {
      return updateObj(state, { loading: true });
    }
    case actionTypes.FETCH_ORDERS_START: {
      return updateObj(state, { loading: true });
    }
    case actionTypes.FETCH_ORDERS_SUCCESS: {
      return updateObj(state, { loading: false, order: action.orders });
    }
    case actionTypes.FETCH_ORDERS_FAIL: {
      return updateObj(state, { loading: false, error: action.error });
    }
    default:
      return state;
  }
};

export default reducer;
