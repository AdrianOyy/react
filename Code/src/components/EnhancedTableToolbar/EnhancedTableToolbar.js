import React from 'react';
import { useHistory } from 'react-router-dom'
import styled from "styled-components";

import {
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
} from '@material-ui/core'

import {
  Delete as DeleteIcon,
  AddOutlined as AddIcon,
} from "@material-ui/icons";

const ToolbarTitle = styled.div`
  min-width: 300px;
`;

const Spacer = styled.div`
  flex: 1 1 100%;
`;

function EnhancedTableToolbar(props) {
  const { numSelected, tableName, createPath, onDelete } = props;
  const history = useHistory();
  const toCreatePage = () => {
    history.push(createPath);
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
            <Typography variant="h6" id="tableTitle">
              { tableName }
            </Typography>
          )}
        </ToolbarTitle>
        <Spacer />
        <div>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete" onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Create">
              <IconButton aria-label="Create" onClick={toCreatePage}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    </React.Fragment>
  );
}

export default EnhancedTableToolbar