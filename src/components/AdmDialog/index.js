/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from '@material-ui/core';

import './style.scss';

const AdmDialog = ({ open, onClose, handleSubmit, reputation }) => {
    let approveText = '';
    let receiverText = '';
    if (reputation >= 50) {
        approveText = 'disapproved';
        receiverText = "merchant's";
    } else {
        approveText = 'approved';
        receiverText = "customer's";
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <div className="dialog-header">Going for ADM?</div>
                <p>
                    You are trying to submit the dispute to{' '}
                    <strong>Automatic Dispute Management System</strong>. As the
                    merchant has reputation {reputation}, dispute will
                    automatically be {approveText} and{' '}
                    <strong>
                        fund will be transferred to {receiverText}, address.
                    </strong>
                </p>
                <p>Are you sure to proceed?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AdmDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    reputation: PropTypes.any,
};

AdmDialog.defaultProps = {
    open: false,
    onClose: () => {},
    handleSubmit: () => {},
    reputation: 0,
};

export default AdmDialog;
