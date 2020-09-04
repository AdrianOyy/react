import React from "react"
import {
  TextField,
} from "@material-ui/core"
import { fade, withStyles, makeStyles } from "@material-ui/core/styles"

const fontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',')


export default function HAInput(props) {
  const {
    width,
    error,
    label,
    helperText,
  } = props

  const getWidth = (power) => {
    power = power ? power : 1
    const basicWidth = 15
    const labelWidth =  label && label.length ? label.length / 1.2 : 6 / 1.7
    const inputWidth = basicWidth * power
    return {
      input: inputWidth,
      label: labelWidth,
      container: Math.max(inputWidth, labelWidth) + 0.5
    }
  }

  const useStyles = makeStyles(() => ({
    root: {
      width: getWidth(width).container + 'vw'
    },
    helper: {
      color: '#f44336',
      height: '1vh',
      lineHeight: '1vh',
      fontSize: '1rem',
      fontFamily,
      marginLeft: getWidth(width).labelWidth + 'vw'
    }
  }))

  const classes = useStyles()

  const BootstrapInput = withStyles((theme) => ({
    root: {
      width: getWidth(width).input + 'vw',
    },
    input: {
      height: '0.8em',
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: props.error ? `1px solid ${theme.palette.error.main}` : '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 12px',
      transition: theme.transitions.create([ 'border-color', 'box-shadow' ]),
      fontFamily,
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }))(TextField)

  return (
    <div className={classes.root}>
      <BootstrapInput
        {...props}
      />
      {
        error && helperText && (
          <div className={classes.helper}>{helperText}</div>
        )
      }
    </div>
  )
}
