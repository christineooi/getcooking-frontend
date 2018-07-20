import { LOGIN_USER,LOGOUT_USER } from "../config";

export const userState ={
    userid :'',
    firstname : '',
    lastname :'',
    email : '',
    token : '',
    loginSuccess : false,
}

export const authReducer = (state = userState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, 
                userid: action.payload.user.userid, 
                firstname: action.payload.user.firstname, 
                lastname: action.payload.user.lastname,
                email: action.payload.user.email, 
                token: action.payload.token, 
                loginSuccess: true 
            };
        case LOGOUT_USER:
            return { ...state, 
                userid: '', 
                firstname: '', 
                lastname: '',
                email: '', 
                token: null, 
                loginSuccess: false 
            };
        default:
            return state;
    }
}    