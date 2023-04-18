import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CustomButton from "../Buttons/CustomButton"
import InputVar1 from "../Inputs/InputVar1"
import { getStatuses } from "../Redux/Actions"
import Select from "../Select/Select"


const ChartSetting = ({ getSettings, ...props }) => {

    const dispatch = useDispatch()
    const statReduser = useSelector(state => state.StatisticReduser)
    const [dateStart, setDateStart] = useState('')
    const [dateFinish, setDateFinish] = useState('')
    const [year, setYear] = useState('')
    const [group, setGroup] = useState(["По годам", "По месяцам"])
    const [limit, setLimit] = useState('')
    const [selectPeriod, setSelectPeriod] = useState('По годам')
    const [selectStatus, setSelectStatus] = useState(statReduser.statuses[3])

    useEffect(() => {

        dispatch(getStatuses())
    }, [])

    return (
        <div className="statistic-form">
            {
                props.visGroup && <Select array={group} current={selectPeriod} getValue={(val) => { setSelectPeriod(val); setYear('') }} />
            }
            {
                props.visDates &&
                <>
                    {
                        selectPeriod !== "По месяцам"
                            ? <>
                                <InputVar1 type={"date"} val={""} getValue={(val) => setDateStart(val)} />
                                <InputVar1 type={"date"} val={""} getValue={(val) => setDateFinish(val)} />
                            </>
                            : <InputVar1 type={"number"} placeholder="Год" val={year} getValue={(val) => setYear(val)} />
                    }
                </>
            }
            {
                props.visStatuses && <Select array={statReduser.statuses} current={selectStatus} getValue={(val) => setSelectStatus(val)} />
            }
            {
                props.visLimit && <InputVar1 type={"number"} placeholder="Кол-во товаров" val={limit} getValue={(val) => setLimit(val)} />
            }
            <CustomButton onClick={() => getSettings({
                dateStart,
                dateFinish,
                year,
                group,
                selectPeriod,
                selectStatus,
                limit,
            })}>Показать</CustomButton>
        </div>
    );
}

export default ChartSetting;