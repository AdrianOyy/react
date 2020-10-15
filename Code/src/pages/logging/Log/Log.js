import React, { useEffect, useState } from "react"
import Helmet from "react-helmet"
import {
  Divider as MuiDivider,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  TableCell,
  Button as HAButton,
  Dialog as HADialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core"
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import { SearchBar } from "../../../components"
import API from "../../../api/log"
import formatDateTime from "../../../utils/formatDateTime"
import {
  makeStyles,
  withStyles
} from "@material-ui/core/styles"

const Divider = styled(MuiDivider)(spacing)
const useStyles = makeStyles(() => ({
  paper: {
    width: '100%',
    padding: 0,
    marginTop: '4vh',
  },
  row: {
    '&hover': {
      cursor: 'pointer'
    }
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginLeft: '1vw',
    marginRight: '1vw',
  }
}))
const Row = withStyles({
  root: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})(TableRow)
// 渲染 data
const title = "Log"
const columns = [
  { id: 'page', label: 'Page', width: 15 },
  { id: 'req', label: 'Request Path', width: 50 },
  { id: 'res', label: 'Response Code', width: 15 },
  { id: 'createAt', label: 'Request At', width: 15 },
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Content = withStyles((() => ({
  root: {
    padding: '0 4vw'
  }
})))(DialogContent)

const Dialog = withStyles(() => ({
  paper: {
    minWidth: '65vw',
    minHeight: '90vh'
  },
}))(HADialog)

const Actions = withStyles(() => ({
  root: {
    display: 'flex',
    height: '10vh',
    width: '100%',
    margin: '0',
    padding: '2vh 0',
    justifyContent: 'center',
    alignItems: "center",
  },
}))(DialogActions)

const Button = withStyles((() => ({
  root: {
    width: '5vw',
  }
})))(HAButton)

const Title = withStyles((() => ({
  root: {
    height: '8vh',
    display: 'flex',
    alignItems: 'center',
    maxHeight: '60px',
  }
})))(DialogTitle)

function Detail(props) {
  const {
    open,
    onClose,
    row
  } = props
  const classes = useStyles()
  const getP = (obj, isHeader) => {
    const list = []
    for (const key in obj) {
      if (key !== 'headers' && key !== 'body') {
        list.push({
          key: JSON.stringify(key),
          value: JSON.stringify(obj[key]),
        })
      }
    }
    return (
      <React.Fragment>
        {
          list.map((el, i) => (
            <p
              style={{
                fontFamily: 'Arial',
                fontSize: '14px',
                wordBreak: 'break-all',
                marginLeft: isHeader ? '4em' : '2em',
              }}
              key={el.key + '_' + i}
            >
              {el.key + ': ' + el.value}
            </p>
          ))
        }
      </React.Fragment>
    )
  }
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        TransitionComponent={Transition}
      >
        <Title>Log Detail</Title>
        <Content dividers={true}>
          <article style={{ fontFamily: 'Arial', fontSize: '14px' }}>
            <p style={{ fontSize: '16px' }}><b>Request</b></p>
            <p style={{ fontSize: '14px', marginLeft: '2em' }}>{"\"headers\": {"}</p>
            {
              row.request && getP(row.request.headers, true)
            }
            <p style={{ fontSize: '14px', marginLeft: '2em' }}>{"}"}</p>
            {
              getP(row.request)
            }
            <hr/>
            <p style={{ fontSize: '16px' }}><b>Response</b></p>
            <p style={{ fontSize: '14px', marginLeft: '2em' }}>{"\"headers\": {"}</p>
            {
              row.response && getP(row.response.headers, true)
            }
            <p style={{ fontSize: '14px', marginLeft: '2em' }}>{"}"}</p>
            {
              getP(row.response)
            }
            <p style={{ fontSize: '14px', marginLeft: '2em' }}>{"\"body\": {"}</p>
            {
              row.response && getP(row.response.body, true)
            }
            <p style={{ fontSize: '14px', marginLeft: '2em' }}>{"}"}</p>
          </article>
        </Content>
        <Actions disableSpacing={true}>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={onClose}>
            OK
          </Button>
        </Actions>
      </Dialog>
    </div>
  )
}

export default function List() {
  const classes = useStyles()

  const [ logType, setLogType ] = useState('')
  const [ request, setRequest ] = useState('')
  const [ response, setResponse ] = useState('')
  const [ startDate, setStartDate ] = useState('')
  const [ endDate, setEndDate ] = useState('')
  const [ query, setQuery ] = useState({})
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)
  const [ open, setOpen ] = useState(false)
  const [ row, setRow ] = useState({})

  useEffect(() => {
    API.list({ ...query, limit: rowsPerPage, page: page + 1 })
      .then(response => {
        setTotal(response.data.total)
        handleData(response.data.data)
      })
  }, [ page, rowsPerPage, query ])

  const handleData = (rawDataList) => {
    const rows = []
    rawDataList.forEach((el) => {
      const { id, page, request, response } = el
      const rowModel = {
        id,
        page,
        request,
        response,
        createdAt: formatDateTime(el.createdAt),
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  const searchBarFieldList = [
    // { id: 'logType', label: 'LogType', type: 'text', disabled: false, value: logType },
    { id: 'request', label: 'Request', type: 'text', disabled: false, value: request },
    { id: 'response', label: 'Response', type: 'text', disabled: false, value: response },
    { id: 'startDate', label: 'Start Date', type: 'date', disabled: false, readOnly: false, value: startDate },
    { id: 'endDate', label: 'End Date', type: 'date', disabled: false, readOnly: false, value: endDate },
  ]

  const handleClear = () => {
    setLogType('')
    setRequest('')
    setResponse('')
    setStartDate('')
    setEndDate('')
    setQuery({
      logType: '',
      request: '',
      response: '',
      startDate: '',
      endDate: '',
    })
  }

  const handleSearch = () => {
    setQuery({
      logType,
      request,
      response,
      startDate,
      endDate,
    })
  }

  const handleFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "logType":
        setLogType(value)
        break
      case "request":
        setRequest(value)
        break
      case "response":
        setResponse(value)
        break
      case "startDate":
        setStartDate(value)
        break
      case "endDate":
        setEndDate(value)
        break
      default:
        break
    }
  }

  const handleClick = (row) => {
    setRow(row)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setRow({})
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <React.Fragment>
      <Helmet title={title} />
      <Typography variant="h3" gutterBottom display="inline">
        {title}
      </Typography>
      <Divider my={6} />
      <SearchBar
        onSearchFieldChange={handleFieldChange}
        onSearchButton={handleSearch}
        onClearButton={handleClear}
        fieldList = {searchBarFieldList}
      />
      <Paper className={classes.paper}>
        <Table
          aria-labelledby="tableTitle"
          size={'medium'}
          aria-label="Log List"
        >
          <TableHead>
            <TableRow>
              { columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align ? column.align : 'center'}
                  style={{ width: column.width + 'vw' }}
                >
                  { column.label }
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            { rows && rows.map(row => {
              return (
                <Row
                  className={classes.row}
                  key={row.id}
                  hover
                  role='checkbox'
                  tabIndex={-1}
                  onClick={() => handleClick(row)}
                >
                  <TableCell
                    align={columns[0].align ? columns[0].align : 'center'}
                  >
                    { row.page }
                  </TableCell>
                  <TableCell
                    align={columns[0].align ? columns[0].align : 'center'}
                  >
                    { row.request && row.request.url && row.request.headers && row.request.headers.host && row.request.headers.host + row.request.url.split('?')[0] }
                  </TableCell>
                  <TableCell
                    align={columns[0].align ? columns[0].align : 'center'}
                  >
                    { row.response && row.response.status }
                  </TableCell>
                  <TableCell
                    align={columns[0].align ? columns[0].align : 'center'}
                  >
                    { row.createdAt }
                  </TableCell>
                </Row>
              )
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[ 10, 50, 100 ]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Detail
        open={open}
        row={row}
        onClose={handleClose}
      />
    </React.Fragment>
  )
}
