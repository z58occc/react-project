import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import { useOutletContext } from "react-router-dom";
import FilterModal from "../../components/FilterModal";
import { Modal } from "bootstrap";

function NextTime() {
    const [myFavorites, setMyFavorites] = useState([]);
    const [isLoadingCart, setIsLoadingCart] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(1);
    const dispatch = useDispatch();
    const { getCart } = useOutletContext();
    const checked = useRef([]);
    const allChoose = useRef();
    const [disabled, setDisabled] = useState(false);
    const filterModal = useRef(null);







    const addToCart = async (myFavorite) => {
        const data = {
            data: {
                product_id: myFavorite.id,
                qty: cartQuantity,
            }
        }
        setIsLoadingCart(true);
        try {
            const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
                data,
            );
            console.log(res);
            dispatch(createAsyncMessage(res.data));
            getCart();
            setIsLoadingCart(false);
        } catch (error) {
            console.log(error)
            setIsLoadingCart(false);
            dispatch(createAsyncMessage(error.response.data));
        }

    }

    const addToCartAll = async () => {
        for (let index = checked.current.length - 1; index >= 0; index--) {
            if (checked?.current[index]?.checked) {
                await addToCart(myFavorites[index]);
            }
        }
        const remain = myFavorites.filter((_, index) => !checked?.current[index]?.checked);
        setMyFavorites(remain);
        localStorage.setItem('favorites', JSON.stringify(remain));


    }

    const deleteFavoriteAll = () => {
        const remain = myFavorites.filter((_, index) => !checked?.current[index]?.checked);
        setMyFavorites(remain);
        localStorage.setItem('favorites', JSON.stringify(remain));
    }

    const deleteFavorite = (id) => {

        const filterFavorites = myFavorites.filter((item) => item.id != id);
        localStorage.setItem('favorites', JSON.stringify(filterFavorites));
        if (filterFavorites.length == 0) {
            localStorage.clear();
        }
        setMyFavorites(filterFavorites);

    }
    const hadleChange = (e) => {
        setDisabled(allChoose.current.checked);
        if (e.target.checked) {
            for (let index = 0; index < checked.current.length; index++) {
                checked.current[index].checked = true;
            }
        } else {
            for (let index = 0; index < checked.current.length; index++) {
                checked.current[index].checked = false;
            }
        }
    }


    let sortFavorites;
    const handleSort = (e) => {
        const { value } = e.target;
        switch (value) {

            case '1':
                console.log(1);
                sortFavorites = [...myFavorites].sort((a, b) => a.create_at - b.create_at);
                break;
            case '2':
                console.log(2);
                sortFavorites = [...myFavorites].sort((a, b) => b.create_at - a.create_at);
                break;
            case '3':
                console.log(3);
                sortFavorites = [...myFavorites].sort((a, b) => a.price - b.price);
                break;
            case '4':
                console.log(4);
                sortFavorites = [...myFavorites].sort((a, b) => b.price - a.price);
                break;

            default:
                break;
        }
        setMyFavorites(sortFavorites);
    }
    const openFilterModal = () => {
        filterModal.current.show();
    }
    const closeFilterModal = () => {
        filterModal.current.hide();
    }
    const defaultSort=()=>{
        //一開始先讓他跑一個排序 之後再想要怎麼處理
        
    }

    useEffect(() => {
        
        filterModal.current = new Modal('#filterModal');
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        sortFavorites = [...favorites].sort((a, b) => a.create_at - b.create_at);
        setMyFavorites(sortFavorites);

        
    }, [])


    return (
        <div className="container vh-100 ">
            <FilterModal
                closeFilterModal={closeFilterModal}
                setMyFavorites={setMyFavorites}
                myFavorites={myFavorites}
            ></FilterModal>
            <div className="ms-10 me-10 mt-5">
                <div >
                    <input type="checkbox"
                        onChange={hadleChange}
                        className="ms-2"
                        id='all'
                        ref={allChoose}
                    />
                    <label htmlFor="all" className="me-5">全選</label>
                    <span
                        style={{
                            cursor: `${disabled ? 'pointer' : 'not-allowed'}`,
                            display: 'inline-block',
                            width: '100px',
                        }}
                        className="me-5"
                    >
                        <button
                            className={`btn  p-0 w-100 rounded`}
                            onClick={addToCartAll}
                            style={{
                                cursor: `${allChoose?.current?.checked ? '' : 'not-allowed'}`,
                                backgroundColor: 'lightgray',
                                fontSize: '15px',
                            }}
                        >
                            <i
                                className="bi bi-cart4"
                            ></i>
                            放入購物車
                        </button>
                    </span>
                    <span
                        style={{
                            cursor: `${disabled ? 'pointer' : 'not-allowed'}`,
                            display: 'inline-block',
                            width: '80px',
                        }}
                    >
                        <button
                            className={`btn   p-0 w-100 rounded ${allChoose?.current?.checked ? '' : 'disabled'} `}
                            onClick={deleteFavoriteAll}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: 'lightgray',
                                fontSize: '15px',
                                padding: '5px'
                            }}
                        >
                            <i
                                className="bi bi-trash"
                            ></i>
                            刪除商品
                        </button>
                    </span>
                    <button className="btn btn-secondary float-end "
                        onClick={openFilterModal}

                    >
                        篩選
                    </button>
                    <select className="form-select  me-7 float-end" aria-label="Default select example"
                        onChange={(e) => handleSort(e)}
                        style={{
                            width: '200px'
                        }}
                    >
                        <option defaultValue disabled>
                            加入時間（先⭢後）
                        </option>
                        <option value="1"
                            className="dropdown-item"
                        >
                            加入時間（先⭢後）
                        </option>
                        <option value="2"
                            className="dropdown-item"
                        >
                            加入時間（後⭢先）
                        </option>
                        <option value="3"
                            className="dropdown-item"
                        >
                            價格（低⭢高）
                        </option>
                        <option value="4"
                            className="dropdown-item"
                        >
                            價格（高⭢低）
                        </option>
                    </select>

                </div>
                {
                    localStorage.getItem('favorites') == null
                        ?
                        '沒東西'
                        :
                        <table className="table ">
                            <thead >

                                <tr className="table-secondary ">
                                    <th className="col"></th>
                                    <th className="col"></th>
                                    <th className="col text-center">商品明細</th>
                                    <th className="col"></th>
                                    <th className="col text-center">變更</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myFavorites?.map((myFavorite, i) => {
                                    return (
                                        <tr key={myFavorite.id}>
                                            <th scope="row">
                                                <input type="checkbox"
                                                    ref={(e) => checked.current[i] = e}
                                                />
                                            </th>
                                            <td >
                                                <img src={myFavorite.imageUrl}
                                                    alt=""
                                                    style={{
                                                        height: '100px',
                                                        width: '100px'
                                                    }}
                                                    className="object-cover"
                                                />
                                            </td>
                                            <td>
                                                <div>
                                                    <h4>
                                                        {myFavorite.title}
                                                    </h4>
                                                </div>
                                                <div>
                                                    <small>
                                                        {myFavorite.description}
                                                    </small>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{
                                                    width: '100px'
                                                }}>
                                                    NT$ {myFavorite.price}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}>

                                                    <button
                                                        type="button"
                                                        href="./checkout.html" className="btn btn-dark  rounded py-3"
                                                        onClick={() => addToCart(myFavorite)}
                                                        disabled={isLoadingCart}
                                                    >
                                                        加入購物車
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary ms-1 rounded"
                                                        onClick={() => deleteFavorite(myFavorite.id)}
                                                    >
                                                        刪除商品
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                }
            </div>


        </div>
    )
}

export default NextTime