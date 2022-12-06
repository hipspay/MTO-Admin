/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import AgentModalTable from '../AgentModalTable';
// import { getDisputes } from '../../apis/disputes.api';
import './style.scss';

const AgentModalTableColumns = [
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
        title: 'Status',
        key: 'status',
    },
    {
        title: 'Actions',
        key: 'action',
    },
];
// eslint-disable-next-line object-curly-newline
const AgentsTable = ({ agents, columns, setIsLoading, updateAgentStatus }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [keyword, setKeyword] = useState('');
    const [rows, setRows] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [currentAgentAddress, setCurrentAgentAddress] = useState();
    const bkdDriver = useSelector((state) => state.driverObject.bkdDriver);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        setRows(agents);
        setPage(0);
    }, [agents, keyword]);

    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const onAssignClick = (id, address) => {
        console.log('setCurrentAgentAddress', address);
        setCurrentAgentAddress(address);
        toggleModal();
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (!bkdDriver || !bkdDriver.headers) {
                    return;
                }

                const data = await bkdDriver.getDisputes();
                // const { data } = await getDisputes();
                console.log('setting modal data', data);
                setModalData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [bkdDriver]);

    const getClass = (value) => {
        if (value === 'waiting') {
            return 'bg-blue';
        }

        if (value === 'earned') return 'bg-pink';
        return 'bg-green';
    };

    const renderActionOrValue = (key, value, agent) => {
        if (key === 'status') {
            return <span className={getClass(value)}>{value}</span>;
        }
        if (key === 'action') {
            if (agent.status === 'waiting' || agent.status === 'lost') {
                return (
                    <div
                        className="btn-assgin"
                        onClick={
                            () => onAssignClick(agent.id, agent.walletAddress)
                            // eslint-disable-next-line react/jsx-curly-newline
                        }
                    >
                        Assign
                    </div>
                );
            }
            return (
                <div className="btn-assgin" onClick={() => {}}>
                    Not actionable
                </div>
            );
        }
        return <span>{value}</span>;
    };

    return (
        <Paper>
            <TableContainer className="agents-table">
                <div className="table-header">
                    <div className="search-input">
                        <Search />
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="search..."
                        />
                    </div>
                    <p className="Total-cnt">
                        Total Agents:
                        <strong>{agents.length}</strong>
                    </p>
                </div>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell key={index}>
                                    {column.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((agent) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={agent.id}
                                >
                                    {columns.map((column, index) => {
                                        const value = agent[column.key];
                                        // if (column.key === 'status') {
                                        //     if (value === 'pending_01') {
                                        //         value = 'pending_approved';
                                        //     } else if (value === 'pending_01') {
                                        //         value = 'pending_disapproved';
                                        //     }
                                        // }
                                        return (
                                            <TableCell
                                                className="table-cell"
                                                key={index}
                                            >
                                                {renderActionOrValue(
                                                    column.key,
                                                    value,
                                                    agent
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
            >
                <Close onClick={toggleModal} className="btn-clsoe" />
                <AgentModalTable
                    columns={AgentModalTableColumns}
                    assigns={modalData}
                    setIsLoading={setIsLoading}
                    setModalClose={setIsOpen}
                    agentAddress={currentAgentAddress}
                    updateAgentStatus={updateAgentStatus}
                />
            </Modal>
        </Paper>
    );
};

AgentsTable.propTypes = {
    agents: PropTypes.array,
    columns: PropTypes.array,
    setIsLoading: PropTypes.func.isRequired,
};

AgentsTable.defaultProps = {
    agents: [],
    columns: [],
};

export default AgentsTable;
