import { useDispatch } from 'react-redux';
import CustomButton from '../Buttons/CustomButton';
import Param from '../Product/Param';
import { addParamForProduct } from '../Redux/Actions';


const Characteristics = ({ product, isUpdate }) => {

    const dispatch = useDispatch()

    return (
        <div className="row product-row">
            <h3 className="header-section">Характеристики</h3>
            <div className="col-lg-12 col-md-12 col-sm-12 params-container">
                {
                    product.infos.map(e =>

                        <Param key={e.id} deviceInfos={e} isUpdate={isUpdate} />
                    )
                }
            </div>
            {
                isUpdate &&
                <div className="param-button-add">
                    <CustomButton className="button-base" onClick={() => dispatch(addParamForProduct())}>Добавить</CustomButton>
                </div>
            }
        </div>
    );
}

export default Characteristics;