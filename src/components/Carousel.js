import { Link } from "react-router-dom"

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
                    <div className="row g-0">
                        <div className="col-8">
                            <Link to={`./product/${products[0]?.id}`}>
                                <img src={products[0]?.imageUrl} className="object-cover d-block w-100" alt="..." />
                            </Link>
                        </div>
                        <div className="col-4  bg-primary " >
                            <div className="m-3">
                                <Link
                                    // className="m-3"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black',
                                        fontSize: '40px'
                                    }}
                                    to={`./product/${products[0]?.id}`}
                                >
                                    {products[0]?.title}
                                </Link>
                            </div>
                            <div className="row m-1" >
                                {products[0]?.imagesUrl?.slice(0, 4).map((img, i) => {
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
                            <div className="mt-7  w-25 "
                                style={{ textAlign: 'center' }}  >
                                NT$ {products[0]?.price}
                            </div>
                        </div>
                    </div>
                </div>

                {products?.slice(1, products.length).map((product, i) => {
                    return (
                        <div className="carousel-item " key={product?.id} >
                            <div className="row g-0">
                                <div className="col-8">
                                    <Link to={`./product/${product?.id}`}>
                                        <img src={product.imageUrl} className="object-cover d-block w-100" alt="..." />
                                    </Link>
                                </div>
                                <div className="col-4" style={{ backgroundColor: 'orange' }}>
                                    <div className="m-3">
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black',
                                                fontSize: '40px'
                                            }}
                                            className="m-5"
                                            to={`./product/${product?.id}`} >
                                            {product.title}
                                        </Link>
                                    </div>

                                    <div className="row m-1">
                                        {product?.imagesUrl?.slice(0, 4).map((img, i) => {
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
                                    <div className="mt-7 ">
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