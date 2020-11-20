import React, { useCallback, useState, useRef, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import getCommonStyle from "../../CommonStyle"
import { Button, IconButton, InputLabel as Label, Tooltip } from "@material-ui/core"
import CommonTip from "../../../../CommonTip"
import Loading from "../../../../Loading"
import SearchDialog from "./SearchDialog"
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone'

function SearchInput(props) {
  const {
    id,
    required,
    fieldDisplayName,
    abbrFieldName,
    fieldName,
    defaultValue,
    disabled,
    onChange,
    asyncCheck,
    style,
    apiKey,
    apiValue,
  } = props

  const inputEl = useRef(null)

  const [ error, setError ] = useState(false)
  const [ helperText, setHelperText ] = useState(false)
  const [ open, setOpen ] = useState(false)
  const [ dataList, setDataList ] = useState([])
  const [ selectedList, setSelectedList ] = useState([])

  useEffect(()  => {
    onChange && onChange(fieldName, selectedList)
    async function asyncCheckeField() {
      const { error, message } = await asyncCheck(props)
      setError(error)
      setHelperText(message)
    }
    asyncCheckeField(fieldName, selectedList)
    // eslint-disable-next-line
  }, [ selectedList ])

  useEffect(() => {
    defaultValue && setSelectedList(defaultValue)
  }, [ defaultValue ])

  const onDialogClose = useCallback(() => { setOpen(false) }, [])

  const onDialogSelect = useCallback((data) => {
    if (selectedList.indexOf(data) !== -1) return
    const newSelectedList = [ ...selectedList, data + '' ]
    setSelectedList(newSelectedList)
  }, [ selectedList ])

  const useStyles = makeStyles((theme) => ({
    ...getCommonStyle(theme, style, error, helperText, disabled),
    row: {
      display: 'flex',
      justifyContent: "space-between",
      alignItems: 'center',
      height: '25%',
      padding: '0 0.5em 0 1em',
      '&:hover': {
        backgroundColor: '#E9EDFE',
      }
    }
  }))

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

  const handleRemove = (i) => {
    const newList = [ ...selectedList ]
    newList.splice(i, 1)
    setSelectedList(newList)
  }

  return (
    <>
      <div
        className={classes.root}
        style={{
          height: '13em',
          marginLeft: '2em',
          marginRight: '4em',
        }}
        id={'element_' + fieldName}
      >
        {
          fieldDisplayName && fieldDisplayName.length > 40
            ? (
              <Tooltip title={fieldDisplayName}>
                <Label
                  className={classes.label}
                  htmlFor={id}
                  id={id + 'label'}
                >
                  { required && (<font color="red">*</font>)}
                  {abbrFieldName + ':'}
                </Label>
              </Tooltip>
            )
            : (
              <Label
                className={classes.label}
                htmlFor={id}
                id={id + 'label'}
              >
                { required && (<font color="red">*</font>)}
                {abbrFieldName + ':'}
              </Label>)
        }
        <div style={{ width: '1vw' }} />
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <input
            ref={inputEl}
            id={fieldName}
            type="text"
            disabled={disabled}
            className={classes.input}
          />
          <Button
            disabled={disabled}
            className={classes.inputCheck}
            onClick={handleCheck}
          >Check</Button>
        </div>
        <div
          style={{
            border: '1px solid #ccc',
            height: '7em',
            marginTop: '0.5em',
            overflowY: 'auto',
          }}
        >
          {
            selectedList && selectedList.map((el, i) => (
              <div
                key={el + '_' + i}
                className={classes.row}
              >
                <div style={{
                  userSelect: 'none',
                  MozUserSelect: 'none',
                }}>{el}</div>
                {
                  !disabled && (
                    <Tooltip title="Remove">
                      <IconButton
                        aria-label="edit"
                        onClick={() => { handleRemove(i) }}
                        disabled={disabled}
                      >
                        <HighlightOffTwoToneIcon fontSize="small" style={{ color: '#2553F4' }} />
                      </IconButton>
                    </Tooltip>
                  )
                }
              </div>
            ))
          }
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