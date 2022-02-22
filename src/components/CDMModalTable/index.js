/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import { Search } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import escrowABI from '../../constants/escrowABI.json';
import './style.scss';
import NotificationConfig from '../../constants/NotificationConfig';

// eslint-disable-next-line object-curly-newline
const CDMModalTable = ({
    columns,
    agents,
    setIsLoading,
    setModalClose,
    disputeData,
}) => {
    console.log(disputeData);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [keyword, setKeyword] = useState('');
    const [rows, setRows] = useState([]);
    const [escrowContract, setEscrowContract] = useState(null);

    const { web3, account, connected } = useSelector((state) => state.web3);
    const { enqueueSnackbar } = useSnackbar();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (escrowContract) return;
        if (!connected) return;

        const EscrowContract = new web3.eth.Contract(
            escrowABI,
            process.env.REACT_APP_ESCROW_CONTRACT_ADDRESS
        );

        setEscrowContract(EscrowContract);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [web3]);

    useEffect(() => {
        setRows(agents);
        setPage(0);
    }, [agents, keyword]);

    const showNotification = (msg) => {
        enqueueSnackbar(msg, {
            ...NotificationConfig,
            variant: 'error',
        });
    };

    const onAssignClick = async (agentAddress) => {
        console.log('agenAddress', agentAddress);
        try {
            if (!connected) {
                showNotification('Please connect wallet to proceed.');
                return;
            }
            setIsLoading(true);
            await escrowContract.methods
                .assignAgent(disputeData.id, agentAddress)
                .send({ from: account });
            // updateAgentStatus(agentAddress);
            setIsLoading(false);
            setModalClose(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setModalClose(false);
        }
    };

    const renderActionOrValue = (key, value, agentAssingItem) => {
        if (key === 'action') {
            return (
                <div
                    className="btn-assgin"
                    onClick={() => onAssignClick(agentAssingItem.walletAddress)}
                >
                    Assign
                </div>
            );
        }
        return <span>{value}</span>;
    };

    return (
        <Paper className="modal-table-root">
            <div className="table-header">
                <div className="search-input">
                    <Search />
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search..."
                    />
                </div>

                <p className="total-cnt">
                    Avaliable Agents: <strong>{agents.length}</strong>
                </p>
            </div>

            <TableContainer className="table-container">
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell className="table-cell" key={index}>
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
                            .map((agentAssingItem) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={agentAssingItem.id}
                                >
                                    {columns.map((column, index) => {
                                        const value = agentAssingItem[column.key];
                                        return (
                                            <TableCell
                                                className="table-cell"
                                                key={index}
                                            >
                                                {renderActionOrValue(
                                                    column.key,
                                                    value,
                                                    agentAssingItem
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
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

CDMModalTable.propTypes = {
    agents: PropTypes.array,
    columns: PropTypes.array,
    setModalClose: PropTypes.func.isRequired,
    disputeData: PropTypes.any,
    setIsLoading: PropTypes.any,
};

CDMModalTable.defaultProps = {
    agents: [],
    columns: [],
    disputeData: {},
    setIsLoading: false,
};

export default CDMModalTable;
