import { UPDATE_EMAIL } from "./userTypes";

export const updateUserEmail = email => {
    return {
        type : UPDATE_EMAIL,
        payload : email
    }
}