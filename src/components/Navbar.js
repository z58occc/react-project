import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";


function Navbar({ cartData }) {
    const [searchWord, setSearchWord] = useState('');
    const mySearch = useRef();

    const [token, setToken] = useState(document.cookie);

    const logout = () => {
        document.cookie = 'hextoken=';
        setToken(document.cookie);
    }
    const search = (e) => {
        setSearchWord(e.target.value);
    }
    const clearSearch = () => {
        mySearch.current.value = '';
    }




    return (

        <div className="bg-white sticky-top">

            <div className="collapse" id="navbarToggleExternalContent">
                <div className="bg-dark p-4">
                    <h5 className="text-white h4">Collapsed content</h5>
                    <span className="text-muted">Toggleable via the navbar brand.</span>
                </div>
            </div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
            <div className="container">
                <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white ">
                    <NavLink
                        className="navbar-brand " to='/'
                    >
                        Home
                    </NavLink>
                    <div className="collapse navbar-collapse bg-white custom-header-md-open ms-5" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <NavLink className="nav-link ps-0" to="/products">
                                    產品列表
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex">
                        <form className="d-flex ms-5" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                onChange={search}
                                ref={mySearch}
                            />
                            <Link to={`/products/${searchWord}`} className="btn btn-outline-primary" type="submit"
                                onClick={clearSearch}
                            >Search</Link>
                        </form>
                    </div>
                    <div className="d-flex">
                        <NavLink to="/cart" className='nav-link position-relative m-5'>
                            <i className="bi bi-cart-x-fill"></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartData?.carts?.length}
                            </span>
                        </NavLink>
                    </div>


                    <div class="btn-group me-5">
                        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton1" 
                        style={{
                            color:'orange'
                        }}
                         >
                            <li>
                                <div className="d-flex  ">
                                    <NavLink to="/admin/products"
                                        className='nav-link  w-100 dropdown-item'
                                        style={{
                                            // color: 'black',
                                            // textDecoration: "none"
                                        }}
                                    >
                                        去後台
                                    </NavLink>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex">
                                    {token !== 'hextoken=' ?
                                        (
                                            <button
                                                onClick={logout}
                                                className='nav-link   w-100 dropdown-item'>
                                                登出
                                            </button>
                                        )
                                        : (
                                            <NavLink
                                                to="/login" className='nav-link position-relative  w-100
                                                dropdown-item'>
                                                登入
                                            </NavLink>
                                        )
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>






                </nav>
            </div>
        </div>
    )
}
export default Navbar;