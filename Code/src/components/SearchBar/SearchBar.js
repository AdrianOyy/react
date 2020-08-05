// import React, { useState, useEffect } from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import dayjs from 'dayjs'
import {
  Button,
  TextField,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(2),
    border: '2ch'
  },
  textField: {
    marginRight: theme.spacing(10),
    width: '25ch',
  },
  button: {
    marginRight: theme.spacing(10),
  },
}));

function SearchBar(props) {
  const { onhandelFieldChange, onSearchButton, fieldList } = props;
  const classes = useStyles();
  return (
    <div style={{ marginBottom: '10px',  padding: '0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* 
        type list, see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
      */}
      <div>
        {
          fieldList && fieldList.map((field) => (
            <TextField
              id = {field.id}
              label ={ field.label }
              key = { field.id }
              type = { field.type ? field.type : 'text' }
              onChange={ (event) => onhandelFieldChange(event, field.id)}
              className={classes.textField}
              style = {{ marginRight: '10ch' }}
            />
          ))
        }
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={onSearchButton}
        className={classes.button}>
        Search
      </Button>
    </div>
  );
}

export default SearchBar