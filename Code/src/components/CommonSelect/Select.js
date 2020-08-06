import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function CommonSelect(props) {
  const classes = useStyles();
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
  } = props;
  return (
    <FormControl
      className={classes.formControl}
      error={error}
      variant={ outlined ? "outlined" : undefined }
      style={{ margin: "0 10ch 0 0"}}
    >
      <InputLabel id={id}> {label} </InputLabel>
      <Select
        labelId={id}
        id={id}
        value={value}
        onChange={onSelectChange}
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