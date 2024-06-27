import { CHANGE_THEME } from "./Constants";


export function change_theme(isDarkMode) {
    return {
        type: CHANGE_THEME,
        data: isDarkMode
    }
}

