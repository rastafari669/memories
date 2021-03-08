import {FETCH_ALL,CREATE_POST,UPDATE,DELETE, LIKE} from '../constants/actionTypes'

export default (posts = [], action) => {

    switch(action.type){
        case  FETCH_ALL:
            return action.payload;
        case CREATE_POST:
            return [...posts, action.payload];
        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        case DELETE:
            return posts.filter((post) => post._id !== action.payload)
        
            return
        default:
        return posts;
    }
}