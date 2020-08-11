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

const createUrl = envUrl.workflow
const Paper = styled(MuiPaper)(spacing)
const tableName = 'Workflow Setting List'


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
        handleData(data.data)
      })
  }, [ page, rowsPerPage ])

  const handleData = (rawDataList) => {
    const rows = []
    rawDataList.forEach((el) => {
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
    { id: 'deploymentUrl', alignment: 'center', label: 'Deployment Url' },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'id', align: 'center' },
    { field: 'version', align: 'center' },
    { field: 'name', align: 'center' },
    { field: 'deploymentId', align: 'center' },
    { field: 'deploymentUrl', align: 'center' },
  ]

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const customCreate = () => {
    window.open(createUrl + "/create?token=" + localStorage.getItem("token"))
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
