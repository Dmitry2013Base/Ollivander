import { useSelector } from "react-redux";
import '../../../src/styles/loader.css'

const Loader = () => {

    const loader = useSelector(state => state.LoaderReduser)

    return (
        <>
            {
                (loader.visible)
                    ? <div className="loader"><div className="loader-content"><div className="load-header">Подождите</div><div className="load"></div></div></div>
                    : <div className="loader loader-not-visible"><div className="loader-content"><div className="load-header">Подождите</div><div className="load"></div></div></div>
            }    
        </>
    );
}
export default Loader;