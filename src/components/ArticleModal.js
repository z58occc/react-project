import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MessageContext, handleSuccessMessage, handleErrorMessage } from "../store/messageStore";
import moment from "moment";


function ArticleModal({ closeArticleModal, type, tempProduct }) {






    const [tempData, setTempData] = useState({
        title: "test",
        description: "test",
        image: "test",
        tag:[''],
        create_at:moment(new Date()).unix(),
        author:"test",
        isPublic:false,
        content: "test",
    });

    const [, dispatch] = useContext(MessageContext);
    const getProducts = async (page = 1) => {
        const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/articles`);
        console.log(productRes);
    }

    useEffect(() => {
        getProducts();
        if (type === 'create') {
            setTempData({
                title: "",
                category: "",
                origin_price: 100,
                price: 300,
                unit: "",
                description: "",
                content: "",
                is_enabled: 1,
                imageUrl: '',
                imagesUrl: [
                    '',
                    '',
                    '',
                    '',
                    '',
                ],

            });
        } else if (type === 'edit') {
            setTempData(tempProduct)
        }
    }, [type, tempProduct])

    const handleChange = (e) => {
        const { value, name } = e.target
        if (['price', 'origin_price'].includes(name)) {
            setTempData({
                ...tempData,
                [name]: Number(value)
            })
        } else if (name === 'is_enabled') {
            setTempData({
                ...tempData,
                [name]: +e.target.checked,// boolean
            })
        }
        else {
            setTempData({
                ...tempData,
                [name]: value
            })
        }
    }
    const hadleChangeImages = (e) => {
        const index = parseInt(e.target.name);
        setTempData({
            ...tempData,
            imagesUrl: tempData.imagesUrl.map((item, i) => i === index ? e.target.value : item)
        })

    }

    const submit = async () => {
        console.log(tempData);
        try {
            let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article`;
            let method = 'post';
            if (type === "edit") {
                api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`;
                method = 'put';
            }
            const res = await axios[method](
                api, {
                data: tempData
            }
            );
            console.log(res);
            handleSuccessMessage(dispatch, res);
            closeArticleModal();
            getProducts();

        } catch (error) {
            console.log(error);
            handleErrorMessage(dispatch, error);
        }
    }



    return (

        <div
            className='modal fade'
            tabIndex='-1'
            id="articleModal"
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
        >
            <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='exampleModalLabel'>
                            {type === 'create' ? "建立新商品" : `編輯${tempData.title}`}
                        </h1>
                        <button
                            type='button'
                            className='btn-close'
                            aria-label='Close'
                            onClick={closeArticleModal}
                        />
                    </div>
                    <div className='modal-body'>
                        <div className='row'>

                            <div className='col-sm-8'>

                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='title'>
                                        標題
                                        <input
                                            type='text'
                                            id='title'
                                            name='title'
                                            placeholder='請輸入標題'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.title}
                                        />
                                    </label>
                                </div>
                                <div className='row'>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='category'>
                                            分類
                                            <input
                                                type='text'
                                                id='category'
                                                name='category'
                                                placeholder='請輸入分類'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.category}
                                            />
                                        </label>
                                    </div>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='unit'>
                                            單位
                                            <input
                                                type='unit'
                                                id='unit'
                                                name='unit'
                                                placeholder='請輸入單位'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.unit}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='origin_price'>
                                            原價
                                            <input
                                                type='number'
                                                id='origin_price'
                                                name='origin_price'
                                                placeholder='請輸入原價'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.origin_price}
                                            />
                                        </label>
                                    </div>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='price'>
                                            售價
                                            <input
                                                type='number'
                                                id='price'
                                                name='price'
                                                placeholder='請輸入售價'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.price}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <hr />
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='description'>
                                        產品描述
                                        <textarea
                                            type='text'
                                            id='description'
                                            name='description'
                                            placeholder='請輸入產品描述'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.description.trim()}
                                        />
                                    </label>

                                </div>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='content'>
                                        說明內容
                                        <textarea
                                            type='text'
                                            id='content'
                                            name='content'
                                            placeholder='請輸入產品說明內容'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.content}
                                            style={{ height: '300px' }}
                                        />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <div className='form-check'>
                                        <label
                                            className='w-100 form-check-label'
                                            htmlFor='is_enabled'
                                        >
                                            是否啟用
                                            <input
                                                type='checkbox'
                                                id='is_enabled'
                                                name='is_enabled'
                                                placeholder='請輸入產品說明內容'
                                                className='form-check-input'
                                                onChange={handleChange}
                                                checked={!!tempData.is_enabled}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className='modal-footer mt-5'>
                                    <button type='button' className='btn btn-secondary'
                                        onClick={closeArticleModal}>
                                        關閉
                                    </button>
                                    <button type='button' className='btn btn-primary'
                                        onClick={submit}>
                                        儲存
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ArticleModal;



