import React, { useCallback, useState, useRef } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import getCommonStyle from "../../CommonStyle"
import { Button, InputLabel as Label } from "@material-ui/core"
import CommonTip from "../../../../CommonTip"
import Loading from "../../../../Loading"
import SearchDialog from "./SearchDialog"

function SearchInput(props) {
  const {
    id,
    required,
    label,
    fieldName,
    defaultValue,
    disabled,
    onBlur,
    asyncCheck,
    style,
    apiKey,
    apiValue,
    buttonText,
  } = props

  const inputEl = useRef(null)

  const [ error, setError ] = useState(false)
  const [ helperText, setHelperText ] = useState(false)
  const [ open, setOpen ] = useState(false)
  const [ dataList, setDataList ] = useState([])


  const handleBlur = useCallback(async (e) => {
    const { value } = e.target
    onBlur && onBlur(fieldName, value)
    const { error, message } = await asyncCheck(props)
    setError(error)
    setHelperText(message)
    // eslint-disable-next-line
  }, [ onBlur ])

  const onDialogClose = useCallback(() => { setOpen(false) }, [])

  const onDialogSelect = useCallback((data) => {
    if (inputEl && inputEl.current) {
      inputEl.current.value = data + ''
    }
    handleBlur({ target: { value: data + '' } })
    // eslint-disable-next-line
  }, [])

  const useStyles = makeStyles((theme) => (getCommonStyle(theme, style, error, helperText, disabled)))

  const classes = useStyles()

  const handleCheck = () => {
    const inputValue = inputEl && inputEl.current ? inputEl.current.value : ''
    if (!inputValue || inputValue.trim() === '') {
      CommonTip.warning('Please input the keyword first')
      return
    }
    if (!apiKey) return
    if (inputValue) {
      Loading.show()
      apiKey && apiKey(Object.assign({ email: inputValue, id }, apiValue))
        .then(({ data }) => {
          const result = data.data
          if (!result || !result.length) {
            CommonTip.error('value can not be found')
          } else {
            setDataList(result)
            setOpen(true)
          }
        })
        .finally(() => {
          Loading.hide()
        })
        .catch((e) => {
          console.log(e)
          Loading.hide()
        })
    }
  }

  return (
    <>
      <div
        className={classes.root}
        id={'element_' + fieldName}
      >
        <Label
          className={classes.label}
          htmlFor={id}
          id={id + 'label'}
        >
          { required && (<font color="red">*</font>)}
          {label + ':'}
        </Label>
        <div style={{ width: '1vw' }} />
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <input
            ref={inputEl}
            id={fieldName}
            type="text"
            disabled={disabled}
            className={classes.input}
            onBlur={handleBlur}
            defaultValue={defaultValue ? defaultValue : ''}
          />
          <Button
            disabled={disabled}
            className={classes.inputCheck}
            onClick={handleCheck}
          >{buttonText ? buttonText : 'Check'}</Button>
        </div>
        {
          error && helperText && (
            <div className={classes.helperText}>{helperText}</div>
          )
        }
      </div>
      <SearchDialog
        open={open}
        onClose={onDialogClose}
        title={fieldName}
        dataList={dataList}
        onSelect={onDialogSelect}
      />
    </>
  )
}

export default SearchInput
