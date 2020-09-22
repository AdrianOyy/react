import React, { useState } from 'react'

import {
  Box,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
  Typography,
  IconButton,
} from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

function ExpandTable(props) {
  const { label, rows, show } = props;

  const expand = []
  if (show.index + 1 < show.list.length) {
    expand.push(1)
  }
  return (
    <React.Fragment>
      <Typography variant={ 'h3' } gutterBottom>
        { label }
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {
                show && show.labels.map((_, i) => {
                  if (i !== 0 && i <= show.index) {
                    return <TableCell>{_}</TableCell>
                  }
                  return null
                })
              }
              {
                expand.length > 0 && expand.map(_ => {
                  return <TableCell />
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row) => (
              <ExpandRow key={row[0]} show={show} row={row} expand={expand} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  )
}

function ExpandRow(props) {
  const { key, row, show, expand } = props;
  const [open, setOpen] = useState(false);

  const listrows = []
  show.list.map((_, i) => {
    if (i !== 0) {
      listrows.push({ label: show.labels[i], value: row[_] });
    }
    return _
  })
  
  return (
    <React.Fragment>
      <TableRow key={key}>
        {
          listrows.map((_, i) => {
            if (i === 0) {
              return <TableCell component="th" scope="row">{_.value}</TableCell>
            } else if (i < show.index) {
              return <TableCell>{_.value}</TableCell>
            }
            return null
          })
        }
        {
          expand && expand.length > 0 && expand.map(_ => {
            return <TableCell> <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}> {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} </IconButton> </TableCell>
          })
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {
                listrows.map((_, i) => {
                  return <TextField disabled label={_.label} value={_.value} variant="outlined" style={{ marginTop: "5ch",  marginRight: "10ch" }}/>
                })
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default ExpandTable