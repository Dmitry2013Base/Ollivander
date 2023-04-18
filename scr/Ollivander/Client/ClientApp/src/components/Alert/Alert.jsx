import { useSelector } from 'react-redux';
import '../../../src/styles/alert.css'


const Alert = () => {

    const reduser = useSelector(state => state.AlertReduser)

    return (
        <div className={reduser.visible ? 'alert-container alert-visible' : 'alert-container alert-not-visible'} >
            {
                reduser.visibleOk &&
                <div className="alert-view alert-ok">
                    ✓ Шалость удалась!
                </div>
            }

            {
                reduser.visibleBad &&
                <div className="alert-view alert-bad">
                    ✕ Операция не выполнена!
                </div>
            }
        </div>
    );
}

export default Alert;