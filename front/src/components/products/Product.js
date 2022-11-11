// import React from 'react'
// import { Link } from 'react-router-dom'
// export const Product = ({products}) => {
//     return (
//         <div className="row">
//             {products &&
//                 products.map((products) => (
//                     <div                        
//                         className="col-sm-12 col-md-6 col-lg-3 my-3"
//                     >
//                         <div className="card p-3 rounded">
//                             <img
//                                 className="card-img-top mx-auto"
//                                 src={products.imagen[0].url}
//                                 alt={products.imagen[0].public_id}
//                             ></img>
//                             <div className="card-body d-flex flex-column text-center">
//                                 <h5 id="title_product">
//                                     <Link to={`/product/${products._id}`}>
//                                         {products.name}
//                                     </Link>
//                                 </h5>
//                                 <div className="rating mt-auto">
//                                     <div className="rating-outer">
//                                         <div
//                                             className="rating-inner"
//                                             style={{
//                                                 width: `${(products.rating / 5) * 100}%`,
//                                             }}
//                                         ></div>
//                                     </div>
//                                     <span id="comments">
//                                         {" "}
//                                         {products.scoreProduct} Reviews
//                                     </span>
//                                 </div>
//                                 <p className="card-text">${products.price}</p>
//                                 <Link
//                                     to={`/product/${products._id}`}
//                                     id="view_btn"
//                                     className="btn btn-block"
//                                 >
//                                     View datails
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//         </div>
//     )
// }
