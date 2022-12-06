import React from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Layout from '../../components/Layout';
import MerchantTable from '../../components/MerchantTable';
// import { getMerchants } from '../../apis/merchants.api';
import Spinner from '../../components/Common/Spinner';

import './style.scss';

const userTableColumns = [
    {
        title: 'ID',
        key: 'id',
    },
    {
        title: 'Name',
        key: 'name',
    },
    {
        title: 'Wallet Address',
        key: 'walletAddress',
    },
    {
        title: 'Shipping Address',
        key: 'shippingAddress',
    },
    {
        title: 'External Link',
        key: 'externalLink',
    },
];

function Merchant() {
    const history = useHistory();
    const [isLoading, setIsLoading] = React.useState(false);
    const [merchants, setMerchants] = React.useState([]);
    const bkdDriver = useSelector((state) => state.driverObject.bkdDriver);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (!bkdDriver || !bkdDriver.headers) {
                    return;
                }

                setIsLoading(true);
                const data = await bkdDriver.merchants();
                setMerchants(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [bkdDriver]);

    const showDetail = (id) => {
        history.push(`/merchants/${id}`);
    };

    return (
        <Layout title="Merchant">
            <div className="Merchant-page">
                <MerchantTable
                    columns={userTableColumns}
                    merchants={merchants}
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

Merchant.propTypes = {};

Merchant.defaultProps = {};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Merchant);
