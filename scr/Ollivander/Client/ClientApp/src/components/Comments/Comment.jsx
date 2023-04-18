import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../Buttons/CustomButton';
import Rating from '../Rating/Rating';
import { createComment } from '../Redux/Actions';
import InputVar1 from '../Inputs/InputVar1';

const Comment = ({ productId, setVisible }) => {

    const dispatch = useDispatch()
    const commentErr = useSelector(state => state.CommentsReduser.commentError)
    const [plus, setPlus] = useState('');
    const [minus, setMinus] = useState('');
    const [commit, setCommit] = useState('');
    const [rating, setRating] = useState(5);

    const GetRating = (rate) => setRating(rate * 0.05)

    const createComm = (e) => {

        e.preventDefault();
        dispatch(createComment(productId,
            {
                user: { userName: window.localStorage.getItem("userName") },
                product: { id: productId },
                plus: plus,
                minus: minus,
                message: commit,
                rate: rating
            },
            setVisible
        ))
    }
    
    return (
        <>
            <h3 className="form-name">Отзыв</h3>
            <InputVar1 type={"text"} placeholder={"Плюсы"} val={""} getValue={(val) => setPlus(val)} />
            <InputVar1 type={"text"} placeholder={"Минусы"} val={""} getValue={(val) => setMinus(val)} />
            <InputVar1 type={"text"} placeholder={"Комментарий"} val={""} getValue={(val) => setCommit(val)} />      
            <label>Оценка</label>
            <Rating rating={rating} set={true} get={GetRating} />
            {
                commentErr.length > 0 && <p className="comment-error">{commentErr}</p>
            }
            <div className="flex">
                <CustomButton type="button" onClick={createComm}>Отправить</CustomButton>
            </div>
        </>
    );
}

export default Comment;