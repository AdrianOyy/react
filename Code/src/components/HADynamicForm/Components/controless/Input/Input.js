import React, { useCallback, useState } from "react"
import {
  InputLabel as Label,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import getCommonStyle from "../../CommonStyle"


export default function HAInput(props) {
  const {
    id,
    required,
    label,
    fieldName,
    defaultValue,
    disabled,
    onBlur,
    checkField,
    style,
  } = props

  const [ error, setError ] = useState(false)
  const [ helperText, setHelperText ] = useState(false)


  const handleBlur = useCallback(async (e) => {
    const { value } = e.target
    onBlur && onBlur(fieldName, value)
    if (checkField) {
      const { error, message } = checkField(props)
      setError(error)
      setHelperText(message)
    }
    // eslint-disable-next-line
  }, [ onBlur ])

  const useStyles = makeStyles((theme) => (getCommonStyle(theme, style, error, helperText, disabled)))

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Label
        className={classes.label}
        htmlFor={id}
        id={id + 'label'}
      >
        { required && (<font color="red">*</font>)}
        {label + ':'}
      </Label>
      <div style={{ width: '1vw' }}></div>
      <div>
        <input
          id={fieldName}
          type="text"
          disabled={disabled}
          className={classes.input}
          onBlur={handleBlur}
          defaultValue={defaultValue ? defaultValue : ''}
        />
      </div>
      {
        error && helperText && (
          <div className={classes.helperText}>{helperText}</div>
        )
      }
    </div>
  )
}
