import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import Layout from '../../components/Layout';
import ProductsTable from '../../components/ProductsTable';
import { getProducts } from '../../apis/products.api';
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

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const {
                    data: { totalCount, products },
                } = await getProducts();
                setProducts(products);
                setTotalProducts(totalCount);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

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
