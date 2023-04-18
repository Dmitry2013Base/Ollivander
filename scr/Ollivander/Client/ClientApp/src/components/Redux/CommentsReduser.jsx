import { COMMENT_ERROR, CREATE_COMMENT, GET_COMMENTS } from "./Types";

const init = {

    comments: [],
    commentError: '',
}


export const CommentsReduser = (state = init, action) => {

    switch (action.type) {

        case GET_COMMENTS: {

            return (() => {

                return {
                    ...state,
                    comments: action.data
                }
            })()
        }

        case CREATE_COMMENT: {

            return (() => {

                return {
                    ...state,
                    comments: [action.data, ...state.comments]
                }
            })()
        }

        case COMMENT_ERROR: {

            return (() => {

                return {
                    ...state,
                    commentError: action.message
                }
            })()
        }

        default: return state
    }
};