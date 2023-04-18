import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../Autorization/Login';
import Registration from '../Autorization/Registration';
import ButtonLink from '../Buttons/ButtonLink';
import Modal from '../Form/Modal';
import '../../../src/styles/header.css'
import { loginError, logout } from '../Redux/Actions';
import AccountSetting from '../Autorization/AccountSetting';


const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.UserReduser)
    const routes = useSelector(state => state.RoutesReduser)
    const [visibleModal, setVisibleModal] = useState(false);
    const [modalNotAuthorized, setModalNotAuthorized] = useState(true);
    const [modalSetting, setModalSetting] = useState(false);
    const [dev, setDev] = useState(false);

    useEffect(() => {

        dispatch(loginError(""))
    }, [visibleModal])

    const login = () => {

        setModalSetting(false)
        setVisibleModal(true);
        setModalNotAuthorized(true);
    }

    const registration = () => {

        setModalSetting(false)
        setVisibleModal(true);
        setModalNotAuthorized(false);
    }

    const loguot = () => {

        dispatch(logout())
    }

    const setting = () => {

        setModalSetting(true);
        setVisibleModal(true);
    }

    const main = () => { window.sessionStorage.setItem("category", 'default'); navigate('/') }

    const [mainArray, setMainArray] = useState([])
    const [devArray, setDevArray] = useState([])
    const [notAutorizeArray, setNotAutorizeArray] = useState([
        { name: "Логин", delegate: login, count: 0 },
        { name: "Регистрация", delegate: registration, count: 0 },
    ])
    const accountArray = [
        { name: "Мои заказы", delegate: () => navigate('/orders', { state: { userName: window.localStorage.getItem("userName") } }), count: 0 },
        { name: "Корзина", delegate: () => { window.sessionStorage.setItem("category", 'basket'); navigate('/basket') }, count: user.collections.find(e => e.name === "basket").count },
        { name: "Избранное", delegate: () => { window.sessionStorage.setItem("category", 'favourites'); navigate('/favourites') }, count: user.collections.find(e => e.name === "favourites").count },
        { name: "Настройки", delegate: setting, count: 0 },
        { name: "Выйти", delegate: loguot, count: 0 }
    ]

    useEffect(() => {

        if (routes.userRoles.includes("Admin")) {
            setDevArray([
                { name: "Создать продукт", delegate: () => navigate('../product/0', { state: { isUpdate: true } }), count: 0 },
                { name: "Управление пользователями", delegate: () => navigate('/dev'), count: 0 },
                { name: "Заказы", delegate: () => navigate('/orders'), count: 0 }
            ])
            setDev(true)
        } else {
            if (routes.userRoles.includes("Manager")) {

                setDevArray([
                    { name: "Заказы", delegate: () => navigate('/orders'), count: 0 }
                ])
                setDev(true)
            } else {

                if (routes.userRoles.includes("Analyst")) {

                    setDevArray([
                        { name: "Управление пользователями", delegate: () => navigate('/dev'), count: 0 },
                    ])
                    setDev(true)
                } else {

                    setDev(false)
                    setDevArray([])
                }
            }
        }
    }, [routes.userRoles])

    return (
        <header className="header">
            <nav>
                <div className="logotip">
                    <ButtonLink array={mainArray} position="left" onClick={main}>Ollivander</ButtonLink>
                </div>

                <div className="menu">
                    {
                        dev &&
                        <ButtonLink array={devArray} position="right">Управление</ButtonLink>
                    }
                    {
                        (window.localStorage.getItem("userName") !== null)
                            ? <ButtonLink array={accountArray} position="right">{window.localStorage.getItem("userName")}</ButtonLink>
                            : <ButtonLink array={notAutorizeArray} position="right">Личный кабинет</ButtonLink>
                    }
                </div>
                <div className="logotip-mob">
                    <ButtonLink array={((window.localStorage.getItem("userName") === null)) ? [...notAutorizeArray] : [...[{ name: "Главная", delegate: () => main(), count: 0 }], ...mainArray, ...devArray, ...accountArray]} position="center">Ollivander</ButtonLink>
                </div>
            </nav>

            <Modal visible={visibleModal} setVisible={setVisibleModal}>
                {
                    (modalSetting)
                        ? <AccountSetting setVisible={setVisibleModal} />
                        :
                        <>
                            {
                                (modalNotAuthorized)
                                    ? <Login setVisible={setVisibleModal} />
                                    : <Registration setVisible={setVisibleModal} />
                            }
                        </>
                }
            </Modal>
        </header>
    );
}

export default Header;
