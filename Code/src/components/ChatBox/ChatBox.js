import React, { useState } from "react"

import {
  Button as HAButton,
  Dialog as HADialog,
  DialogActions,
  DialogTitle,
} from '@material-ui/core/'
import API from "../../api/workFlow"
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import { makeStyles, withStyles } from "@material-ui/core/styles"
import formatDateTime from "../../utils/formatDateTime"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import { L } from "../../utils/lang"

const useStyles = makeStyles(() => ({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginLeft: '1vw',
    marginRight: '1vw',
  },
  none: {
    display: 'none',
  }
}))

const Dialog = withStyles(() => ({
  paper: {
    minWidth: '65vw',
    minHeight: '90vh'
  },
}))(HADialog)

const Actions = withStyles(() => ({
  root: {
    display: 'flex',
    height: '10vh',
    width: '100%',
    margin: '0',
    padding: '2vh 0',
    justifyContent: 'center',
    alignItems: "center",
  },
}))(DialogActions)

const Button = withStyles((() => ({
  root: {
    width: '5vw',
  }
})))(HAButton)

const Title = withStyles((() => ({
  root: {
    height: '8vh',
    display: 'flex',
    alignItems: 'center',
    maxHeight: '60px',
  }
})))(DialogTitle)

const Content = withStyles((() => ({
  root: {
    padding: '0 4vw',
    minHeight: '90px',
  }
})))(DialogContent)

export default function ChatBox(props) {
  const {
    open,
    onClose,
    taskId,
    disabled
  } = props
  const classes = useStyles()
  const [ messageList, setMessageList ]   = useState([])
  const [ reasonValue, setReasonValue ] = useState(null)

  // 初始化
  const onEnter = () => {
    // 获取 messageList
    API.getTaskMessage({ taskId }).then(({ data }) => {
      console.log(data.data)
      setMessageList(data.data)
    })
    // 用 setMessageList 方法更新 messageList

  }

  const dialogReason = {
    title: 'message',
    value: '',
    formField:
      {
        id: 'message', label: 'message', type: 'text', disabled: false, readOnly: false, required: true, helperText: L('NotEmpty')
      },
    onSubmit: (value) => {
      console.log(value)
    },
  }

  const handleReasonChange = (event) => {
    setReasonValue(event.target.value)
  }

  // 提交处理
  const submitHandle = () => {
    if (reasonValue && reasonValue.length > 0) {
      const message = reasonValue
      API.addMessage({ taskId, message }).then(({ data }) => {
        setReasonValue('')
        setMessageList(data.data)
      })
    }
  }

  // 关闭处理
  const closeHandle = () => {
    // 额外处理
    onClose()
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onEnter={onEnter}
      >
        <Title>message</Title>
        {/* {messageList.map((label) => {*/}
        {/*  return (*/}
        {/*    // eslint-disable-next-line react/jsx-key*/}
        {/*    <DialogContentText theme={{ wordBreak: 'break-word' }}>*/}
        {/*      {formatDateTime(label.createAt)}*/}
        {/*      {label.username}*/}
        {/*      {label.message}*/}
        {/*    </DialogContentText>)*/}
        {/* })}*/}
        <Content dividers={true}>
          <List>
            {messageList.map((label, index) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div key={index}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={label.username + '   ' + formatDateTime(new Date(label.createAt))} secondary={label.message} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              )
            })}
          </List>
        </Content>
        <Content className={disabled ? classes.none : ''} dividers={false}>
          <TextField
            fullWidth={true}
            id={dialogReason.formField.id.toString()}
            key={dialogReason.formField.id + dialogReason.formField.label}
            label={dialogReason.formField.label}
            type={dialogReason.formField.type}
            error={dialogReason.formField.error || false}
            helperText={dialogReason.formField.helperText || ''}
            disabled={dialogReason.formField.disabled || false}
            required={dialogReason.formField.required || false}
            onChange={!dialogReason.formField.readOnly ? (event) => handleReasonChange(event) : null}
            value={reasonValue}
            multiline
          />
        </Content>
        <Actions disableSpacing={true}>
          <Button
            color="primary"
            variant="contained"
            disabled={disabled}
            className={classes.button}
            onClick={submitHandle}>
            Submit
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={closeHandle}>
            Close
          </Button>
        </Actions>
      </Dialog>
    </React.Fragment>
  )
}
