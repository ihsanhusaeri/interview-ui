import {combineReducers} from 'redux'
import { createNavigationReducer } from 'react-navigation-redux-helpers'
import reducer from './reducer'
import RootNavigation from '../../navigation/Router'

const router= createNavigationReducer(RootNavigation)

const appReducer = combineReducers({
    router,
    reducer
})

export default appReducer