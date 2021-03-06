import axios from 'axios'
import CONSTANT from '../../../url'

export function setUser(data, nav){
    return(dispatch) =>{
        const {name, email, phone_number} = data
        console.log(data);
        
        axios.post(`${CONSTANT.BASE_URL}api/v1/user`,{
            name,
            email,
            phone_number
        }).then((res) =>{
            dispatch({
                type: 'SET_USER',
                payload: res.data.data
            })

            nav.navigate('Home')
        })
        .catch((err) =>{
            console.log(err)
 
        })
    }
}
export function getQuestions(data, nav){
    return(dispatch) =>{
        dispatch({
            type: 'FETCH_QUESTIONS',
            payload: axios.get(`${CONSTANT.BASE_URL}api/v1/questions`)
            
        })
    }
}
export function setAnswer(data){
    return(dispatch) => {
        const {userId, questionId, answer, attachment=""} = data
        dispatch({
            type:'SET_ANSWER',
            payload: axios.post(`${CONSTANT.BASE_URL}api/v1/answer`,{
                userId,
                questionId,
                answer,
                attachment
            })
        })
        console.log(questionId)
        console.log(userId)
        console.log(answer)
    }
}