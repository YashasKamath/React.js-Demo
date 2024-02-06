import { UPDATE_FARMERS } from "./farmersTypes";

export const updateFarmers = farmer => {
    return {
        type : UPDATE_FARMERS,
        payload : farmer
    }
}