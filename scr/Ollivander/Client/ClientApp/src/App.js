import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCountCollectionItems, getUserRoles, logout } from './components/Redux/Actions';
import Header from './components/Header/Header';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import '../src/styles/root.css'
import '../src/styles/style.css'
import Loader from './components/Loader/Loader';
import Alert from './components/Alert/Alert';


if (window.sessionStorage.getItem("currentPage") === null) {

    window.sessionStorage.setItem("currentPage", 1)
}

if (window.sessionStorage.getItem("category") === null) {

    window.sessionStorage.setItem("category", "default")
}

const App = () => {

    const dispatch = useDispatch()
    const reduser = useSelector(state => state.RoutesReduser)
    const user = useSelector(state => state.UserReduser)

    useEffect(() => {

        if (window.localStorage.getItem("AccessToken") !== null && window.localStorage.getItem("RefrechToken") !== null) {

            if (window.localStorage.getItem("userId") !== null) {

                if (window.localStorage.getItem("time") !== null) {

                    if (new Date(window.localStorage.getItem("time")) >= new Date(new Date())) {

                        const userId = window.localStorage.getItem("userId")

                        dispatch(getUserRoles(userId, userId))
                        dispatch(getCountCollectionItems(userId))
                    } else {

                        dispatch(logout())
                    }
                } else {

                    dispatch(logout())
                }
            } else {

                dispatch(logout())
            }
        }
        else {

            dispatch(getUserRoles())
        }
    }, [user.counter])

    return (
        <div>
            <Header/>
            <Loader/>
            <Alert/>
            <Routes>
                {
                    reduser.routes.map(({ path, element }) =>

                        <Route key={path} path={path} element={element} exact />
                    )
                }
            </Routes>
        </div>
    );
}

export default App;

