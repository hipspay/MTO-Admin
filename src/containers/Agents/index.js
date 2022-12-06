import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';

// import { getAgents } from 'apis/agents.api';
import Layout from '../../components/Layout';
import AgentsTable from '../../components/AgentsTable';
import Spinner from '../../components/Common/Spinner';
import './style.scss';

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

function AgentsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [agents, setAgents] = useState([]);
    const bkdDriver = useSelector((state) => state.driverObject.bkdDriver);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (!bkdDriver || !bkdDriver.headers) {
                    return;
                }

                setIsLoading(true);
                const data = await bkdDriver.agents();
                setAgents(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [bkdDriver]);

    const updateAgentStatus = (address) => {
        const tempAgents = [...agents];
        const agentIndex = tempAgents.findIndex(
            (elem) => elem.walletAddress === address
        );

        tempAgents[agentIndex].status = 'review';
        setAgents([...tempAgents]);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Layout title="Agents">
                <div className="agents-page">
                    <AgentsTable
                        columns={AgentTableColumns}
                        agents={agents}
                        setIsLoading={setIsLoading}
                        updateAgentStatus={updateAgentStatus}
                    />
                </div>
            </Layout>
            {isLoading && (
                <div className="overlay">
                    <Spinner />
                </div>
            )}
        </div>
    );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(AgentsPage);
