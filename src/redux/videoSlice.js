import {createSlice} from '@reduxjs/toolkit';

const videoSlice = createSlice({
    name: 'video',
    initialState: {
        currentVideo: {},
        comments: []
    },
    reducers: {
        getVideo: (state, action) => {
            state.currentVideo = action.payload
        },
        likeVideo: (state, action) => {
            if (state.currentVideo.likes.includes(action.payload)) {
                state.currentVideo.likes = state.currentVideo.likes.filter((videoId) => videoId !== action.payload);
                state.currentVideo.likeCount = state.currentVideo.likeCount - 1
            } else {
                state.currentVideo.likes.push(action.payload);
                state.currentVideo.likeCount = state.currentVideo.likeCount + 1
            }
        },
        getComments: (state, action) => {
            state.comments = action.payload
        },
    }
});

export const {getVideo, likeVideo, getComments} = videoSlice.actions;
export default videoSlice.reducer;