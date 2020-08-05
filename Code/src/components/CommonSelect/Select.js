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
  const { value, itemList, onSelectChange, id, label, error, helperText } = props;
  return (
    <FormControl
      className={classes.formControl}
      error={error}
      variant="outlined"
    >
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        value={value}
        onChange={onSelectChange}
      >
        {
          itemList && itemList.map((item, i) => (
            <MenuItem value={item.value} key={i + item.value}>{item.label}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

export default CommonSelect