import React from "react";
import styled from "styled-components";

import { Button as MuiButton, Menu, MenuItem } from "@material-ui/core";
import { L } from '../../../utils/lang'
import {
  Loop as LoopIcon,
  FilterList as FilterListIcon
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Button = styled(MuiButton)(spacing);

const SmallButton = styled(Button)`
  padding: 4px;
  min-width: 0;

  svg {
    width: 0.9em;
    height: 0.9em;
  }
`;

class Actions extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <SmallButton size="small" mr={2}>
          <LoopIcon />
        </SmallButton>
        <SmallButton size="small" mr={2}>
          <FilterListIcon />
        </SmallButton>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {L('Today')}: April 29
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>{L('Today')}</MenuItem>
          <MenuItem onClick={this.handleClose}>{L('Yesterday')}</MenuItem>
          <MenuItem onClick={this.handleClose}>{L('Last')} 7 {L('days')}</MenuItem>
          <MenuItem onClick={this.handleClose}>{L('Last')} 30 {L('days')}</MenuItem>
          <MenuItem onClick={this.handleClose}>{L('This')} {L('month')}</MenuItem>
          <MenuItem onClick={this.handleClose}>{L('Last')} {L('month')}</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

export default Actions;
