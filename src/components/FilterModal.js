import { useEffect, useRef, useState } from "react";
import moment from "moment";

function FilterModal({ closeFilterModal, setMyFavorites, myFavorites }) {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    const [typeState, setTypeState] = useState({
        alltype: true,
        apple: false,
        gameConsole: false,
        controller: false,
        others: false
    })

    const [timeState, setTimeState] = useState({
        alltime: {
            status: true,
            timeRange: {
                start: 0
            }
        },
        one_month: {
            status: false,
            timeRange: {
                start: 0,
                end: 86400 * 30
            }
        },
        three_month: {
            status: false,
            timeRange: {
                start: 86400 * 30,
                end: 86400 * 30 * 3
            }
        },
        half_year: {
            status: false,
            timeRange: {
                start: 86400 * 30 * 3,
                end: 86400 * 30 * 6
            }
        },
        one_year: {
            status: false,
            timeRange: {
                start: 86400 * 30 * 6,
                end: 86400 * 30 * 12
            }
        },
        over_one_year: {
            status: false,
            timeRange: {
                start: 86400 * 30 * 12
            }
        },
    })
    const handleTime = (e) => {
        const { id, checked } = e.target
        if (id == 'alltime' && checked) {
            setTimeState({
                alltime: {
                    ...timeState['alltime'],
                    status: true
                },
                one_month: {
                    ...timeState['one_month'],
                    status: false
                },
                three_month: {
                    ...timeState['three_month'],
                    status: false
                },
                half_year: {
                    ...timeState['half_year'],
                    status: false
                },
                one_year: {
                    ...timeState['one_year'],
                    status: false
                },
                over_one_year: {
                    ...timeState['over_one_year'],
                    status: false
                },

            })
        } else {
            setTimeState({
                ...timeState,
                alltime: {
                    ...timeState['alltime'],
                    status: false
                },
                [id]: {
                    ...timeState[id],
                    status: checked
                }
            })
        }

    }
    const filerTime = () => {
        const filterTimeArr = favorites.filter(favorite => {
            const currentTime = Math.floor(Date.now() / 1000); // 当前时间的 Unix 时间戳

            return Object.keys(timeState).some(key => {
                const { status, timeRange } = timeState[key];
                const { start, end } = timeRange
                if (status) {
                    if (key === 'over_one_year') {
                        return (currentTime - favorite.create_at) > start;
                    }
                    else {
                        return (currentTime - favorite.create_at) >= start && (currentTime - favorite.create_at) < end;
                    }
                }

                return false;
            });
        });
        console.log(filterTimeArr)
        setMyFavorites(filterTimeArr);

    }






    const handleType = (e) => {
        const { id, checked } = e.target;
        if (id == 'alltype' && checked) {
            setTypeState({
                alltype: true,
                apple: false,
                gameConsole: false,
                controller: false,
                others: false
            })
            // return;
        } else {
            setTypeState({
                ...typeState,
                alltype: false,
                [id]: checked
            })
        }
    }
    const filterFavorite = () => {
        if (typeState.alltype) {
            setMyFavorites(favorites);
        } else {
            const filteArr = favorites.filter(favorite => typeState[favorite.category]);
            setMyFavorites(filteArr);
        }
        if (timeState.alltime.status) {
            closeFilterModal();
            return
        }
        filerTime();
        closeFilterModal();
    }
    const reset = () => {
        setTypeState({
            alltype: true,
            apple: false,
            gameConsole: false,
            controller: false,
            others: false
        })
    }





    return (
        <div id="filterModal" className="modal" tabIndex="-1">
            {JSON.stringify(typeState)};
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">篩選條件</h5>
                        <button type="button" className="btn-close"
                            aria-label="Close"
                            onClick={closeFilterModal}
                        >
                        </button>
                    </div>
                    <div className="modal-body">

                        <div className="border-bottom">
                            <h5>商品類型</h5>
                            <ul
                                style={{
                                    display: 'table',
                                    margin: '0px',
                                    padding: '0px'
                                }}>
                                <li className="option">
                                    <input type="checkbox" id='alltype'
                                        checked={typeState.alltype}
                                        onChange={(e) => handleType(e)}
                                    />
                                    <label htmlFor="alltype">全部</label>
                                </li>
                                <li className="option">
                                    <input type="checkbox" id='apple'
                                        checked={typeState.apple}
                                        onChange={(e) => handleType(e)} />
                                    <label htmlFor="apple">蘋果</label>
                                </li>
                                <li className="option">
                                    <input type="checkbox" id='gameConsole'
                                        checked={typeState.gameConsole}
                                        onChange={(e) => handleType(e)} />
                                    <label htmlFor="gameConsole">遊戲主機</label>
                                </li>
                                <li className="option">
                                    <input type="checkbox" id='controller'
                                        checked={typeState.controller}
                                        onChange={(e) => handleType(e)} />
                                    <label htmlFor="controller">遊戲手把</label>
                                </li>
                                <li className="option">
                                    <input type="checkbox" id='others'
                                        checked={typeState.others}
                                        onChange={(e) => handleType(e)} />
                                    <label htmlFor="others">其他</label>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="mt-3">
                                <h5>放入下次再買時間</h5>
                            </div>
                            <ul
                                style={{
                                    display: 'table',
                                    margin: '0px',
                                    padding: '0px'
                                }}>
                                <li className="option">
                                    <input type="checkbox" id='alltime'
                                        checked={timeState.alltime.status}
                                        onChange={(e) => handleTime(e)}
                                    />
                                    <label htmlFor="alltime">全部</label>
                                </li>
                                <li className="option">
                                    <input type="checkbox" id='one_month'
                                        checked={timeState.one_month.status}
                                        onChange={(e) => handleTime(e)}
                                    />
                                    <label htmlFor="one_month">一個月內</label>
                                </li>
                                <li className="option">
                                    <input type="checkbox" id='three_month'
                                        checked={timeState.three_month.status}
                                        onChange={(e) => handleTime(e)}

                                    />
                                    <label htmlFor="three_month">三個月內</label>
                                </li>
                                <li className="option">
                                    <input type="checkbox" id='half_year'
                                        checked={timeState.half_year.status}
                                        onChange={(e) => handleTime(e)}
                                    />
                                    <label htmlFor="half_year">六個月內</label>
                                </li>
                                <li className="option">
                                    <input type="checkbox" id='one_year'
                                        checked={timeState.one_year.status}
                                        onChange={(e) => handleTime(e)}
                                    />
                                    <label htmlFor="one_year">一年內</label>
                                </li>
                                <li className="option">
                                    <input type="checkbox" id='over_one_year'
                                        checked={timeState.over_one_year.status}
                                        onChange={(e) => handleTime(e)}
                                    />
                                    <label htmlFor="over_one_year">超過一年</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                            onClick={reset}
                        >重新設定</button>
                        <button type="button" className="btn btn-primary"
                            onClick={filterFavorite}
                        >確認</button>
                    </div>
                </div>
            </div>
        </div>)
}

export default FilterModal