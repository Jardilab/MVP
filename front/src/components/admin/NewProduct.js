import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearErrors } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import { useNavigate } from 'react-router-dom'

const NewProduct = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [imagen, setImagen] = useState([]);
    const [imagenPreview, setImagenPreview] = useState([])

    const categories = [
        "Kitchen",
        "Bathtub",
        "Art"
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newProduct);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/dashboard');
            alert.success('Product created successfully');
            dispatch({ type: NEW_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);

        imagen.forEach(img => {
            formData.append('imagen', img)
        })

        dispatch(newProduct(formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagenPreview([]);
        setImagen([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagenPreview(oldArray => [...oldArray, reader.result])
                    setImagen(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    return (
        <Fragment>
            <MetaData title={'New Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Product</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control"
                                        id="description_field"
                                        rows="8"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control"
                                        id="category_field"
                                        value={categories} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Images</label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Select images
                                        </label>
                                    </div>
                                    {imagenPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                </div>
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProduct




// import React, { Fragment } from 'react'
// import MetaData from '../layout/MetaData'
// import Sidebar from './Sidebar'

// const NewProduct = () => {
//     return (
//         <Fragment>
//             <MetaData title={'New Product'} />
//             <div className="row">
//                 <div className="col-12 col-md-2">
//                     <Sidebar />
//                 </div>
//                 <div className="col-12 col-md-10">
//                     <Fragment>
//                         <div className="wrapper my-5">
//                             <form className="shadow-lg"  encType='multipart/form-data'>
//                                 <h1 className="mb-4">New Product</h1>
//                                 <div className="form-group">
//                                     <label htmlFor="name_field">Name</label>
//                                     <input
//                                         type="text"
//                                         id="name_field"
//                                         className="form-control"                                
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="price_field">Price</label>
//                                     <input
//                                         type="text"
//                                         id="price_field"
//                                         className="form-control"                                        
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="description_field">Description</label>
//                                     <textarea className="form-control" id="description_field" rows="8"></textarea>
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="category_field">Category</label>
//                                     <select className="form-control" id="category_field">
//                                     </select>
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="stock_field">Stock</label>
//                                     <input
//                                         type="number"
//                                         id="stock_field"
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className='form-group'>
//                                     <label>Images</label>
//                                     <div className='custom-file'>
//                                         <input
//                                             type='file'
//                                             name='product_images'
//                                             className='custom-file-input'
//                                             id='customFile'
//                                             multiple
//                                         />
//                                         <label className='custom-file-label' htmlFor='customFile'>
//                                             Select Image
//                                      </label>
//                                     </div>
//                                 </div>
//                                 <button
//                                     id="login_button"
//                                     type="submit"
//                                     className="btn btn-block py-3"
//                                 >
//                                     POST
//                                 </button>
//                             </form>
//                         </div>
//                     </Fragment>
//                 </div>
//             </div>
//         </Fragment>
//     )
// }

// export default NewProduct