import React, { useState, useEffect } from 'react'
import API from '../../../../../api/VMProvisioning.js'
import {
  Grid,
  TablePagination,
  Paper as MuiPaper
} from "@material-ui/core"
import { CommonTable } from '../../../../../components'
import styled from "styled-components"
import { spacing } from "@material-ui/system"
//import envUrl from '../../../../../utils/baseUrl'


const Paper = styled(MuiPaper)(spacing)
const tableName = 'VM Provisioning Request List'


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
    API.list({ limit: rowsPerPage, page: page + 1 })
      .then(({ data }) => {
        setTotal(data.total)
        handleData(data.list)
      })
  }, [ page, rowsPerPage ])

  const handleData = (rawDataList) => {
    const rows = []
    rawDataList.forEach((el) => {
      const rowModel = {
        id: el.id,
        phase: el.phase,
        platform: el.platform,
        hostname: el.hostname,
        resourceReadyDate: el.resourceReadyDate,
        environmentType: el.environmentType,
        networkZone: el.networkZone,
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  // 表头字段列表
  const headCells = [
    { id: 'phase', alignment: 'center', label: 'Phase' },
    { id: 'platform', alignment: 'center', label: 'Platform' },
    { id: 'hostname', alignment: 'center', label: 'Hostname' },
    { id: 'resourceReadyDate', alignment: 'center', label: 'Resource Ready Date' },
    { id: 'environmentType', alignment: 'center', label: 'Environment Type' },
    { id: 'networkZone', alignment: 'center', label: 'Network Zone' },
    { id: 'action', alignment: 'right', label: 'Actions' },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'phase', align: 'center' },
    { field: 'platform', align: 'center' },
    { field: 'hostname', align: 'center' },
    { field: 'resourceReadyDate', align: 'center' },
    { field: 'environmentType', align: 'center' },
    { field: 'networkZone', align: 'center' },
  ]

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Paper>
            <CommonTable
              rows={rows}
              tableName={tableName}
              deleteAPI={API.deleteMany}
              path={path}
              headCells={headCells}
              fieldList={fieldList}
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
