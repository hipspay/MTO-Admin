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
import { Search } from '@material-ui/icons';

// import { disputeStatus } from '../../constants';

const DisputesTable = ({ disputes, columns, onRowClick }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [keyword, setKeyword] = useState('');
    const [rows, setRows] = useState(disputes);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        setRows(disputes);
        setPage(0);
    }, [disputes, keyword]);

    return (
        <Paper>
            <TableContainer className="disputes-table">
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
                        Total My disputes:
                        <strong>{disputes.length}</strong>
                    </p>
                </div>
                <Table>
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
                            .map((dispute) => (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={dispute.id}
                                    onClick={() => onRowClick(dispute.id)}
                                >
                                    {columns.map((column, index) => {
                                        const getValue = (dispute, key) => {
                                            const keyArray = key.split('.');
                                            let value = { ...dispute };
                                            keyArray.forEach((item) => {
                                                value = value[item];
                                            });
                                            return value;
                                        };
                                        const value = getValue(
                                            dispute,
                                            column.key
                                        );
                                        return (
                                            <TableCell
                                                className="table-cell"
                                                key={index}
                                            >
                                                {column.key
                                                === 'order.product.image' ? (
                                                    <img src={value} alt="" />
                                                ) : (
                                                    <>
                                                        {column.key
                                                        === 'status' ? (
                                                            <span
                                                                className={value.toLowerCase()}
                                                            >
                                                                {value}
                                                            </span>
                                                        ) : (
                                                            <span>{value}</span>
                                                        )}
                                                    </>
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
        </Paper>
    );
};

DisputesTable.propTypes = {
    disputes: PropTypes.array,
    columns: PropTypes.array,
    onRowClick: PropTypes.func,
};

DisputesTable.defaultProps = {
    disputes: [],
    columns: [],
    onRowClick: () => {},
};

export default DisputesTable;
