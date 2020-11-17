import React, { useCallback, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import getCommonStyle from "../../CommonStyle"

function DatePicker(props) {
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
}

export default DatePicker
