import React from 'react'
import {
  Button,
  Toolbar,
  Tooltip,
  Typography
} from "@material-ui/core"
import GetAppIcon from "@material-ui/icons/GetApp"
import {
  AddCircle as AddIcon,
  Delete as DeleteIcon
} from "@material-ui/icons"

export default function TableHead(props) {
  const {
    numSelected,
    titleLevel,
    tableName,
  } = props
  return (
    <Toolbar>
      <div style={{ minWidth: '400px', marginLeft: -10 }}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant={titleLevel ? `h${titleLevel}` : 'h4'} id="tableTitle">
            { tableName }
          </Typography>
        )}
      </div>
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
      )
}
