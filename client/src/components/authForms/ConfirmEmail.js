import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog';

class ConfirmEmail extends React.Component {
  state = {
    open: true
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push('/dashboard');
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {'Thank you for creating your account!'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please check your inbox and confirm your email address
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(ConfirmEmail);
