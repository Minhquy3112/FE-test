import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define your initial state
const initialState = {
  payments: [],
  status: 'idle',
  error: null,
};

// Define the asynchronous thunk for fetching payments
export const fetchPayments = createAsyncThunk('payments/fetchPayments', async () => {
  const response = await fetch('http://localhost:8080/api/payments');
  const data = await response.json();
  return data;
});

// Define the asynchronous thunk for creating a new payment
export const createPayment = createAsyncThunk('payments/createPayment', async (paymentData) => {
  const response = await fetch('http://localhost:8080/create-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });
  const data = await response.json();
  console.log(data);
  
  return data;
});

// Create a slice
const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = 'failed';
        // state.error = action.error.message;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.payments=action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.status = 'failed';
        // state.error = action.error.message;
      });
  },
});

// Export actions and reducer

export const paymentReducer= paymentSlice.reducer;
