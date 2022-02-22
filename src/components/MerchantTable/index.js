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

import './style.scss';

const MerchantTable = ({ merchants, columns, onRowClick }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [keyword, setKeyword] = useState('');
    const [rows, setRows] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        setRows(merchants);
        setPage(0);
    }, [merchants, keyword]);

    return (
        <Paper className="table-root">
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
                    Total Merchants:
                    {' '}
                    <strong>{merchants.length}</strong>
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
                            .map((merchant) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={merchant.id}
                                    onClick={() => onRowClick(merchant.id)}
                                >
                                    {columns.map((column, index) => {
                                        const value = merchant[column.key];
                                        return (
                                            <TableCell
                                                className="table-cell"
                                                key={index}
                                            >
                                                {column.key === 'image' ? (
                                                    <img
                                                        src={`images/products/${value}`}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <span>
                                                        {column.key
                                                        === 'products'
                                                            ? value.length
                                                            : value}
                                                    </span>
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

MerchantTable.propTypes = {
    merchants: PropTypes.array,
    columns: PropTypes.array,
    onRowClick: PropTypes.func,
};

MerchantTable.defaultProps = {
    merchants: [],
    columns: [],
    onRowClick: () => {},
};

export default MerchantTable;
