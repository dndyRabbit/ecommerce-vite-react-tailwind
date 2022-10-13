import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartState: false,
  cardItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

const CardSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    setOpenCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setAddItemToCart: (state, action) => {
      const itemIndex = state.cardItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cardItems[itemIndex].cardQuantity += 1;
        toast.success(`Item qty increased.`);
      } else {
        const temp = { ...action.payload, cardQuantity: 1 };
        state.cardItems.push(temp);
        toast.success(`${action.payload.title} added to cart.`);
      }

      localStorage.setItem("cart", JSON.stringify(state.cardItems));
    },
    setRemoveItemFromCart: (state, action) => {
      const removeItem = state.cardItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cardItems = removeItem;
      localStorage.setItem("cart", JSON.stringify(state.cardItems));

      toast.success(`${action.payload.title} removed from cart.`);
    },

    setIncreaseItemQTY: (state, action) => {
      const itemIndex = state.cardItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cardItems[itemIndex].cardQuantity += 1;
        toast.success(`Item qty increased.`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cardItems));
    },
    setDecreaseItemQTY: (state, action) => {
      const itemIndex = state.cardItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cardItems[itemIndex].cardQuantity > 1) {
        state.cardItems[itemIndex].cardQuantity -= 1;
        toast.success(`Item qty decreased.`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cardItems));
    },
    setClearItemQTY: (state, action) => {
      state.cardItems = [];
      toast.success("All item removed.");

      localStorage.setItem("cart", JSON.stringify(state.cardItems));
    },

    setGetTotals: (state, action) => {
      let { totalAmount, totalQTY } = state.cardItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cardQuantity } = cartItem;
          const totalPrice = price * cardQuantity;

          cartTotal.totalAmount += totalPrice;
          cartTotal.totalQTY += cardQuantity;

          return cartTotal;
        },
        {
          totalAmount: 0,
          totalQTY: 0,
        }
      );
      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQTY;
    },
  },
});

export const {
  setOpenCart,
  setCloseCart,
  setAddItemToCart,
  setRemoveItemFromCart,
  setIncreaseItemQTY,
  setDecreaseItemQTY,
  setClearItemQTY,
  setGetTotals,
} = CardSlice.actions;

export const selectCartState = (state) => state.cart.cartState;
export const selectCartItems = (state) => state.cart.cardItems;

export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalQTY = (state) => state.cart.cartTotalQuantity;

export default CardSlice.reducer;
