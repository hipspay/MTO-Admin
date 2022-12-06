import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
// import { getMerchant, getMerchantProducts } from 'apis/merchants.api';
import ProductsTable from '../../components/ProductsTable';
import Layout from '../../components/Layout';
import Spinner from '../../components/Common/Spinner';

import './style.scss';
// import Spinner from '../../components/Common/Spinner';

const productTableColumns = [
    {
        title: 'Image',
        key: 'image',
    },
    {
        title: 'Product Name',
        key: 'name',
    },
    {
        title: 'Price',
        key: 'price',
    },
    {
        title: 'Sold Out Items',
        key: 'soldOutItems',
    },
    {
        title: 'Description',
        key: 'description',
    },
    {
        title: 'Added At',
        key: 'createdAt',
    },
];

const MerchantDetail = () => {
    const history = useHistory();
    const [merchant, setMerchant] = useState(null);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const bkdDriver = useSelector((state) => state.driverObject.bkdDriver);

    useEffect(() => {
        if (!history.location.pathname.split('/merchants/')[1]) return;
        const fetchData = async () => {
            try {
                if (!bkdDriver || !bkdDriver.headers) {
                    return;
                }

                setIsLoading(true);
                const disputeId = history.location.pathname.split('/merchants/')[1];
                const data = await bkdDriver.merchant(disputeId);
                setMerchant(data);

                const tempProducts = await bkdDriver.getProductsByMerchantId(
                    data.id
                );
                setProducts(tempProducts);
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
        history.push(`/products/${id}`);
    };

    return (
        <Layout title="MechatDetail">
            {merchant && (
                <div className="merchant-detail-page">
                    <div className="main-info">
                        <div className="merchant-image">
                            <img
                                src={merchant.image}
                                alt=""
                            />
                        </div>

                        <p>{merchant.name}</p>
                        <div className="merchant-name">
                            <div className="d-flex">
                                <p>
                                    <strong>Products: </strong>
                                    {products?.length}
                                </p>
                                <div
                                    className="info"
                                    style={{ marginLeft: 50 }}
                                >
                                    <p className="label">Registered:</p>
                                    <p>{merchant.registeredAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="info">
                        <p className="label">Social Link:</p>
                        <a
                            href={merchant.socialLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {merchant.socialLink ? merchant.socialLink : 'NA'}
                        </a>
                    </div>

                    <div className="info">
                        <p className="label">Location:</p>
                        <p>{merchant.location ? merchant.location : 'NA'}</p>
                    </div>

                    <div className="products-page">
                        <ProductsTable
                            columns={productTableColumns}
                            products={products}
                            onRowClick={showDetail}
                        />
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

export default MerchantDetail;
