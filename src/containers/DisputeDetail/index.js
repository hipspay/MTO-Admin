import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Person, Close } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { getAgentByStatus } from 'apis/agents.api';
import { useSelector } from 'react-redux';
import utils from '../../utils';
import Layout from '../../components/Layout';

import { getDispute } from '../../apis/disputes.api';
import CDMModalTable from '../../components/CDMModalTable';

import Spinner from '../../components/Common/Spinner';
import './style.scss';
import escrowABI from '../../constants/escrowABI.json';
import AdmDialog from '../../components/AdmDialog';

const DisputeDetailPage = () => {
    const AgentTableColumns = [
        {
            title: 'ID',
            key: 'id',
        },
        {
            title: 'ETH Address',
            key: 'walletAddress',
        },
        {
            title: 'Score',
            key: 'score',
        },
        {
            title: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
        },
    ];
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState();
    const history = useHistory();
    const [agents, setAgents] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [escrowContract, setEscrowContract] = useState(null);
    const [reputation, setReputation] = useState(0);
    const { web3, account, connected } = useSelector((state) => state.web3);
    const [disputeId, setDisputeId] = useState(0);
    function toggleModal() {
        setIsOpen(!isOpen);
    }
    const [isOpenADMDIalog, setOpenADMDIalog] = useState(false);

    const handleSubmit = async () => {
        setOpenADMDIalog(false);
        setIsLoading(true);
        const baseValue = Number(
            process.env.REACT_APP_MERCHANT_REPUTATION_VALUE
        );
        const decision = reputation < baseValue
            ? process.env.REACT_APP_DECISION_APPROVED
            : process.env.REACT_APP_DECISION_DISAPPROVED;
        try {
            await escrowContract.methods
                .applyADM(data.id, decision)
                .send({ from: account });
            setIsLoading(false);
        } catch (error) {
            console.log(error, 'error');

            setIsLoading(false);
        } finally {
            const { data } = await getDispute(disputeId);
            setData(data);
        }
    };

    const getReputation = async () => {
        if (escrowContract) {
            const reputationPick = await escrowContract.methods
                .getMerchantReputation(
                    data.order.product.merchant.walletAddress
                )
                .call();
            setReputation(Number(reputationPick));
        }
    };
    const onADMClick = async () => {
        setOpenADMDIalog(true);
    };
    const onCDMClick = () => {
        toggleModal();
    };

    useEffect(() => {
        if (!history.location.pathname.split('/disputes/')[1]) return;

        if (!escrowContract && connected) {
            const EscrowContract = new web3.eth.Contract(
                escrowABI,
                process.env.REACT_APP_ESCROW_CONTRACT_ADDRESS
            );
            setEscrowContract(EscrowContract);
        }

        const fetchData = async () => {
            const disputeId = history.location.pathname.split('/disputes/')[1];
            setDisputeId(disputeId);
            const { data } = await getDispute(disputeId);

            const { days, hours } = utils.getWaitingTime(data.createdAt);
            data.waitingFor = `${days} days ${hours} hours`;
            setData(data);
            const agentData = await getAgentByStatus('waiting');
            setAgents(agentData.data);
        };
        fetchData();
    }, [web3, connected, escrowContract, history]);

    getReputation();

    const showDetail = (id) => {
        history.push(`/merchants/${id}`);
    };

    return (
        <Layout title="Dispute">
            {data && (
                <div className="dispute-detail-page">
                    <div className="status">
                        <div
                            className={`status-btn ${data.status.toLowerCase()}`}
                        >
                            {data.status}
                        </div>
                    </div>

                    <div className="main-info">
                        <div className="product-image">
                            <img src={data.order.product.image} alt="" />
                        </div>

                        <div className="product-name">
                            <p>{data.order.product.name}</p>
                            <p>
                                <strong>Price: </strong>
                                {data.order.product.price}
                                MTO
                            </p>
                        </div>

                        <div className="info">
                            <p className="label">Dispute Created At:</p>
                            <p>{data.createdAt}</p>
                        </div>

                        {data.status !== 'win' && (
                            <div className="info">
                                <p className="label">Dispute Waiting For:</p>
                                <p>{data.waitingFor}</p>
                            </div>
                        )}

                        <div className="info">
                            <p className="label">Purchased At</p>
                            <p>{data.order.createdAt}</p>
                        </div>
                    </div>

                    <div className="info">
                        <p className="label">Dispute Description</p>
                        <p>{data.description}</p>
                    </div>

                    <div className="info align-items-start">
                        <div className="info-block">
                            <div className="info">
                                <p className="label">Merchant Info:</p>
                                <div className="merchant-info">
                                    <Person />
                                    <a
                                        className="merchant-name"
                                        onClick={
                                            () =>
                                                // eslint-disable-next-line implicit-arrow-linebreak
                                                showDetail(
                                                    data.order.product.merchant
                                                        .id
                                                )
                                            // eslint-disable-next-line react/jsx-curly-newline
                                        }
                                    >
                                        {data.order.product.merchant.name}
                                    </a>
                                </div>
                            </div>

                            <div className="info">
                                <p className="label">Merchant Reputation:</p>
                                <p className="reputation">{reputation}</p>
                            </div>

                            <div className="info-item">
                                <span>Delivery period (days):</span>
                                <span>{data.order.deliveryTime}</span>
                            </div>

                            <div className="info-item">
                                <span>Escrow period (days):</span>
                                <span>{data.order.escrowTime}</span>
                            </div>
                        </div>

                        <div className="info-block">
                            <div className="info-item">
                                <span>Agents in Review:</span>
                                <span>{data.reviewCount}</span>
                            </div>

                            <div className="info-item">
                                <span>Agents in Approved:</span>
                                <span>{data.approvedCount}</span>
                            </div>

                            <div className="info-item">
                                <span>Agents in Review:</span>
                                <span>{data.disapprovedCount}</span>
                            </div>
                        </div>

                        {data.status.toLowerCase() === 'init' && (
                            <>
                                <button
                                    className="btn-adm"
                                    onClick={onADMClick}
                                >
                                    Go For ADM
                                </button>

                                <button
                                    className="btn-cdm"
                                    onClick={onCDMClick}
                                >
                                    Go For CDM
                                </button>
                            </>
                        )}
                    </div>

                    <Modal
                        isOpen={isOpen}
                        onRequestClose={toggleModal}
                        contentLabel="My dialog"
                    >
                        <Close onClick={toggleModal} className="btn-clsoe" />
                        <CDMModalTable
                            columns={AgentTableColumns}
                            agents={agents}
                            setIsLoading={setIsLoading}
                            setModalClose={setIsOpen}
                            disputeData={data}
                        />
                    </Modal>

                    <AdmDialog
                        open={isOpenADMDIalog}
                        onClose={() => setOpenADMDIalog(false)}
                        handleSubmit={handleSubmit}
                        reputation={reputation}
                    />

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

export default DisputeDetailPage;
