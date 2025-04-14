import  {createSlice} from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem("theme")) || {
    bgColor : 'bg-gray-100 text-gray-800',
    headerColor : 'bg-blue-600 text-white',
    cardColor : 'bg-white text-gray-800 ',
    footerColor : 'bg-white text-gray-800',
    activeColor : 'bg-blue-500 text-white',
    spinner : 'black'
}

localStorage.setItem("theme" , JSON.stringify(initialState))

const themeSlicer = createSlice({
    name : 'themeSlicer',
    initialState,
    reducers : {
        changeTheme : (state , action) => {
            state.headerColor = action.payload.header
            state.cardColor = action.payload.card
            state.bgColor = action.payload.bg
            state.footerColor = action.payload.footer
            state.activeColor = action.payload.active
            state.spinner = action.payload.spin
            localStorage.setItem("theme" , JSON.stringify(state))
        }
    }
})

export const {changeTheme} = themeSlicer.actions 

export default themeSlicer.reducer