import React from 'react';
import { useHistory } from 'react-router';
import { connect, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import ProductsTable from '../../components/ProductsTable';
// import { getProducts } from '../../apis/products.api';
import Spinner from '../../components/Common/Spinner';

import './style.scss';

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

function ProductsPage() {
    const history = useHistory();
    const [isLoading, setIsLoading] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [totalProduct, setTotalProducts] = React.useState(0);
    const bkdDriver = useSelector((state) => state.driverObject.bkdDriver);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (!bkdDriver || !bkdDriver.headers) {
                    return;
                }
                setIsLoading(true);
                const data = await bkdDriver.getProducts();
                // const {
                //     data: { totalCount, products },
                // } = await getProducts();
                setProducts(data?.products);
                setTotalProducts(data?.totalCount);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [bkdDriver]);

    const showDetail = (id) => {
        history.push(`/products/${id}`);
    };

    return (
        <Layout title="My Products">
            <div className="products-page">
                <ProductsTable
                    columns={productTableColumns}
                    products={products}
                    onRowClick={showDetail}
                    totalProduct={totalProduct}
                />
            </div>
            {isLoading && (
                <div className="overlay">
                    <Spinner />
                </div>
            )}
        </Layout>
    );
}

ProductsPage.propTypes = {};

ProductsPage.defaultProps = {};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ProductsPage);
