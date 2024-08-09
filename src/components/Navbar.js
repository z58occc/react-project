import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


function Navbar({ cartData }) {
    
    const [token,setToken]=useState(document.cookie);
    
    const logout = () => {
        document.cookie = 'hextoken=';
        setToken(document.cookie);
    }

   


    return (

        <div className="bg-white sticky-top">
            <div className="container">
                <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
                    <NavLink
                        className="navbar-brand position-absolute" to='/'
                        style={{ left: "50%", transform: 'translate(-50%, -50%)', top: '50%', }}
                    >
                        卡斯柏的日式餐點
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <NavLink className="nav-link ps-0" to="/products">
                                    產品列表
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                    <div className="d-flex">
                        <NavLink to="/cart" className='nav-link position-relative m-5'>
                            <i className="bi bi-cart-x-fill"></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartData?.carts?.length}
                            </span>
                        </NavLink>
                    </div>
                    <div className="d-flex">
                        {token !=='hextoken='?
                            (
                                <NavLink to="/" className='nav-link position-relative'>
                                    <button onClick={logout} className="btn btn-primary">登出</button>
                                </NavLink>
                            )
                            : (
                                <NavLink to="/login" className='nav-link position-relative'>
                                    <button className="btn btn-danger">登入</button>
                                </NavLink>
                            )
                        }

                    </div>
                </nav>
            </div>
        </div>
    )
}
export default Navbar;