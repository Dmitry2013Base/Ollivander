import { useDispatch } from "react-redux";
import CustomButton from "../Buttons/CustomButton";
import InputVar1 from "../Inputs/InputVar1";
import { paramRemove, paramTitleUpdate, paramValueUpdate } from "../Redux/Actions";

const Param = ({ deviceInfos, isUpdate }) => {

    const dispatch = useDispatch()

    return (
        <>
            {
                (!isUpdate)
                    ? <div className="param-section">
                        <div className="section-param">
                            <div>{deviceInfos.title}</div>
                        </div>
                        <div className="section-value">{deviceInfos.value}</div>
                    </div>
                    : <div className="param-section-intups">
                        <div className="section-param-input">
                            <InputVar1 type={"text"} placeholder={"Характеристика"} val={deviceInfos.title} getValue={(val) => dispatch(paramTitleUpdate(deviceInfos.id, val))} />
                        </div>

                        <div className="intups">
                            <div className="section-value-input">
                                <InputVar1 type={"text"} placeholder={"Значение"} val={deviceInfos.value} getValue={(val) => dispatch(paramValueUpdate(deviceInfos.id, val))} />
                            </div>

                            <CustomButton className="button-base" onClick={() => dispatch(paramRemove(deviceInfos.id))}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                            </CustomButton>
                        </div>
                    </div>
            }
        </>
    );
}

export default Param;