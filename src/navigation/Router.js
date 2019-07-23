import {createStackNavigator, createAppContainer} from 'react-navigation'

import Submit from '../screen/Submit'
import Home from '../screen/Home'
import Question from '../screen/Question'
import Interview from '../screen/Interview'

const RootStack = createStackNavigator({
    Submit:{screen:Submit,
        navigationOptions:{
            header:null
        }
    },
    Home:{screen:Home,
        navigationOptions:{
            header:null
        }
    },
    Question:{screen:Question,
        navigationOptions:{
            header:null
        }
    },
    Interview:{screen:Interview,
        navigationOptions:{
            header:null
        }

    }  
},
    {
        initialRouteName:'Home'
    }
)
export default createAppContainer(RootStack)

