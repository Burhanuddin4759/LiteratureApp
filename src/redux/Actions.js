import { ADD_HORIZON_CATEGORIES } from "./Constants";

export function addHorizonCategories(item) {
    return {
        type: ADD_HORIZON_CATEGORIES,
        data: item
    }
}