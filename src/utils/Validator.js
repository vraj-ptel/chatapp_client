import {isValidUsername} from '6pp'

export const userNameValidator=(userName)=>{
    if(!isValidUsername(userName))
    return {isValid:false,errorMessage:"username is invalid"};
}