import axios from '../../service/axios';


export const LoginApiCall=async(userCredentials)=>{

    try{
        const user = await axios.post('/auth/login',userCredentials);
        console.log("login-error",user.data);
    }catch(error){
        console.log('Error',error);
    }
}