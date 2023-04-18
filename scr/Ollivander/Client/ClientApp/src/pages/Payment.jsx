import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder, getPayment, orderError } from '../components/Redux/Actions';
import '../../src/styles/payment.css'
import CustomButton from '../components/Buttons/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import ProductBuy from '../components/Product/ProductBuy';


const Payment = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useLocation()
    const reduser = useSelector(state => state.PaymentReduser)
    const [cardNumber, setCardNumber] = useState('')
    const [cardMonth, setCardMonth] = useState('')
    const [cardYear, setCardYear] = useState('')
    const [cardCode, setCardCode] = useState('')
    const [checkRemove, setCheckRemove] = useState(false)
    const card = useRef(null)
    const month = useRef(null)
    const year = useRef(null)
    const code = useRef(null)
    const buy = useRef(null)


    useEffect(() => {

        dispatch(getPayment(state.items))
    }, [])


    const updateCardNumber = (e) => {

        var val = e.target.value

        if (cardNumber.length - e.target.value.length === 1) {

            setCardNumber(val)

            if (checkRemove) {

                setCardNumber(val.substring(0, val.length - 1))
                setCheckRemove(false)
            }

            if (val[val.length - 1] === '-') {

                setCheckRemove(true)
            }

        } else {

            setCheckRemove(false)
            if (!Number(val[val.length - 1])) {

                if (val.length !== 0) {

                    return
                }
            }

            if (val.length < 20) {

                setCardNumber(val)

                if ((val.length === 4 || val.length === 9 || val.length === 14) && val.length < 16) {

                    setCardNumber(val + '-')
                }
            }

            if (val.length === 19) {

                month.current.focus();
            }
        }
    }

    const updateMouth = (e) => {

        var val = e.target.value

        if (val >= 0 && val <= 12) {

            setCardMonth(val)

            if (val.length === 2) {

                year.current.focus();
            }
        }
    }

    const updateYear = (e) => {

        var val = e.target.value

        if (val >= 0) {

            setCardYear(val)

            if (val.length === 2) {

                code.current.focus();
            }
        }
    }

    const updateCode = (e) => {

        var val = e.target.value

        if (val >= 0 && val < 1000) {

            setCardCode(val)

            if (val.length === 3) {

                buy.current.focus();
            }
        }
    }

    const createApplication = () => {

        if (cardNumber.length !== 19) {

            dispatch(orderError("Заполните номер карты"))
            card.current.focus();
            return
        }

        if (cardMonth.length !== 2) {

            dispatch(orderError("Заполните месяц"))
            month.current.focus();
            return
        }

        if (cardYear.length !== 2) {

            dispatch(orderError("Заполните год"))
            year.current.focus();
            return
        }

        if (cardCode.length !== 3) {

            dispatch(orderError("Заполните год"))
            code.current.focus();
            return
        }

        const orderBuy = {

            user: { id: window.localStorage.getItem("userId") },
            cardNumber,
            cardMonth,
            cardYear,
            cardCode,
            productsId: state.items,
        }

        dispatch(createOrder(orderBuy))   
    }

    return (
        <section className="container">
            <h1 className="payment-header">Введите реквизиты карты</h1>

            <div className="row credit-card">
                <div className="card-container">
                    <div className="cr-card">

                        <div className="card-name">
                            <p>Кредитная карта</p>
                        </div>

                        <input className="input" ref={card} type="text" value={cardNumber} onChange={updateCardNumber} placeholder="Номер карты" />

                        <div className="credit-card-date">
                            <input className="input card-date" ref={month} value={cardMonth} onChange={updateMouth} type="number" placeholder="Месяц" />
                            <input className="input card-date" ref={year} value={cardYear} onChange={updateYear} type="number" placeholder="Год" />
                        </div>
                    </div>

                    <div className="card-back">
                        <div className="stripe"></div>
                        <input className="input code" ref={code} value={cardCode} onChange={updateCode} type="number" placeholder="CVC/CVV2" />
                    </div>
                </div>
            </div>
            {
                reduser.orderError !== '' && <p className="payment-error">{reduser.orderError}</p>
            }
            <div className="row buy-items">
                <h2 className="payment-header">Товары</h2>
                <ProductBuy items={reduser.items} />
            </div>

            <div className="payment-price">К оплате: <b>{reduser.items.map(a => a.price).reduce((a, b) => a + b, 0)} руб.</b></div>

            <div className="row payment-buttons">
                <CustomButton onClick={() => navigate(-1)}>Отменить</CustomButton>
                <button ref={buy} className="button-base" onClick={createApplication}>Оплатить</button>
            </div>
        </section> 
    );
}

export default Payment;