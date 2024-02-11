import { UPDATE_EMAIL } from "./userTypes";

export const updateEmail = email => {
    return {
        type : UPDATE_EMAIL,
        payload : email
    }
}