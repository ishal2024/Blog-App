import  {createSlice} from '@reduxjs/toolkit'


const initialState = {
    status : false,
    userData : null,
    pop : false,
    popText : "",
    popColor : "",
    userPhoto : null
}

const authSlicer = createSlice({
    name : 'authSlicer',
    initialState,
    reducers : {
       logIn : (state,action) => {
        state.status = true
        state.userData = action.payload
       },
       logOut : (state,action) => {
        state.status = false
        state.userData = null
       },
       popUp : (state , action) => {
        state.pop = true
        state.popText = action.payload.text
        state.popColor = action.payload.colour
       },
       popHide : (state , action) => {
        state.pop = false
       },
       setPhoto : (state , action) => {
        state.userPhoto = action.payload
       }
    }
})

export const {logIn, logOut , popUp , popHide , setPhoto } = authSlicer.actions

export default authSlicer.reducer