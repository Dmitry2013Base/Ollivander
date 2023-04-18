import FeedbackPoint from '../Feedback/FeedbackPoint';
import Rating from '../Rating/Rating';
import '../../../src/styles/comment.css'


const Comments = ({ comments, isUpdate}) => {

    return (
        <>
            {!isUpdate &&
                <div className="row product-row">
                    <h2 className="header-section">Отзывы</h2>
                    <div className="col-lg-12 col-md-12 col-sm-12 feedback-container">
                        {
                            comments.map(comment =>
                                <div className="message" key={comment.id}>
                                    <div className="feedback">
                                        <div className="user">{comment.user}</div>
                                        <div className="date">{new Date(comment.created).toLocaleDateString()}</div>
                                    </div>

                                    <Rating rating={comment.rate} set={false} />

                                    <FeedbackPoint title="Плюсы" value={comment.plus} />
                                    <FeedbackPoint title="Минусы" value={comment.minus} />
                                    <FeedbackPoint title="Отзыв" value={comment.message} />
                                </div>
                            )
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default Comments;