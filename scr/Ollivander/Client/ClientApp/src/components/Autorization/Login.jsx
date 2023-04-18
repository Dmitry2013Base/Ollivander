import { useState } from 'react';
import CustomButton from '../Buttons/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginError } from '../Redux/Actions';
import InputVar1 from '../Inputs/InputVar1';


const Login = ({ setVisible }) => {

    const dispatch = useDispatch()
    const loginErr = useSelector(state => state.UserReduser.loginError)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = async (e) => {

        e.preventDefault();

        if (userName.length < 5 || password.length < 5) {

            dispatch(loginError("Минимальная длина логина и пароля - 5 символов"))
        } else {

            dispatch(login({ login: userName, password: password }, setVisible))
        }
    }

    return (
        <>
            <h2 className="modal-head">Логин</h2>

            <InputVar1 type={"text"} placeholder={"Логин"} val={""} getValue={(val) => setUserName(val)} />
            <InputVar1 type={"password"} placeholder={"Пароль"} val={""} getValue={(val) => setPassword(val)} />
            {
                loginErr.length > 0 && <p className="login-error">{loginErr}</p>
            }
            <div className="modal-buttons">
                <CustomButton type="button" onClick={userLogin}>Войти</CustomButton>
            </div>
        </>
    );
}

export default Login;