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
  const { onSearchFieldChange, onSearchButton, fieldList } = props;
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
              id = { field.id }
              key = {field.id + field.label}
              label = { field.label}
              type = {field.type}
              error = {field.error || false}
              helperText = {field.helperText || ''}
              disabled = {field.disabled || false}
              required = {field.required || false}
              onChange = { !field.readOnly ? (event) => onSearchFieldChange(event, field.id) : null}
              value={ field.value }
              InputLabelProps={{
                shrink: field.type === 'date' ? true : undefined
              }}
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