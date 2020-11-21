import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { OutlinedInput } from "@material-ui/core"
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

function CommonSelect(props) {
  const classes = useStyles()

  const {
    value,
    itemList,
    onSelectChange,
    id,
    label,
    error,
    helperText,
    outlined,
    valueField,
    labelField,
    hasMt,
    labelWidth,
    width,
  } = props
  const [ selectValue, setSelectValue ] = useState(value)
  const onCommonSelectChange = (e) => {
    setSelectValue(e.target.value)
    onSelectChange(e)

  }
  useEffect(() => {
    setSelectValue(value)
  }, [ value ])
  return (
    <FormControl
      className={classes.formControl}
      error={error}
      variant={outlined ? "outlined" : undefined}
      style={hasMt ? { margin: "5ch 8ch 0 0" } : { margin: "0 8ch 0 0" }}
    >
      <InputLabel  id={id}> {label} </InputLabel>
      <Select
        labelId={id}
        id={id}
        value={selectValue}
        onChange={onCommonSelectChange}
        style={{ minWidth: `${(width ? width : 1) * 150}px` }}
        input={
          outlined ? <OutlinedInput
            labelWidth={labelWidth ? labelWidth : 60}
          /> : undefined
        }
      >
        {
          itemList && itemList.map((item, i) => (
            <MenuItem
              value={valueField ? item[valueField] : item.value}
              key={i}
            >
              {labelField ? item[labelField] : item.label}
            </MenuItem>
          ))
        }
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

export default CommonSelect
