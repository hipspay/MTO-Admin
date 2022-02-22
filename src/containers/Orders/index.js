import React from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import OrdersTable from '../../components/OrdersTable';
import { getOrders } from '../../apis/orders.api';

import './style.scss';
import Spinner from '../../components/Common/Spinner';

const OrdersColumns = [
    {
        title: 'Image',
        key: 'product.image',
    },
    {
        title: 'Product Name',
        key: 'product.name',
    },
    {
        title: 'Price',
        key: 'product.price',
    },
    {
        title: 'Created At',
        key: 'createdAt',
    },
    {
        title: 'Status',
        key: 'status',
    },
];

function OrdersPage() {
    const history = useHistory();
    const [isLoading, setIsLoading] = React.useState(false);
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { data } = await getOrders();
                setOrders(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const showDetail = (id) => {
        history.push(`/orders/${id}`);
    };

    return (
        <Layout title="My Orders">
            <div className="orders-page">
                <OrdersTable
                    columns={OrdersColumns}
                    orders={orders}
                    onRowClick={showDetail}
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

OrdersPage.propTypes = {};

OrdersPage.defaultProps = {};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(OrdersPage);
