import axios from "../../service/axios";
export const RegisterApiCall = async(userCredentials)=>{
    try{
        await axios.post('/api/users',userCredentials);
    }catch(error){
        console.log(error);
    }
}