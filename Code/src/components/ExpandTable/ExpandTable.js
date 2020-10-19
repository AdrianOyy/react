import React, { useState } from 'react'

import {
  Box,
  CardContent,
  Card as MuiCard,
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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { spacing } from "@material-ui/system"
import styled from "styled-components"

const Card = styled(MuiCard)(spacing)

function ExpandTable(props) {
  const { label, rows, show } = props

  const expand = []
  if (show.index + 1 < show.list.length) {
    expand.push(1)
  }
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant={'h3'} gutterBottom>
          { label }
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {
                  show && show.labels.map((_, i) => {
                    if (i !== 0 && i <= show.index) {
                      return <TableCell key={i}>{_}</TableCell>
                    }
                    return null
                  })
                }
                {
                  expand.length > 0 && expand.map(_ => {
                    return <TableCell key={_}/>
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows.map((row, i) => (
                <ExpandRow key={i} show={show} row={row} expand={expand} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

function ExpandRow(props) {
  const { row, show, expand } = props
  const [ open, setOpen ] = useState(false)

  const listrows = []
  show.list.map((_, i) => {
    if (i !== 0) {
      listrows.push({ id: i, label: show.labels[i], value: row[_] })
    }
    return _
  })

  return (
    <React.Fragment>
      <TableRow key={row[0]}>
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
            return <TableCell key={_.id}> <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}> {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} </IconButton> </TableCell>
          })
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {
                listrows.map((_) => {
                  return <TextField disabled key={_.id} label={_.label} value={_.value} variant="outlined" style={{ marginTop: "5ch",  marginRight: "10ch" }}/>
                })
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default ExpandTable
