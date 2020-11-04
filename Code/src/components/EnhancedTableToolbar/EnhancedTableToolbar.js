import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from "styled-components"

import {
  Toolbar,
  Tooltip,
  Typography,
  Button,
} from '@material-ui/core'

import {
  Delete as DeleteIcon,
  AddCircle as AddIcon,
} from "@material-ui/icons"

import GetAppIcon from '@material-ui/icons/GetApp'
import DownloadDialog from "../DownloadDialog"
import { makeStyles } from "@material-ui/core/styles"

const ToolbarTitle = styled.div`
  min-width: 400px;
`

const Spacer = styled.div`
  flex: 1 1 100%;
`
const useStyles = makeStyles(() => ({
  addButton: {
    marginRight: -10,
    backgroundColor: '#D3DCFC',
    color: '#325df4',
    fontWeight: 'blod'
  },
  deleteButton: {
    marginRight: -10,
    backgroundColor: '#DC004E',
    color: 'white',
    fontWeight: 'blod'
  },
}))


function EnhancedTableToolbar(props) {
  const { numSelected, tableName, createPath, showDownLoad,
    onDelete, hideCreate, customCreate, titleLevel, page,
    hideDelete,
  } = props
  const classes = useStyles()
  const [ open, setOpen ] = useState(false)
  const history = useHistory()
  const onDownLoad = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const toCreatePage = () => {
    customCreate ? customCreate() : history.push(createPath)
  }
  return (
    <React.Fragment>
      <Toolbar>
        <ToolbarTitle style={{ marginLeft: -10 }}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant={titleLevel ? `h${titleLevel}` : 'h4'} id="tableTitle">
              { tableName }
            </Typography>
          )}
        </ToolbarTitle>
        <Spacer />
        <div style={{ display: 'flex' }}>
          {
            showDownLoad && (
              <Tooltip title="Export">
                {/* <IconButton aria-label="Export" onClick={onDownLoad}>*/}
                {/*  <GetAppIcon />*/}
                {/* </IconButton>*/}
                <Button
                  variant="contained"
                  size="small"
                  className={classes.addButton}
                  startIcon={<GetAppIcon />}
                  onClick={onDownLoad}
                >
                  Export
                </Button>
              </Tooltip>
            )
          }
          {numSelected > 0 && !hideDelete ? (
            <Tooltip title="Delete">
              <Button
                variant="contained"
                size="small"
                className={classes.deleteButton}
                onClick={onDelete}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Tooltip>
          ) : !hideCreate ? ((
            <Tooltip title="Create">
              <Button
                variant="contained"
                size="small"
                className={classes.addButton}
                startIcon={<AddIcon />}
                onClick={toCreatePage}
              >
                Add
              </Button>
            </Tooltip>
          )) : null
          }
        </div>
      </Toolbar>
      <DownloadDialog
        open={open}
        page={page}
        onClose={onClose}
      />
    </React.Fragment>
  )
}

export default EnhancedTableToolbar
