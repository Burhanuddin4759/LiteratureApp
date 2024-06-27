import { CHANGE_THEME } from "./Constants";

const initialState = true

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return action.data
        default:
            return state
    }
}