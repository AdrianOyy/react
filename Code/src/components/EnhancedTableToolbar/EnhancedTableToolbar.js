import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from "styled-components"

import {
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
} from '@material-ui/core'

import {
  Delete as DeleteIcon,
  AddOutlined as AddIcon,
} from "@material-ui/icons"

import GetAppIcon from '@material-ui/icons/GetApp'
import DownloadDialog from "../DownloadDialog"

const ToolbarTitle = styled.div`
  min-width: 400px;
`

const Spacer = styled.div`
  flex: 1 1 100%;
`

function EnhancedTableToolbar(props) {
  const { numSelected, tableName, createPath, showDownLoad,
    onDelete, hideCreate, customCreate, titleLevel, page,
  } = props
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
        <ToolbarTitle>
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
                <IconButton aria-label="Export" onClick={onDownLoad}>
                  <GetAppIcon />
                </IconButton>
              </Tooltip>
            )
          }
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete" onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : !hideCreate ? ((
            <Tooltip title="Create">
              <IconButton aria-label="Create" onClick={toCreatePage}>
                <AddIcon />
              </IconButton>
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
