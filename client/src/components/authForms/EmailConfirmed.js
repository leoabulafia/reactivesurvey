import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog';

class EmailConfirmed extends React.Component {
  state = {
    open: true
  };

  handleClose = () => {
    const { auth } = this.props;
    switch (auth) {
      case null:
        return;
      case false:
        this.setState({ open: false });
        this.props.history.push('/signin');
        break;
      default:
        this.setState({ open: false });
        this.props.history.push('/dashboard');
    }
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
            {'Your email address has been confirmed!'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You've succesfully confirmed your account.
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

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(withMobileDialog()(EmailConfirmed));
