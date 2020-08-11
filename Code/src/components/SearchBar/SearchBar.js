// import React, { useState, useEffect } from 'react';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import dayjs from 'dayjs'
import {
  Button,
  ButtonGroup,
  TextField,
} from '@material-ui/core'
import {
  KeyboardDatePicker,
} from '@material-ui/pickers'
import CommonSelect from "../CommonSelect"

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
  KeyboardDatePicker: {
    marginRight: theme.spacing(10),
    width: '25ch',
  },
  button: {
    marginRight: theme.spacing(10),
  },
}))

function SearchBar(props) {
  const {
    onSearchFieldChange,
    onClearButton,
    onSearchButton,
    fieldList,
    extendButtonList,
    onExtendButtonClick
  } = props
  const classes = useStyles()
  const handleDataChange = (value, id) => {
    const data = {
      target: {
        value
      }
    }
    onSearchFieldChange(data, id)
  }
  return (
    <div style={{ marginBottom: '10px',  padding: '0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/*
        type list, see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
      */}
      <div>
        {
          fieldList && fieldList.map((field) => field.isSelector ? (
            <CommonSelect
              id = {field.id}
              key = {field.id + field.label}
              label = {field.label}
              error = {field.error || false}
              helperText = {field.helperText || ''}
              value={field.value || ''}
              itemList={field.itemList}
              outlined={false}
              labelField={field.labelField}
              valueField={field.valueField}
              onSelectChange = {(event) => onSearchFieldChange(event, field.id)}
            />
          ) : (field.type === 'date' ?
            (
              <KeyboardDatePicker
                clearable
                variant="inline"
                key = {field.id + field.label}
                format="yyyy/MM/dd"
                label = {field.label}
                value = {field.value === '' ? null : field.value}
                style={{ marginRight: "8ch" }}
                onChange = {(event) => handleDataChange(event, field.id)}
              />
            ) : (
              <TextField
                id = {field.id}
                key = {field.id + field.label}
                label = {field.label}
                type = {field.type}
                error = {field.error || false}
                helperText = {field.helperText || ''}
                disabled = {field.disabled || false}
                required = {field.required || false}
                onChange = {!field.readOnly ? (event) => onSearchFieldChange(event, field.id) : null}
                value={field.value}
                InputLabelProps={{
                  shrink: field.type === 'date' ? true : undefined
                }}
                style={{ marginRight: "8ch" }}
              />
            )))
        }
      </div>
      <ButtonGroup>
        <Button
          variant="contained"
          onClick={onClearButton}
          className={classes.button}
          style={{ marginRight: '2ch' }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSearchButton}
          className={classes.button}
        >
          Search
        </Button>
        {
          extendButtonList && extendButtonList.map((item, i) => (
            <Button
              key={i + "__" + item.id}
              variant="contained"
              color={item.color}
              onClick={onExtendButtonClick ? (e) => onExtendButtonClick(e, item.id) : null}
              className={classes.button}
            >
              {item.label}
            </Button>
          ))
        }
      </ButtonGroup>
    </div>
  )
}

export default SearchBar
