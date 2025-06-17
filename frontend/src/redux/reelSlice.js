// src/redux/reelSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    reels: []
}

export const reelSlice = createSlice({
    name: 'reel',
    initialState,
    reducers: {
        setReels: (state, action) => {
            state.reels = action.payload;
        },
        addNewReel: (state, action) => {
            state.reels.unshift(action.payload);
        },
        // Add other reel-specific reducers as needed
    }
});

export const { setReels, addNewReel } = reelSlice.actions;
export default reelSlice.reducer;