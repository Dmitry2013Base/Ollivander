import { ALERT_BAD_OFF, ALERT_BAD_ON, ALERT_OK_OFF, ALERT_OK_ON } from "./Types";

const init = {

    visibleOk: false,
    visibleBad: false,
    visible: false
}

export const AlertReduser = (state = init, action) => {

    switch (action.type) {

        case ALERT_OK_ON: {

            return {
                ...state,
                visibleOk: true,
                visible: true
            }
        }

        case ALERT_OK_OFF: {

            return {
                ...state,
                visibleOk: false,
                visible: false
            }
        }

        case ALERT_BAD_ON: {

            return {
                ...state,
                visibleBad: true,
                visible: true
            }
        }

        case ALERT_BAD_OFF: {

            return {
                ...state,
                visibleBad: false,
                visible: false
            }
        }

        default: return state
    }
};