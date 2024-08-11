

function Carousel({ products }) {
    return (


        <div id="carouselExampleIndicators" className="carousel slide"
            style={{
                width: "1200px",

            }}>

            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>

                {products?.slice(1, products.length).map((_, i) => {
                    return (
                        <button key={i + 1} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i + 1} aria-label={`Slide ${i + 1}`} ></button>
                    )
                })}

            </div>

            <div className="carousel-inner" >
                <div className="carousel-item active">
                    <div className="row">
                        <div className="col">
                            <img src={products[0]?.imageUrl} className="object-cover d-block w-100" alt="..." />
                        </div>
                        <div className="col" style={{ backgroundColor: 'orange' }}>
                            {products[0]?.title}
                            <div className="row m-1" >
                                {products[0]?.imagesUrl?.slice(0, 4).map((img,i) => {
                                    return (
                                        <div className="col-6 g-3  " key={i}>
                                            <img src={img} alt=""
                                                style={{
                                                    height: "100px",
                                                    width: "100%"
                                                }}
                                                className="object-cover" />
                                        </div>

                                    )
                                })}
                            </div>
                            NT${products[0]?.price}
                        </div>
                    </div>
                </div>

                {products?.slice(1, products.length).map((product, i) => {
                    return (
                        <div className="carousel-item " key={product?.id} >
                            <div className="row g-0">
                                <div className="col-6">
                                    <img src={product.imageUrl} className="object-cover d-block w-100" alt="..." />
                                </div>
                                <div className="col-6" style={{ backgroundColor: 'orange' }}>
                                    <div>
                                        {product.title}
                                    </div>
                                    <div className="row m-1">
                                        {product?.imagesUrl?.slice(0, 4).map((img,i) => {
                                            return (
                                                <div className="col-6 g-3    " key={i}>
                                                    <img src={img} alt=""
                                                        style={{
                                                            height: "100px",
                                                            width: "100%"
                                                        }}
                                                        className="object-cover " />
                                                </div>

                                            )
                                        })}
                                    </div>
                                    <div>
                                        NT$ {product.price}
                                    </div>

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

        </div>
    )
}

export default Carousel