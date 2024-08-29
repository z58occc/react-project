import { useRef, useState, useEffect } from "react";
import ArticleModal from "../../components/ArticleModal";
import DeleteModal from "../../components/DeleteModal";
import { Modal } from "bootstrap";


function AdminArticle() {

    //type:決定 modal 展開的用途
    const [type, setType] = useState('create');//edit
    const [tempArticle, setTempArticle] = useState({});

    const articleModal = useRef(null);
    const deleteModal = useRef(null);

    const openArticleModal = (type, article) => {
        setType(type);
        setTempArticle(article);
        articleModal.current.show();
    }
    const closeArticleModal = () => {
        articleModal.current.hide();
    }

    useEffect(() => {
        articleModal.current = new Modal('#articleModal', {
            backdrop: 'static'
        });
    }, [])

    return (
        <div className="p-3">
            <ArticleModal
                closeArticleModal={closeArticleModal}
            ></ArticleModal>
            {/* <ProductModal closeProductModal={closeProductModal} getProducts={getProducts}
                tempProduct={tempProduct}
                type={type}
            ></ProductModal>
            <DeleteModal
                close={closeDeleteModal}
                text={tempProduct.title}
                handleDelete={deleteProduct}
                id={tempProduct.id}></DeleteModal> */}
            <h3>產品列表</h3>
            <hr />
            <div className="text-end">
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openArticleModal('create', {})}
                >
                    建立新文章
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">分類</th>
                        <th scope="col">名稱</th>
                        <th scope="col">售價</th>
                        <th scope="col">啟用狀態</th>
                        <th scope="col">編輯</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {products.map((product) => {
                        return (
                            <tr key={product.id}>
                                <td>{product.category}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => openProductModal('edit', product)}>
                                        編輯
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm ms-2"
                                        onClick={() => openDeleteModal(product)}
                                    >
                                        刪除
                                    </button>
                                </td>
                            </tr>
                        )
                    })} */}

                </tbody>
            </table>

            {/* <Pagination pagination={pagination}
            changePage={getProducts}></Pagination> */}
        </div>
    )
}

export default AdminArticle