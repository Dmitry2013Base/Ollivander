import { useEffect, useState } from 'react'
import '../../styles/rating.css'


const Rating = (props) => {

    const [rating, setRating] = useState(props.rating / 0.05);
    const [isSetRating, setIsSetRating] = useState(false);

    const SetRating = (value, isSet) => {

        if (props.set) {

            setIsSetRating(isSet);
            setRating(value / 0.05);
        }
    };

    const GetRating = () => {

        return rating;
    };

    useEffect(() => {

        if (typeof props.rating !== 'undefined') {

            setRating(props.rating / 0.05)
        }
    }, [props.rating])

    return (
        <div className="rating">
            <div className="rating-body">
                <div className="rating-active" style={{ width: `${rating}%` }}></div>
                <div className="rating-items">
                    <input type="radio" value="1" name="rating" className="rating-item" onMouseEnter={e => { SetRating(e.target.value, false) }} onMouseLeave={() => { if(props.set && !isSetRating) setRating(props.rating * 20) }} onClick={e => { SetRating(e.target.value, true); try { props.get(GetRating()) } catch { } }} />
                    <input type="radio" value="2" name="rating" className="rating-item" onMouseEnter={e => { SetRating(e.target.value, false) }} onMouseLeave={() => { if(props.set && !isSetRating) setRating(props.rating * 20) }} onClick={e => { SetRating(e.target.value, true); try { props.get(GetRating()) } catch { } }} />
                    <input type="radio" value="3" name="rating" className="rating-item" onMouseEnter={e => { SetRating(e.target.value, false) }} onMouseLeave={() => { if(props.set && !isSetRating) setRating(props.rating * 20) }} onClick={e => { SetRating(e.target.value, true); try { props.get(GetRating()) } catch { } }} />
                    <input type="radio" value="4" name="rating" className="rating-item" onMouseEnter={e => { SetRating(e.target.value, false) }} onMouseLeave={() => { if(props.set && !isSetRating) setRating(props.rating * 20) }} onClick={e => { SetRating(e.target.value, true); try { props.get(GetRating()) } catch { } }} />
                    <input type="radio" value="5" name="rating" className="rating-item" onMouseEnter={e => { SetRating(e.target.value, false) }} onMouseLeave={() => { if(props.set && !isSetRating) setRating(props.rating * 20) }} onClick={e => { SetRating(e.target.value, true); try { props.get(GetRating()) } catch { } }} />
                </div>
            </div>

            <div className="rating-value">{ Math.round(rating * 0.05 * 10) / 10 }</div>
        </div>
    );
}

export default Rating;