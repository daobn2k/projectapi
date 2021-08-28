import { createSlice} from '@reduxjs/toolkit'


const product = createSlice({
    name:'products',
    initialState: [],
    reducers: {
        addProduct:(state, action) =>{
            state.push(action.payload)
        }
    }
});


const {reducers, actions} = product;

export const {addProduct} = actions;

export default reducers