import React, { useCallback, useContext } from 'react'
import { DynamicContext } from "../../HADynamicForm"
import {
  Slide,
  Dialog as HADialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { switchComponent } from "../../utils"


export default function ChildForm(props) {
  const {
    onClose,
    open,
    currentIndex,
  } = props

  const { logic, style } = useContext(DynamicContext)

  const getComponent = useCallback((el, i) => switchComponent(el, i, logic, style, false), [ logic, style ])

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  const Dialog = withStyles(() => ({
    paper: {
      minWidth: '65vw',
      minHeight: '90vh'
    },
  }))(HADialog)

  const Title = withStyles((() => ({
    root: Object.assign({
      height: '3.5em',
      display: 'flex',
      alignItems: 'center',
      maxHeight: '60px',
    }, style ? style.childFormTitle : {})
  })))(DialogTitle)


  const useStyles = makeStyles(() => {
    return {
      dialog: {
        minWidth: '65vw',
        minHeight: '90vh',
      },
      content: {
        padding: '1em 2em',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      },
      formElementContainer: Object.assign({
        width: '45%',
      }, style ? style.formElementContainer : {}),
      actions: {
        display: 'flex',
        justifyContent: 'center',
      },
    }
  })

  const classes = useStyles()


  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        TransitionComponent={Transition}
      >
        <Title>{ logic && logic.getChildFormTitle() }</Title>
        <DialogContent dividers={true} className={classes.content}>
          { logic && logic.getChildInitDetail && logic.getChildInitDetail(currentIndex).map((el, i) => {
            return (
              <div key={el.id + '_' + i} className={classes.formElementContainer}>
                {
                  getComponent(el, i)
                }
              </div>
            )
          }) }
        </DialogContent>
        <DialogActions disableSpacing={true} className={classes.actions}>
          {
            logic && logic.getChildFormActions({ ...props })
          }
        </DialogActions>
      </Dialog>
    </>
  )
}

