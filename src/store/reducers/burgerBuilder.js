import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 10,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS: {
      return updateObj(state, {
        ingredients: action.ingredients,
        totalPrice: 10,
        error: false,
      });
    }
    case actionTypes.FETCH_INGREDIENTS_FAILED: {
      return updateObj(state, { error: true });
    }
    case actionTypes.ADD_INGREDIENTS: {
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
      });
    }
    case actionTypes.REMOVE_INGREDIENTS: {
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
      });
    }

    default: {
      return state;
    }
  }
};

export default Reducer;
