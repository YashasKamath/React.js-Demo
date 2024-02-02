import { UPDATE_NAME, UPDATE_ADDRESS, UPDATE_RATING, UPDATE_EMAIL } from "./farmerTypes";

export const updateName = name => {
    return {
        type : UPDATE_NAME,
        payload : name
    }
}

export const updateAddress = address => {
    return {
        type : UPDATE_ADDRESS,
        payload : address
    }
}

export const updateRating = rating => {
    return {
        type : UPDATE_RATING,
        payload : rating
    }
}

export const updateEmail = email => {
    return {
        type : UPDATE_EMAIL,
        payload : email
    }
}