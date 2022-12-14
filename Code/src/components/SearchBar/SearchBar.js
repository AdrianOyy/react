// import React, { useState, useEffect } from 'react';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import dayjs from 'dayjs'
import {
  Button,
  TextField,
} from '@material-ui/core'
import {
  KeyboardDatePicker,
} from '@material-ui/pickers'
import CommonSelect from "../CommonSelect"
import DateRange from "../DateRange"
// import { DateRange } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: '1em',
  },
  textField: {
    marginRight: theme.spacing(10),
    width: '25ch',
  },
  KeyboardDatePicker: {
    marginRight: theme.spacing(10),
    width: '25ch',
  },
  clearButton: {
    marginRight: '2ch',
    backgroundColor: '#D3DCFC',
    color: '#325df4',
    width: '10ch',
  },
  searchButton: {
    backgroundColor: '#2553F4',
    width: '10ch',
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
    <div className={classes.root}>
      {/*
        type list, see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
      */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "flex-start",
        }}
      >
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
                clearable='true'
                variant="inline"
                key = {field.id + field.label}
                error = {field.error || false}
                helperText = {field.helperText || ''}
                views={field.views ? field.views : undefined}
                format={field.views ? 'yyyy' : 'yyyy / MM / dd'}
                label = {field.label}
                value = {field.value === '' ? null : field.value}
                style={{ marginRight: "8ch", marginTop: "1em" }}
                onChange = {(event) => handleDataChange(event, field.id)}
              />
            ) : (field.type === 'dateRange' ? (
              <DateRange
                clearable='true'
                variant="inline"
                key = {field.id + field.label}
                error = {field.error || false}
                helperText = {field.helperText || ''}
                views={field.views ? field.views : undefined}
                format={field.views ? 'yyyy' : 'yyyy / MM / dd'}
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
            ))
          ))
        }
      </div>
      <div style={{ minWidth: '25ch' }}>
        <Button
          variant="contained"
          onClick={onClearButton}
          className={classes.clearButton}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSearchButton}
          className={classes.searchButton}
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
      </div>
    </div>
  )
}

export default SearchBar
