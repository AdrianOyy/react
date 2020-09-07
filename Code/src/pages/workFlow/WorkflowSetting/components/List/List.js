import React, { useState, useEffect } from 'react'
import API from '../../../../../api/workFlow.js'
import {
  Grid,
  TablePagination,
  Paper as MuiPaper
} from "@material-ui/core"
import { CommonTable } from '../../../../../components'
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import envUrl from '../../../../../utils/baseUrl'
import prefix from '../../../../../utils/prefix'
import CommonTip from "../../../../../components/CommonTip"
import Loading from "../../../../../components/Loading"
import {
  EventAvailable as EventAvailableIcon,
  BorderColorOutlined as BorderColorIcon,
} from "@material-ui/icons"

const createUrl = envUrl.workflow
const createPrefix = prefix.workflow
const Paper = styled(MuiPaper)(spacing)
const tableName = 'List'


function List(props) {

  const { onMount, path } = props

  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)

  // 用于更新面包屑
  useEffect(() => {
    onMount('list')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    API.getProcessDefinitions({ limit: rowsPerPage, page: page + 1 })
      .then(({ data }) => {
        setTotal(data.total)
        handleData(data.list)
      })
  }, [ page, rowsPerPage ])


  const handleData = (rawDataList) => {
    const rows = []
    rawDataList && rawDataList.forEach((el) => {
      const rowModel = {
        id: el.id,
        version: el.version,
        name: el.name,
        deploymentId: el.deploymentId,
        deploymentUrl: el.deploymentUrl,
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  // 表头字段列表
  const headCells = [
    { id: 'id', alignment: 'center', label: 'Model Id' },
    { id: 'version', alignment: 'center', label: 'Version' },
    { id: 'name', alignment: 'center', label: 'Name' },
    { id: 'deploymentId', alignment: 'center', label: 'Deployment Id' },
    { id: 'action', alignment: 'right', label: 'Action' },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'id', align: 'center' },
    { field: 'version', align: 'center' },
    { field: 'name', align: 'center' },
    { field: 'deploymentId', align: 'center' },
  ]

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handlePublish = (event, row) => {
    Loading.show()
    API.getPublishModel(row.id).then(() => {
      CommonTip.success("Success")
      Loading.hide()
      API.getProcessDefinitions({ limit: rowsPerPage, page: page + 1 })
        .then(({ data }) => {
          setTotal(data.total)
          handleData(data.list)
        })
    }).catch(() => {
      Loading.hide()
    })
  }

  const customEdit = (e, row) => {
    window.open(`http://10.231.131.123:3004/openEditor?modelId=${row.id}&token=` + localStorage.getItem("token"))
  }

  // 自定义action
  const actionList = [
    { label: 'edit', icon: <BorderColorIcon />, handleClick: customEdit },
    { label: 'event', icon: <EventAvailableIcon />, handleClick: handlePublish },
  ]

  const customCreate = () => {
    window.open("http://10.231.131.123:3004/create?token=" + localStorage.getItem("token"))
  }

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Paper>
            <CommonTable
              rows={rows}
              tableName={tableName}
              path={path}
              headCells={headCells}
              fieldList={fieldList}
              hideUpdate={true}
              hideDetail={true}
              hideCheckBox={true}
              customCreate={customCreate}
              actionList={actionList}
            />
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
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default List
