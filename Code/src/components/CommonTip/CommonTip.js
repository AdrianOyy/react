import React, { Component } from "react";
import ReactDOM from "react-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

class CommonTip extends Component {
  static info(msg) {
    this.showtip({ msg: msg, serverity: 'info' });
  }
  static success(msg) {
    this.showtip({ msg: msg, severity: 'success' });
  }
  static warning(msg) {
    this.showtip({ msg: msg, severity: 'warning' });
  }
  static error(msg) {
    this.showtip({ msg: msg, severity: 'error' });
  }
  static showtip(options) {
    let defaultOptions = {
      msg: '',
      severity: 'info',
      autoHideDuration: 6000
    };

    let opt = Object.assign({}, defaultOptions, options);

    const div = document.createElement("div");
    document.body.append(div);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      ReactDOM.unmountComponentAtNode(div);
      setTimeout(x=> document.body.removeChild(div),50)
    }

    const Alert = (props) => (
      <Snackbar open={true} autoHideDuration={props.autoHideDuration} onClose={handleClose}> 
        <MuiAlert elevation={6} variant="filled" severity={props.severity} onClose={handleClose}>
          {props.msg}
        </MuiAlert>
      </Snackbar>
    );
    ReactDOM.render(<Alert {...opt} />, div);
  }
}
export default CommonTip;