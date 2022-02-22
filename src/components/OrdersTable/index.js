import React, { useEffect, useState } from 'react';
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

const OrdersTable = ({ orders, columns, onRowClick }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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
        setRows(orders);
        setPage(0);
    }, [orders, keyword]);
    const getClass = (status) => {
        if (status === 'in_delivery') {
            return 'bg-blue';
        }
        if (status === 'over delivery') {
            return 'bg-pink';
        }
        if (status === 'in_dispute') {
            return 'bg-red';
        }
        return 'bg-green';
    };
    return (
        <Paper>
            <TableContainer className="orders-table">
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
                            .map((order) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={order.id}
                                    onClick={() => onRowClick(order.id)}
                                >
                                    {columns.map((column, index) => {
                                        let value = null;

                                        if (column.key.includes('product')) {
                                            value = order.product[
                                                column.key.split('.')[1]
                                            ];
                                        } else {
                                            value = order[column.key];
                                        }
                                        return (
                                            <TableCell
                                                className="table-cell"
                                                key={index}
                                            >
                                                {column.key
                                                === 'product.image' ? (
                                                    // eslint-disable-next-line indent
                                                    <img src={value} alt="" />
                                                    ) : column.key === 'status' ? (
                                                        <span
                                                            className={getClass(
                                                                value
                                                            )}
                                                        >
                                                            {value}
                                                        </span>
                                                    ) : (
                                                        <span>{value}</span>
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

OrdersTable.propTypes = {
    orders: PropTypes.array,
    columns: PropTypes.array,
    onRowClick: PropTypes.func.isRequired,
};

OrdersTable.defaultProps = {
    orders: [],
    columns: [],
};

export default OrdersTable;
