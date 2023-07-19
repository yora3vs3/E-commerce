import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paymentMethod: ""
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        SET_PAYMENT_METHOD(state, action) {
            //   console.log(action.payload);
            state.paymentMethod = action.payload;
        }
    },
});

export const {SET_PAYMENT_METHOD } = paymentSlice.actions;

export const selectPaymentMethod= (state) => state.payment.paymentMethod;

export default paymentSlice.reducer;