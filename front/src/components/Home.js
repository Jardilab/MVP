import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useParams, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Pagination from 'react-js-pagination'
// import Slider from "rc-slider"
// import 'rc-slider/assets/index.css'

export const Home = () => {
  const params = useParams();
  const keyword = params.keyword;
  const [price, ] = useState([100, 1000000])
  // setPrice
  const [currentPage, setCurrentPage] = useState(1)
  const { loading, products, error, resPerPage, productsCount } = useSelector(state => state.products);
  const alert = useAlert();

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(currentPage, keyword, price));
    // alert.success("OK");
  }, [dispatch, alert, error, currentPage, keyword, price]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
  }

  return (
    <Fragment>
      {loading ? (
        <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i>
      ) : (
        <Fragment>
          <Fragment>
            <MetaData title="Catch Me If You Can"></MetaData>
            <h5 id="header_products">Latest products </h5>

            <section id="products" className="container mt-5">
              <div className="row">
                {/* <Slider
                  range
                  className='t-slider'
                  marks={{
                    100: `$100`,
                    1000000: `$1000000`
                  }}
                  min={100}
                  max={1000000}
                  defaultValue={[100, 1000000]}
                  tipFormatter={value => `$${value}`}
                  tipProps={{
                    placement: 'top',
                    prefixCls: 'rc-slider-tooltip',
                    visible: true
                  }}
                  value={price}
                  onChange={price => setPrice(price)}
                ></Slider> */}
                {products &&
                  products.map((products) => (
                    <div
                      key={products._id}
                      className="col-sm-12 col-md-6 col-lg-3 my-3"
                    >
                      <div className="card p-3 rounded">
                        <img
                          className="card-img-top mx-auto"
                          src={products.imagen[0].url}
                          alt={products.imagen[0].public_id}
                        ></img>
                        <div className="card-body d-flex flex-column text-center">
                          <h5 id="title_product">
                            <Link to={`/product/${products._id}`}>
                              {products.name}
                            </Link>
                          </h5>
                          <div className="rating mt-auto">
                            <div className="rating-outer">
                              <div
                                className="rating-inner"
                                style={{
                                  width: `${(products.rating / 5) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span id="comments">
                              {" "}
                              {products.scoreProduct} Reviews
                            </span>
                          </div>
                          <p className="card-text">${products.price}</p>
                          <Link
                            to={`/product/${products._id}`}
                            id="view_btn"
                            className="btn btn-block"
                          >
                            View datails
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
            <div className='d-flex justify-content-center mt-5'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next >"}
                prevPageText={"< Previous"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;