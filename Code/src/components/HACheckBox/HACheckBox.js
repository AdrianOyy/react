import React, { useEffect, useState } from "react"
import {
  InputLabel as Label,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core"
import { withStyles, makeStyles } from "@material-ui/core/styles"

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


export default function HACheckBox(props) {
  const {
    id,
    width,
    required,
    error,
    label,
    disabled,
    helperText,
    onChange,
    itemList,
    labelField,
    defaultValue
  } = props

  const [ value, setValue ] = useState([])
  const [ checkvalues, setCheckValues ] = useState([])

  const handleChange = (e) => {
    const data = JSON.parse(JSON.stringify(value))
    let checks = JSON.parse(JSON.stringify(checkvalues))
    data[e.target.name] = e.target.checked
    setValue(data)
    if (e.target.checked === true) {
      if (checks.indexOf(e.target.name) ===  -1) {
        checks.push(e.target.name)
      }
    } else {
      const index = checks.indexOf(e.target.name)
      if (index !== -1) {
        checks.splice(index, 1)
      }
    }
    setCheckValues(checks)
    onChange({ id, label: checks.join(','), value: checks.join(',') })
    // setNewValue(e.target.value)
  }

  // useEffect(() => {
  //   setNewValue(defaultValue ? (defaultValue.value ? defaultValue.value : defaultValue) : '')
  //   defaultValue && onChange && onChange(defaultValue)
  // }, [ defaultValue, onChange ])

  // useEffect(() => {
  //   if (isNew) {
  //     setNewValue('')
  //   }
  // }, [ isNew ])

  useEffect(() => {
    let stt = []
    const value = defaultValue ? (defaultValue.value ? defaultValue.value : defaultValue) : ''
    if (value) {
      stt = value.split(',')
    }
    let data = {}
    for (let i = 0; i < itemList.length; i++) {
      data[itemList[i][labelField]] = stt.indexOf(itemList[i][labelField]) > -1
    }
    setValue(data)
    onChange({ id, label: value, value })
    // eslint-disable-next-line
  }, [ itemList, defaultValue, onChange ])

  const getWidth = (power) => {
    power = power ? power : 1
    const basicWidth = 22
    const labelWidth = label && label.length ? label.length / 1.7 : 6 / 1.7
    const inputWidth = basicWidth * power
    return {
      input: inputWidth,
      label: labelWidth,
      container: Math.max(inputWidth, labelWidth)
    }
  }

  const useStyles = makeStyles(() => ({
    root: {
      padding: `0 0 ${error && helperText ? '0' : '1vh'} 0`,
      marginBottom: '1vh',
      marginRight: '5vw',
    },
    flex: {
      display: 'flex',
      marginLeft: '-6vw',
      justifyContent: "flex-end",
      alignItems: "center",
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

  const InputLabel = withStyles((theme) => ({
    root: {
      fontSize: '1.1rem',
      color: 'rgba(0,0,0,.85)',
      '-webkit-user-select': 'none',
      '-moz-user-select': 'none',
      fontFamily,
      focused: {
        color: theme.palette.primary.main,
      }
    },
  }))(Label)

  return (
    <div className={classes.root}>
      <InputLabel
        htmlFor={id}
        disabled={disabled}
      >
        { required && (<font color="red">*</font>)}
        {label + ':'}
      </InputLabel>
      <div style={{ width: '1vw' }} />
      <div>
        <FormGroup row>
          {
            itemList && itemList.map((el, i) => (
              <FormControlLabel key={el[labelField] + '__' + i}
                control={<Checkbox checked={value[el[labelField]] ? value[el[labelField]] : false} onChange={handleChange} name={el[labelField]} />}
                label={el[labelField]}
              />
            ))
          }
        </FormGroup>
      </div>
      {
        error && helperText && (
          <div className={classes.helper}>{helperText}</div>
        )
      }
    </div>
  )
}
