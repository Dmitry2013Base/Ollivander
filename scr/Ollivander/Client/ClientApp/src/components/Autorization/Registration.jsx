import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../Buttons/CustomButton';
import InputVar1 from '../Inputs/InputVar1';
import { loginError, registration } from '../Redux/Actions';


const Registration = ({ setVisible }) => {

    const dispatch = useDispatch()
    const loginErr = useSelector(state => state.UserReduser.loginError)
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const reg = (e) => {

        e.preventDefault();

        if (password != passwordRepeat) {

            dispatch(loginError("Пароли не совпадают"))
            return
        }

        if (login.length < 5 || password.length < 5) {

            dispatch(loginError("Минимальная длина логина и пароля - 5 символов"))
        } else {

            dispatch(registration({ login: login, password: password, passwordRepeat: passwordRepeat }, setVisible))
        }
    }

    return (
        <>
            <h2 className="modal-head">Регистрация</h2> 
            <InputVar1 type={"text"} placeholder={"Логин"} val={""} getValue={(val) => setLogin(val)} />
            <InputVar1 type={"password"} placeholder={"Пароль"} val={""} getValue={(val) => setPassword(val)} />
            <InputVar1 type={"password"} placeholder={"Повторите пароль"} val={""} getValue={(val) => setPasswordRepeat(val)} />
            {
                loginErr.length > 0 && <p className="login-error">{loginErr}</p>
            }
            <div className="modal-buttons">
                <CustomButton type="button" onClick={reg}>Зарегистрироваться</CustomButton>
            </div>
        </>
    );
}

export default Registration;