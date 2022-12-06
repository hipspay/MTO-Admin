import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Person } from '@material-ui/icons';
import Layout from '../../components/Layout';
// import { getOrder } from '../../apis/orders.api';
import './style.scss';
import Spinner from '../../components/Common/Spinner';

const OrderDetail = () => {
    const history = useHistory();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const bkdDriver = useSelector((state) => state.driverObject.bkdDriver);

    useEffect(() => {
        if (!history.location.pathname.split('/orders/')[1]) return;
        const fetchData = async () => {
            try {
                if (!bkdDriver || !bkdDriver.headers) {
                    return;
                }

                setIsLoading(true);
                const orderId = history.location.pathname.split('/orders/')[1];

                const data = await bkdDriver.getOrderById(orderId);
                setData(data);
                // const { data: tempProducts } = await getMerchantProducts(
                //     data.id
                // );
                // setProducts(tempProducts);
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

    const getClass = (status) => {
        if (status === 'in delivery') {
            return 'bg-blue';
        }
        if (status === 'over delivery') {
            return 'bg-pink';
        }
        if (status === 'in_dispute') {
            return 'bg-red';
        }
        return 'bg-green';
    };

    return (
        <Layout title="OrderDetail">
            {data && (
                <div className="order-detail-page">
                    <span className={getClass(data.status)}>{data.status}</span>
                    <div className="main-info">
                        <div className="order-image">
                            <img src={data.product.image} alt="" />
                        </div>

                        <div className="d-flex">
                            <div className="view-info">
                                <p>{data.product.name}</p>
                                <p>
                                    {data.product.price}
                                    MTO
                                </p>
                            </div>
                            <div className="view-info">
                                <p>Delilvery preriod will be ended at:</p>
                                <p>{data.deliveryTime}</p>
                            </div>
                            <div className="view-info">
                                <p>Created At:</p>
                                <p>{data.createdAt}</p>
                            </div>
                        </div>
                    </div>

                    <div className="info">
                        <p className="label">Description:</p>
                        <p>{data.product.description}</p>
                    </div>

                    <div className="d-flex align-items-center">
                        <div className="info">
                            <p>
                                <strong>From: </strong>
                                {data.product.merchant.walletAddress}
                            </p>
                        </div>
                        <svg
                            style={{ marginLeft: 20, marginRight: 20 }}
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
                        </svg>
                        <div className="info">
                            <p>
                                <strong>To: </strong>
                                {data.customer.walletAddress}
                            </p>
                        </div>
                    </div>

                    <div className="info">
                        <p className="label">Merchant Info:</p>
                        <div className="merchant-info">
                            <Person />
                            <a
                                className="merchant-name"
                                onClick={() => showDetail(data.merchant.id)}
                            >
                                {data.product.merchant.name}
                            </a>
                        </div>
                    </div>

                    <div className="info">
                        <p className="label">Delivery period (days):</p>
                        <p>13</p>
                    </div>

                    <div className="info">
                        <p className="label">Escrow period (days):</p>
                        <p>15</p>
                    </div>

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

export default OrderDetail;
