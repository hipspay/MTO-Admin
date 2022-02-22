/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Person } from '@material-ui/icons';

import { getProduct } from 'apis/products.api';
import Layout from '../../components/Layout';

import './style.scss';
import Spinner from '../../components/Common/Spinner';

const ProductDetailPage = () => {
    const history = useHistory();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!history.location.pathname.split('/products/')[1]) return;
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const productId = history.location.pathname.split('/products/')[1];
                const { data } = await getProduct(productId);
                setData(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showDetail = (id) => {
        history.push(`/merchants/${id}`);
    };

    return (
        <Layout title="Product">
            {data && (
                <div className="product-detail-page">
                    <div className="main-info">
                        <div className="product-image">
                            <img src={data.image} alt="" />
                        </div>

                        <div className="product-name">
                            <div className="d-flex">
                                <p>{data.name}</p>
                                <p style={{ marginLeft: 30 }}>
                                    {`Sold Out:   ${data.soldOutItems}`}
                                </p>
                            </div>
                            <p>
                                <strong>Price: </strong>
                                {data.price}
                                MTO
                            </p>
                        </div>
                    </div>

                    <div className="info">
                        <p className="label">Description:</p>
                        <p>{data.description}</p>
                    </div>

                    <div className="info">
                        <p className="label">Location:</p>
                        <p>{data.merchant.location}</p>
                    </div>

                    <div className="info">
                        <p className="label">Created At:</p>
                        <p>{data.createdAt}</p>
                    </div>

                    <div className="info">
                        <p className="label">Merchant Info:</p>
                        <div className="merchant-info">
                            <Person />
                            <a
                                className="merchant-name"
                                onClick={() => showDetail(data.merchant.id)}
                            >
                                {data.merchant.name || 'see details'}
                            </a>
                        </div>
                    </div>

                    {/* <div className="actions">
            <Button
              color="primary"
              variant="contained"
              onClick={purchaseProduct}
            >
              Purchase
          </Button>
          </div> */}

                    {isLoading && (
                        <div className="overlay">
                            <Spinner />
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
};

export default ProductDetailPage;
