const initialState= {
    user:{},
    answer:{},
    questions: [],
    fetching: false,
    fetched: false,
    error:null
}
const reducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET_USER':
            // console.log(action.payload.data)
            state = {
                ...state, user:action.payload.data
            }
            return state
        case 'FETCH_QUESTIONS_PENDING':
            state = {
                ...state, fetching:true, questions:[]
            }
            return state
            break
        case 'FETCH_QUESTIONS_FULFILLED':
            state = {
                ...state, fetching:false, fetched: true, questions:action.payload.data.data
            }
            // console.log(action.payload.data)
            return state
            break
        case 'FETCH_QUESTIONS_REJECTED':
            state = {
                ...state, fetching:false, error:action.payload
            }
            return state
            break
        case 'SET_ANSWER':{
            state = {
                answer:action.payload
            }
            return state
            break
        }
        default:
            return state
    }

}
export default reducer