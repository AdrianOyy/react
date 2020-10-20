import React, { useState } from "react"

import {
  Button as HAButton,
  Dialog as HADialog,
  DialogActions,
} from '@material-ui/core/'
import { makeStyles, withStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginLeft: '1vw',
    marginRight: '1vw',
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

export default function ChatBox(props) {
  const {
    open,
    onClose
  } = props
  const classes = useStyles()
  const { messageList, setMessageList } = useState([])
  // 初始化
  const onEnter = () => {
    // 获取 messageList

    // 用 setMessageList 方法更新 messageList

  }

  // 提交处理
  const submitHandle = () => {

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
        {/*  添加内容*/}
        <Actions disableSpacing={true}>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={submitHandle}>
            Submit
          </Button>
          <Button
            color="secondary"
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
