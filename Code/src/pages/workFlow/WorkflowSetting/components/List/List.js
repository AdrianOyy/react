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
import { useHistory } from 'react-router-dom'
import { getUrl } from '../../../../../utils/user'
import prefix from '../../../../../utils/prefix'
import CommonTip from "../../../../../components/CommonTip"
import Loading from "../../../../../components/Loading"
import { L } from '../../../../../utils/lang'
import {
  EventAvailable as EventAvailableIcon,
  BorderColorOutlined as BorderColorIcon,
  Settings as SettingsIcon,
} from "@material-ui/icons"

const createPrefix = prefix.workflow
const Paper = styled(MuiPaper)(spacing)
const tableName = L('List')



function List(props) {

  const { onMount, path } = props
  const history = useHistory()
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
    { id: 'id', alignment: 'center', label: L('Model Id') },
    { id: 'version', alignment: 'center', label: L('Version') },
    { id: 'name', alignment: 'center', label: L('Name') },
    { id: 'deploymentId', alignment: 'center', label: L('Deployment Id') },
    { id: 'action', alignment: 'right', label: L('Action') },
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
      CommonTip.success(L('Success'))
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
    window.open(getUrl() + `${createPrefix}/openEditor?modelId=${row.id}&token=` + localStorage.getItem("token"))
  }

  const handleSetting = (event, row) => {
    history.push({ pathname: `/detail/${row.id}`, search: `name=${row.name}` })
  }

  // 自定义action
  const actionList = [
    { label: L('edit'), icon: <BorderColorIcon />, handleClick: customEdit },
    { label: L('setting'), icon: <SettingsIcon />, handleClick: handleSetting },
    { label: L('event'), icon: <EventAvailableIcon />, handleClick: handlePublish },
  ]

  const customCreate = () => {
    window.open(getUrl() + createPrefix + "/create?token=" + localStorage.getItem("token"))
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
