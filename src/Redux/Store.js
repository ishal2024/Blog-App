import authSlicer from '../Redux/Slicer'
import {configureStore} from '@reduxjs/toolkit'
import themeSlicer from './ThemeSlicer'

export const store = configureStore({
    reducer : {
        auth : authSlicer,
        theme : themeSlicer 
    }
}) 
