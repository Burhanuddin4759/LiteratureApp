import { ADD_HORIZON_CATEGORIES } from "./Constants";

const initialState = []

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_HORIZON_CATEGORIES:
            return [
                ...state,
                ...action.data
            ]
        default:
            return state
    }
}