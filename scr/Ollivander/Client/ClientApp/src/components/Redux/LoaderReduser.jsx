import { LOADER_OFF, LOADER_ON, VISIBLE_OFF, VISIBLE_ON } from "./Types";

const init = {

    visible: false,
    visibleData: false,
}

export const LoaderReduser = (state = init, action) => {

    switch (action.type) {

        case LOADER_ON: {

            return {
                ...state,
                visible: true
            }
        }

        case LOADER_OFF: {

            return {
                ...state,
                visible: false
            }
        }

        case VISIBLE_ON: {

            return {
                ...state,
                visibleData: true
            }
        }

        case VISIBLE_OFF: {

            return {
                ...state,
                visibleData: false
            }
        }

        default: return state
    }
};