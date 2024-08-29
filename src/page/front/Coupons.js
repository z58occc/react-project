import axios from "axios";
import { useEffect,useState } from "react";

function Coupons() {
    
    return (
        <div className="vh-100">
            <div className="container">
                <div className="row ">
                    <div className="col-6">
                        <div className="card text-bg-dark">
                            <img src="..." className="card-img" alt="..."
                            style={{
                                height:'300px'
                            }}
                            />
                                <div className="card-img-overlay">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small>Last updated 3 mins ago</small></p>
                                </div>
                        </div>
                    </div>
                    <div className="col-6">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Coupons