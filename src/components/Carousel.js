

function Carousel({ products }) {
    console.log(products);
    return (


        <div  id="carouselExampleIndicators" className="carousel slide">
            
            <div className="carousel-inner" >

                {products?.map((product) => {
                    return (
                        <div className="carousel-item active" key={product?.id} >
                            <div className="row">
                                <div className="col">
                                    <img src={product.imageUrl} className="object-fit d-block w-100" alt="..." style={{ height: "300px" }} />
                                </div>
                                <div className="col">
                                    {product.title}
                                </div>
                            </div>

                        </div>
                    )
                })}


            </div>
            
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            <div className="carousel-indicators">
                {products?.map((product,i) => {
                    return (
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i} className="active " aria-current="true" aria-label="Slide 1" ></button>
                    )
                })}

            </div>
        </div>
    )
}

export default Carousel