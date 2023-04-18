import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../Buttons/CustomButton';
import InputVar1 from '../Inputs/InputVar1';
import { loginError, passwordChange } from '../Redux/Actions';


const AccountSetting = ({ setVisible }) => {

    const dispatch = useDispatch()
    const loginErr = useSelector(state => state.UserReduser.loginError)
    const [password, setPassbord] = useState('')
    const [nextPassword, setNextPassword] = useState('')

    const passChange = async (e) => {

        e.preventDefault();

        if (password.length < 5 || nextPassword.length < 5) {

            dispatch(loginError("Минимальная длина пароля - 5 символов"))
        } else {

            dispatch(passwordChange({ id: window.localStorage.getItem("userId"), password: password, nextPassword: nextPassword }, setVisible))
        }
    }

    return (
        <>
            <h2 className="modal-head">Изменить пароль</h2>

            <InputVar1 type={"password"} placeholder="Старый пароль" val={""} getValue={(val) => setPassbord(val)} />
            <InputVar1 type={"password"} placeholder="Новый пароль" val={""} getValue={(val) => setNextPassword(val)} />
            {
                loginError.length > 0 && <p className="login-error">{loginErr}</p>
            }
            <div className="modal-buttons">
                <CustomButton type="button" onClick={passChange}>Изменить</CustomButton>
            </div>
        </>
    );
}

export default AccountSetting;