import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import utils from '../../utils';
import Layout from '../../components/Layout';
import DisputesTable from '../../components/DisputesTable';
// import { getDisputes } from '../../apis/disputes.api';
import './style.scss';

const DisputesColumns = [
    {
        title: 'ID',
        key: 'disputeId',
    },
    {
        title: 'Image',
        key: 'order.product.image',
    },
    {
        title: 'Product Name',
        key: 'order.product.name',
    },
    {
        title: 'Price',
        key: 'order.product.price',
    },
    {
        title: 'Approved Count',
        key: 'approvedCount',
    },
    {
        title: 'Disapproved Count',
        key: 'disapprovedCount',
    },
    {
        title: 'Review Count',
        key: 'reviewCount',
    },
    {
        title: 'Description',
        key: 'description',
    },
    {
        title: 'Created At',
        key: 'createdAt',
    },
    {
        title: 'Waiting for',
        key: 'waitingFor',
    },
    {
        title: 'Status',
        key: 'status',
    },
];

const DisputesPage = () => {
    const history = useHistory();
    const [disputes, setDisputes] = React.useState([]);
    const bkdDriver = useSelector((state) => state.driverObject.bkdDriver);
    const showDetail = (id) => {
        history.push(`/disputes/${id}`);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            if (!bkdDriver || !bkdDriver.headers) {
                return;
            }

            const data = await bkdDriver.getDisputes();
            // const { data } = await getDisputes();
            data.forEach((dispute) => {
                const { days, hours } = utils.getWaitingTime(dispute.createdAt);
                dispute.waitingFor = `${days} days ${hours} hours`;
            });

            setDisputes(data);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Layout title="Dispute">
            <div className="disputes-page">
                <DisputesTable
                    columns={DisputesColumns}
                    disputes={disputes}
                    onRowClick={showDetail}
                />
            </div>
        </Layout>
    );
};

export default DisputesPage;
