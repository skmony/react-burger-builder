import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 10,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    ...state.ingredients,
  };
  updatedIngredient[action.ingredientType]++;

  const priceAddition = INGREDIENT_PRICES[action.ingredientType];
  const oldPrice = state.totalPrice;
  const newPrice = oldPrice + priceAddition;
  return updateObj(state, {
    totalPrice: newPrice,
    ingredients: updatedIngredient,
    building: true,
  });
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    ...state.ingredients,
  };

  if (updatedIngredient[action.ingredientType]) {
    updatedIngredient[action.ingredientType]--;
  }

  const priceAddition = INGREDIENT_PRICES[action.ingredientType];
  const oldPrice = state.totalPrice;
  const newPrice = oldPrice - priceAddition;
  return updateObj(state, {
    totalPrice: newPrice,
    ingredients: updatedIngredient,
    building: true,
  });
};

const setIngredient = (state, action) => {
  return updateObj(state, {
    ingredients: action.ingredients,
    totalPrice: 10,
    error: false,
    building: false,
  });
};

const fetchIngredientFailed = (state) => {
  return updateObj(state, { error: true });
};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientFailed(state);

    case actionTypes.ADD_INGREDIENTS:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredient(state, action);

    default:
      return state;
  }
};

export default Reducer;
