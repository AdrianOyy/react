import React from "react"
import styled from "styled-components"
import { NavLink as RouterNavLink } from "react-router-dom"
import { L } from '../../utils/lang'

import Helmet from 'react-helmet'

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core"

import { spacing } from "@material-ui/system"

import { withStyles } from "@material-ui/core/styles"

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

const Card = styled(MuiCard)(spacing)

const CardContent = styled(MuiCardContent)(spacing)

const Divider = styled(MuiDivider)(spacing)

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

const Paper = styled(MuiPaper)(spacing)

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`

// Data
let id = 0
function createData(name, calories, fat, carbs, protein) {
  id += 1
  return { id, name, calories, fat, carbs, protein }
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
]

function SimpleTableDemo() {
  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          {L('Simple Table')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('A simple example with no frills.')}
        </Typography>
      </CardContent>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{L('Dessert (100g serving)')}</TableCell>
              <TableCell align="right">{L("Calories")}</TableCell>
              <TableCell align="right">{L('Fat (g)')}</TableCell>
              <TableCell align="right">{L('Carbs (g)')}</TableCell>
              <TableCell align="right">{L('Protein (g)')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Card>
  )
}

function CustomizedTableDemo() {
  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          {L('Customized Table')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('Customized Table Des')}
          <code>{L('TableCell')}</code>.
        </Typography>
      </CardContent>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>{L('Dessert (100g serving)')}</CustomTableCell>
              <CustomTableCell align="right">{L("Calories")}</CustomTableCell>
              <CustomTableCell align="right">{L('Fat (g)')}</CustomTableCell>
              <CustomTableCell align="right">{L('Carbs (g)')}</CustomTableCell>
              <CustomTableCell align="right">{L('Protein (g)')}</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <CustomTableRow key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.name}
                </CustomTableCell>
                <CustomTableCell align="right">{row.calories}</CustomTableCell>
                <CustomTableCell align="right">{row.fat}</CustomTableCell>
                <CustomTableCell align="right">{row.carbs}</CustomTableCell>
                <CustomTableCell align="right">{row.protein}</CustomTableCell>
              </CustomTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Card>
  )
}

function SimpleTable() {
  return (
    <React.Fragment>
      <Helmet title={L('Simple Table')} />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Simple Table')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Tables')}
        </Link>
        <Typography>{L('Simple Table')} </Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SimpleTableDemo />
          <CustomizedTableDemo />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default SimpleTable
