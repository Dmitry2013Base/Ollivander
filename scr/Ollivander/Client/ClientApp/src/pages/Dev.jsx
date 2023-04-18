import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../src/styles/development.css'
import { addOrRemoveUserRole, createRole, getAllRoles, getRoles, getStatPayment, getStatUsers, getStatProduct, getStatuses, getUsers, removeRole, searchSetArray } from '../components/Redux/Actions'
import 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import ChartSetting from '../components/Chart/ChartSetting'
import InputVar1 from '../components/Inputs/InputVar1'
import CustomButton from '../components/Buttons/CustomButton'
import Search from '../components/Search/Search'


const Dev = () => {

    const dispatch = useDispatch()
    const reduser = useSelector(state => state.DevelopmentReduser)
    const statReduser = useSelector(state => state.StatisticReduser)
    const search = useSelector(state => state.SearchReduser.arrayCopy)

    useEffect(() => {

        dispatch(getUsers())
        dispatch(getAllRoles())
        dispatch(getStatuses())

        const statisticPrises = {

            Status: 4,
            Group: false,
            DateStart: '2000-01-01',
            DateFinish: '2020-01-01',
            limit: 10,
        }

        dispatch(getStatPayment(statisticPrises))
        dispatch(getStatUsers(statisticPrises))
        dispatch(getStatProduct(statisticPrises))
    }, [])

    useEffect(() => {

        dispatch(searchSetArray(reduser.users))
    }, [reduser.users])


    const [cuttentRole, setCuttentRole] = useState(null)
    const [cuttentUser, setCuttentUser] = useState(null)
    const [visiblePlus, setVisiblePlus] = useState(false)
    const [visibleMinus, setVisibleMinus] = useState(false)
    const [visibleTrash, setVisibleTrash] = useState(false)
    const [role, setRole] = useState('')

    const setVisible = (role) => {

        setCuttentRole(role)

        if (reduser.roles.includes(role.roleName)) {

            setVisibleMinus(true)
        } else {

            setVisiblePlus(true)
        }

        setVisibleTrash(true)
    }

    const create = () => {

        if (role.length !== 0 && !reduser.allRoles.some(e => e.roleName === role)) {

            dispatch(createRole(role))
        } 
    }

    const getStatisticPayment = (settings) => {

        const flag = Boolean(settings.group.indexOf(settings.selectPeriod))

        if (settings.year === '' && !flag) {

            if (settings.dateStart !== '' && settings.dateFinish !== '') {

                var statisticPrises = {

                    Status: (typeof settings.selectStatus === 'undefined') ? 1 : statReduser.statuses.indexOf(settings.selectStatus) + 1,
                    Group: flag,
                    DateStart: settings.dateStart,
                    DateFinish: settings.dateFinish,
                }

                dispatch(getStatPayment(statisticPrises))
            }

        } else if (settings.year !== '' && flag) {

            var date = new Date(new Date(settings.year)).getFullYear()

            var statisticPrises = {

                Status: (typeof settings.selectStatus === 'undefined') ? 1 : statReduser.statuses.indexOf(settings.selectStatus) + 1,
                Group: flag,
                DateStart: `${date}-01-01`,
                DateFinish: `${Number(date) + 1}-01-01`,
            }

            dispatch(getStatPayment(statisticPrises))
        }
    }

    const getStatisticUsers = (settings) => {

        const flag = Boolean(settings.group.indexOf(settings.selectPeriod))

        if (settings.year === '' && !flag) {

            if (settings.dateStart !== '' && settings.dateFinish !== '') {

                var statisticPrises = {

                    Group: flag,
                    DateStart: settings.dateStart,
                    DateFinish: settings.dateFinish,
                }

                dispatch(getStatUsers(statisticPrises))
            }

        } else if (settings.year !== '' && flag) {

            var date = new Date(new Date(settings.year)).getFullYear()

            var statisticPrises = {

                Group: flag,
                DateStart: `${date}-01-01`,
                DateFinish: `${Number(date) + 1}-01-01`,
            }

            dispatch(getStatUsers(statisticPrises))
        }
    }

    const getStatisticProduct = (settings) => {

        if (settings.limit !== '') {

            if (settings.dateStart !== '' && settings.dateFinish !== '') {

                var statisticPrises = {

                    Status: (typeof settings.selectStatus === 'undefined') ? 1 : statReduser.statuses.indexOf(settings.selectStatus) + 1,
                    DateStart: settings.dateStart,
                    DateFinish: settings.dateFinish,
                    Limit: settings.limit
                }

                dispatch(getStatProduct(statisticPrises))
            }
        }
    }


    return (
        <div className="container">
            <div className="row">
                <h2 className="header-section">Список пользователей</h2>
                <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                    <p className="users-header">Пользователи</p>

                    <Search param={'userName'} />

                    <div className="list-1">
                        <ul className="users">
                            {
                                search.map(item =>
                                    <li
                                        key={item.id}
                                        className={(reduser.currentUser === item) ? "user-item user-selected" : "user-item"}
                                        onClick={() => { dispatch(getRoles(item)); setCuttentUser(item) }}>
                                        {item.userName}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-12 col-12">
                    <div className="dev-icons">
                        <div
                            className={(visiblePlus) ? "dev-icon" : "dev-icon dev-icon-not-visible" }
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => { e.preventDefault(); (cuttentRole !== null && cuttentUser !== null) && dispatch(addOrRemoveUserRole(cuttentUser.id, cuttentRole.roleName, true)) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                            </svg>
                        </div>
                        <div
                            className={(visibleMinus) ? "dev-icon" : "dev-icon dev-icon-not-visible"}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => { e.preventDefault(); (cuttentRole !== null && cuttentUser !== null) && dispatch(addOrRemoveUserRole(cuttentUser.id, cuttentRole.roleName, false)) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                            </svg>
                        </div>
                        <div
                            className={(visibleTrash) ? "dev-icon" : "dev-icon dev-icon-not-visible"}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => { e.preventDefault(); (cuttentRole !== null) && dispatch(removeRole(cuttentRole.roleName)); setCuttentRole(null) }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                    <p className="roles-header">Роли</p>
                    <div className="create-role">
                        <InputVar1 type={"text"} placeholder="Создать роль" val={role} getValue={(val) => setRole(val)} />
                        <CustomButton onClick={create}>Создать</CustomButton>
                    </div>
                    <div className="list-2">
                        <ul className="roles">
                            {
                                reduser.allRoles.map(item =>
                                    <li
                                        key={item.roleName}
                                        className={(reduser.roles.includes(item.roleName) ? "role role-selected" : "role")}
                                        draggable={true}
                                        onDragStart={() => setVisible(item)}
                                        onDragEnd={(e) => { e.preventDefault(); setCuttentRole(null); setVisiblePlus(false); setVisibleMinus(false); setVisibleTrash(false) }}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => { e.preventDefault(); setCuttentRole(null) }}>
                                        {item.roleName}
                                    </li>      
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row">
                <h2 className="header-section">Статистика</h2>

                <h3>Продажи</h3>
                <div className="chart-item">
                    <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                        <div className="statistic-item">
                            <ResponsiveContainer height="100%" width="100%">
                                <LineChart data={statReduser.statisticPayment}>
                                    <XAxis dataKey="key" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                    <Line type="monotone" dataKey="prises" name="Сумма" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <ChartSetting getSettings={getStatisticPayment} visGroup={true} visDates={true} visStatuses={true} visLimit={false} />
                    </div>
                </div>

                <h3>Зарегистрированные пользователи</h3>
                <div className="chart-item">
                    <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                        <div className="statistic-item">
                            <ResponsiveContainer height="100%" width="100%">
                                <LineChart data={statReduser.statisticUser}>
                                    <XAxis dataKey="key" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                    <Line type="monotone" dataKey="users" name="Количество" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <ChartSetting getSettings={getStatisticUsers} visGroup={true} visDates={true} visStatuses={false} visLimit={false} />
                    </div>
                </div>

                <h3>Популярные товары</h3>
                <div className="chart-item">
                    <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                        <div className="statistic-item">
                            <ResponsiveContainer height="100%" width="100%">
                                <BarChart data={statReduser.statisticProduct}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="key" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" name="Кол-во покупок" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <ChartSetting getSettings={getStatisticProduct} visGroup={false} visDates={true} visStatuses={true} visLimit={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dev;