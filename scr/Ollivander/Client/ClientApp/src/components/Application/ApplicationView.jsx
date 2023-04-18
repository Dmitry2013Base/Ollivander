import { useDispatch } from "react-redux";
import CustomButton from "../Buttons/CustomButton";
import { updateOrder, updateOrderComment, updateOrderStatus } from "../Redux/Actions";
import Select from "../Select/Select";


const ApplicationView = ({ application, isEdit, statuses, setVisible }) => {

    const dispatch = useDispatch();
    const updateStatus = (status) =>  dispatch(updateOrderStatus(status))

    return (
        <div className="application">
            <h3 className="modal-head">Заказ №{application.id}</h3>
            <p className="application-p"><b><u>Покупатель:</u></b>&nbsp;{application.userName}</p>
            <p className="application-p"><b><u>Создано:</u></b>&nbsp;{new Date(application.created).toLocaleDateString()}</p>
            <p className="application-p"><b><u>Товар:</u></b>&nbsp;{application.productName}</p>
            <p className="application-p"><b><u>Сумма:</u></b>&nbsp;{application.productPrice} руб.</p>
            {
                (isEdit)
                    ? <>
                        <Select array={statuses} current={application.statusName} getValue={updateStatus} />
                        <textarea className="textarea-base" placeholder="Комментарий" value={(application.comment !== null) ? application.comment : ''} onChange={e => dispatch(updateOrderComment(e.target.value))}></textarea>
                        <div>
                            <CustomButton onClick={(e) => { e.preventDefault(); dispatch(updateOrder(application, setVisible)) }}>Сохранить</CustomButton>
                        </div>
                    </>
                    : <>
                        <p className="application-p"><b><u>Статус:</u></b>&nbsp;{application.statusName}</p>
                        <p className="application-p"><b><u>Комментарий:</u></b>&nbsp;{application.comment}</p>
                    </>
            }
            <p className="application-ps">Последнее изменение:&nbsp;{new Date(application.dateChange).toLocaleDateString()}&nbsp;{application.userChange}</p>
        </div>
    );
}
export default ApplicationView;