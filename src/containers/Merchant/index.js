import React from 'react';
import { connect } from 'react-redux';

import { useHistory } from 'react-router';
import Layout from '../../components/Layout';
import MerchantTable from '../../components/MerchantTable';
import { getMerchants } from '../../apis/merchants.api';
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

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { data } = await getMerchants();
                setMerchants(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

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
