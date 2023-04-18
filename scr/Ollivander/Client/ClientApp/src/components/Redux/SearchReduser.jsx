import { SEARCH_IN_ARRAY, SET_ARRAY } from "./Types";

const init = {

    array: [],
    arrayCopy: [],
}

export const SearchReduser = (state = init, action) => {

    switch (action.type) {

        case SET_ARRAY: {

            return {
                ...state,
                array: action.array,
                arrayCopy: action.array,
            }
        }

        case SEARCH_IN_ARRAY: {

            if (action.searchQuery.length === 0) {

                var next = state.array
            } else {

                if (state.arrayCopy.length > 1) {

                    var next = state.arrayCopy.filter(i => i[action.param].includes(action.searchQuery))
                } else {

                    var next = state.array.filter(i => i[action.param].includes(action.searchQuery))
                }
            }

            return {
                ...state,
                arrayCopy: next,
            }
        }

        default: return state
    }
};