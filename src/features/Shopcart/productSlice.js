import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'
export const fetchProduct = createAsyncThunk('products/fetchProducts', async()=>{
       const response = await axios.get("https://fakestoreapi.com/products");
       return response.data;
})
const productSlice = createSlice({
    name:'products',
    initialState:{
        items:[],
        status:'idle'
    },
    extraReducers:(builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.status='Loading'
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
             state.status='Succeeded',
             state.items = action.payload
        })
        .addCase(fetchProduct.rejected, (state) => {
            state.status='failed'
        })
    }

})

export default productSlice.reducer;