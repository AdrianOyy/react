import React, { Component } from "react"
import ReactDOM from "react-dom"
import { lang } from "../../lang/lang"
import Button from "@material-ui/core/Button";
import {
  TextField,
  Grid,
} from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const open = true;
class CommonTipForm extends Component {
  static context = null
  static remark = '';
  static show(options) {
    this.getContext();
    this.showDialog(options)
  }
  static getContext() {
    const div = document.createElement("div")
    div.style.position = "absolute"
    div.style.zIndex = "1200"
    document.body.append(div)
    this.context = div
  }
  static handleClose(value, id) {
    let that = this
    ReactDOM.unmountComponentAtNode(that.context)
    setTimeout(x => document.body.removeChild(that.context), 50)
  }
  static handleChange(event, id, onchange) {
    this.remark = event.target.value;
    if (typeof onchange == 'function') {
      onchange(event, id)
    }
  }
  static handleSubmit(submit) {
    return () => {
      let that = this;
      if (typeof submit == 'function') {
        submit(that.remark)
      }
      that.handleClose()
    }
  }
  static showDialog(options) {
    const that = this;
    const ex_us = lang.ex_us
    options.msg = ex_us[options.msg] || options.msg
    let defaultOptions = {
      title: '',
      formField: {},
      contentText: '',
      onFormFieldChange: () => { },
      onSubmit: () => { },
      onFormFieldBlur: () => { },
      ...options,
    }
    let opt = Object.assign({}, defaultOptions)
    const DialogBox = (props) => (
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          {
            props.contentText && <DialogContentText>{props.contentText}</DialogContentText>
          }
          <form noValidate autoComplete="off">
            <TextField
              id={props.formField.id.toString()}
              key={props.formField.id + props.formField.label}
              label={props.formField.label}
              type={props.formField.type}
              error={props.formField.error || false}
              helperText={props.formField.helperText || ''}
              disabled={props.formField.disabled || false}
              required={props.formField.required || false}
              onChange={!props.formField.readOnly ? (event) => that.handleChange(event, props.formFieldId, props.onFormFieldChange) : null}
              onBlur={!props.formField.readOnly && props.onFormFieldBlur ? (e) => props.onFormFieldBlur(e, props.formField.id) : null}
              value={props.formField.value}
              InputProps={{
                readOnly: props.formField.readOnly
              }}
              InputLabelProps={{
                shrink: props.formField.type === 'date' ? true : undefined
              }}
              multiline
              style={{ width: '50ch' }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            style={{ marginTop: '5ch' }}
          >
            <Button onClick={that.handleClose.bind(that)} color="primary"
              variant="contained"
              style={{ marginRight: '5ch' }}>
              Cancel
          </Button>
            <Button onClick={props.onSubmit ? that.handleSubmit(props.onSubmit) : that.handleClose.bind(that)} color="primary" variant="contained">
              Submit
          </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    )
    ReactDOM.render(<DialogBox {...opt} />, this.context)
  }
}
export default CommonTipForm
