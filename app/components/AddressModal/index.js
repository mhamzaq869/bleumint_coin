/**
 *
 * AddWallet
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Button, Typography } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Form from '../uiStyle/Form';
import FontAwesome from '../uiStyle/FontAwesome';
import LoadingOverlay from 'react-loading-overlay';

import messages from './messages';

import './style.scss';

// function getNewWalletAddress() {
//   console.log("here")
// }

function AddressModal({
  wallet_address,
  awAddressModalOpen,
  awModalCloseHandler,
  awChangeHandler,
  awAddressSave,
  getNewWalletAddress,
  loading
}) 
{
  
  return (
    <Dialog
      open={awAddressModalOpen}
      onClose={awModalCloseHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: 'modalPaper',
        container: 'scrollAble',
        root: 'rootDialog',
      }}
      BackdropProps={{
        className: 'backdropWrap',
      }}
    >
        <LoadingOverlay
                active={loading}
                spinner
                text='Loading...'
              >
      <Grid className="modalInner">
        <DialogTitle className="modalHeader" id="alert-dialog-title">
          Generate New Address
          <Typography onClick={awModalCloseHandler} component="span">
            <FontAwesome name="times" />
          </Typography>
        </DialogTitle>
        <DialogContent className="modalCardBody">
          <Form onSubmit={awAddressSave}>
            <label htmlFor="address">Wallet Address</label>
            <TextField
              id="address"
              fullWidth
              variant="outlined"
              className="input"
              name="wallet_address"
              value={wallet_address}
              // value="BP7pxZTzhqWv6sEaVqUVJ6kQ9csrVq4SLN"
              onChange={awChangeHandler}
              placeholder="Generate Wallet new address"
            />
            <div style={{textAlign:"end"}}>
            <Button type="button" className='submitbtn' onClick={getNewWalletAddress} >
              Generate
            </Button>
            <Button type="submit" className='submitbtn'>
              Save
            </Button>
            </div>
           
          </Form>
        </DialogContent>
      </Grid>
      </LoadingOverlay>
    </Dialog>
  );
}

AddressModal.propTypes = {};

export default AddressModal;
