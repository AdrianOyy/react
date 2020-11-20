import { Common } from '../Common'
import tenantAPI from "../../../../api/tenant"
import ReactDOM from "react-dom"
import React from 'react'
import ParentSubInfoTemplate from "./ParentSubInfoTemplate"
import { CREATE, DETAIL, T3 } from "../../../variable/stepName"
import Api from "../../../../api/diyForm"
import { map2object, object2map } from "../../../map2object"
import { Button } from "@material-ui/core"
import { L } from "../../../lang"
import { VMT3Actions, UpdateActions, DetailActions } from "../../../../components/HADynamicForm/Components/Actions"
import Loading from "../../../../components/Loading"
import API from "../../../../api/diyForm"
import CommonTip from "../../../../components/CommonTip"
import { CHECKED, SKIP, SUCCESS } from "../../../variable/VMStatus"
import color from "../../../theme/color"

class VM extends Common {
  //  =====================================
  //                  整体
  //  =====================================

  // 插入 Dom
  async insertDom() {
    const { data }  = await tenantAPI.detail(this.parentData.get('tenant'))
    const elId = 'vmAllocation_parent_sub_info'
    const tenant = data.data
    const parentEl = document.getElementById('dynamic_form_parent')
    let nodeContainer = document.getElementById('nodeContainer')
    if (!nodeContainer) {
      nodeContainer = document.createElement('div')
      nodeContainer.id = 'nodeContainer'
      nodeContainer.style.width = '50%'
      nodeContainer.style.height = '100%'
      nodeContainer.style.margin = '0'
      nodeContainer.style.borderTopRightRadius = '0.8em'
      nodeContainer.style.borderBottomRightRadius = '0.8em'
      nodeContainer.style.padding = '1em 2% 1em 2%'
      nodeContainer.style.display = 'flex'
      nodeContainer.style.justifyContent = 'flex-between'
      nodeContainer.style.alignItems = 'center'
      parentEl.appendChild(nodeContainer)
    }
    const oldEl = document.getElementById('vmAllocation_parent_sub_info')
    if (oldEl) {
      ReactDOM.unmountComponentAtNode(nodeContainer)
    }
    if (tenant) {
      const node = (
        <ParentSubInfoTemplate
          {...tenant}
          id = {elId}
        />
      )
      ReactDOM.render(node, nodeContainer)
    }
  }

  //  =====================================
  //                 parent
  //  =====================================
  async onParentFieldChange(fieldName, value) {
    switch (fieldName) {
      case 'tenant':
        this.parentData.set(fieldName, value)
        this.insertDom()
        return value
      default:
        this.parentData.set(fieldName, value)
        return value
    }
  }

  getParentTitle() {
    if (this.stepName === CREATE) return null
    return 'VM Allocation'
  }

  //  =====================================
  //                 child
  //  =====================================

  // 获取子表表格标题
  getChildTableTitle() {
    return 'VM List'
  }

  // 获取子表标题
  getChildFormTitle(index) {
    switch (this.stepName) {
      case CREATE:
        return index === -1 ? 'Add VM' : 'VM Info'
      case T3:
        return index === -1 ? 'Add VM' : 'VM Info'
      default:
        return 'VM Info'
    }
  }

  onChildFieldChange(fieldName, value) {
    switch (fieldName) {
      case 'cpu_request_number':
        onCPUChange(value, this.currentChildrenData)
        break
      default:
        this.currentChildrenData.set(fieldName, value)
    }
  }

  // 获取子表表头字段
  getChildHeaderCellList() {
    const res = [
      { id: 'platform', label: 'Platform', alignment: 'left' },
      { id: 'cpu_request_number', label: 'Cpu Request Number', alignment: 'left' },
      { id: 'ram_request_number', label: 'Ram Request Number', alignment: 'left' },
      { id: 'data_storage_request_number', label: 'Data Storage Request Number', alignment: 'left' },
    ]
    if (this.stepName !== CREATE) {
      res.push({ id: 'status', label: 'Status', alignment: 'left' })
    }
    res.push({ id: 'action', label: 'Actions', alignment: 'left' },)
    return res
  }
}

class VMCreate extends VM {
  // 整体
  async getInitData() {
    const { cpsId } = this.startData
    if (!cpsId) return {}
    const parentInitData = new Map()
    parentInitData.set('tenant', 1)
    parentInitData.set('justification', 'test')

    const childInitData = new Map()
    childInitData.set('application_type', 3)
    childInitData.set('backup_volume', 'test')
    childInitData.set('cpu_request_number', '1')
    childInitData.set('data_storage_request_number', '800')
    childInitData.set('environment_type', 3)
    childInitData.set('network_zone', 3)
    childInitData.set('phase', 'test11')
    childInitData.set('platform', 1)
    childInitData.set('ram_request_number', 8)

    return { parentInitData, childInitData: [ childInitData ], callback: this.insertDom.bind(this) }
  }

  // parent


  // child

}

class VMDetail extends VM {
  // 构造函数
  constructor(props) {
    super(props)
    this.disabledAllParent = true
    this.disabledAllChild = true
    this.hideCheckBox = true
    this.hideDelete = true
    this.hideCreate = true
  }
  // 整体
  async getInitData() {
    const { data } = await Api.detail({ deploymentId: this.deploymentId, pid: this.pid })
    const { parentData, childDataList } = data.data
    let parentInitData
    const childInitData = []
    if (parentData) {
      parentInitData = object2map(parentData)
    }
    if (childDataList && childDataList.length) {
      childDataList.forEach(childData => {
        childInitData.push(object2map(childData))
      })
    }
    return { parentInitData, childInitData, callback: this.insertDom.bind(this) }
  }

  getActions(history) {
    return (
      <DetailActions history={history} logic={this} />
    )
  }
  // parent


  // child
  getChildFormActions(props) {
    const { onClose } = props
    return (
      <>
        <Button
          variant="contained"
          style={{
            width: '5vw',
            marginLeft: '1vw',
            marginRight: '1vw',
            color: '#fff',
            backgroundColor: '#4CAF50',
          }}
          onClick={onClose}>
          {L('OK')}
        </Button>
      </>
    )
  }
}

class VMUpdate extends VM {
  // 构造函数
  constructor(props) {
    super(props)
    this.disabledAllParent = true
    this.disabledAllChild = true
    this.hideCheckBox = true
    this.hideDelete = true
    this.hideCreate = true
  }

  // 整体
  async getInitData() {
    const { data } = await Api.detail({ deploymentId: this.deploymentId, pid: this.pid })
    const { parentData, childDataList } = data.data
    let parentInitData
    const childInitData = []
    if (parentData) {
      parentInitData = object2map(parentData)
    }
    if (childDataList && childDataList.length) {
      childDataList.forEach(childData => {
        childInitData.push(object2map(childData))
      })
    }
    return { parentInitData, childInitData, callback: this.insertDom.bind(this) }
  }

  getActions(history) {
    return (
      <UpdateActions history={history} logic={this} />
    )
  }
}

class VMT3 extends VMUpdate {
  // 构造函数
  constructor(props) {
    super(props)
    this.disabledAllParent = false
    this.disabledAllChild = false
    this.hideCheckBox = false
    this.hideDelete = false
    this.hideCreate = false
  }
  // 整体
  async getInitData() {
    const { data } = await Api.detail({ deploymentId: this.deploymentId, pid: this.pid })
    const { parentData, childDataList } = data.data
    let parentInitData
    const childInitData = []
    if (parentData) {
      parentInitData = object2map(parentData)
    }
    if (childDataList && childDataList.length) {
      // let res = [],
      //   failedRes = [],
      //   failed = false
      childDataList.forEach(childData => {
        if (childData.status === SUCCESS.value) {
          childData.$handled = true
        }
        childInitData.push(object2map(childData))
      })
    }
    return { parentInitData, childInitData, callback: this.insertDom.bind(this) }
  }
  // 整体
  getActions(history) {
    return (
      <VMT3Actions history={history} logic={this} />
    )
  }

  // parent
  // 父表字段数据变更


  // child
  getChildFormActions(props) {
    const { onClose, currentIndex } = props
    const currentChild = this.getCurrentChild(currentIndex)
    const handleCheck = async () => {
      // await handleSave()
      const childData = map2object(currentChild)
      this.formatFormData(childData)
      const form = {
        ...this.getFormData(),
        childData
      }
      Loading.show()
      API.check(form)
        .then(({ data }) => {
          Loading.hide()
          if (data) {
            const fileList = data.data
            let isError = false
            for (const item of fileList) {
              if (item.error) {
                currentChild.set('$handled', false)
                isError = true
                CommonTip.error(item.message)
                break
              }
              currentChild.set('$handled', true)
            }
            if (!isError) {
              CommonTip.success(L('Check successfully'))
              currentChild.set('status', CHECKED.value)
              onClose()
            }
          }
        })
        .catch(() => {
          Loading.hide()
        })
      // setCheckCount(checkCount + 1)
    }
    const handleSkip = async (name) => {
      const currentChild = this.getCurrentChild(currentIndex)
      currentChild.set('$handled', true)
      currentChild.set('status', SKIP.value)
      CommonTip.success(L(`${name} Follow Up Success`))
      onClose && onClose()
    }
    return (
      <>
        {
          currentChild.get('status') !== SUCCESS.value && (
            <>
              <Button
                variant="contained"
                style={{
                  width: '5vw',
                  marginLeft: '1vw',
                  marginRight: '1vw',
                  color: '#fff',
                  backgroundColor: `${color.main.link}`,
                }}
                onClick={handleCheck}>
                {L('Check')}
              </Button>
              <Button
                variant="contained"
                style={{
                  width: '5vw',
                  marginLeft: '1vw',
                  marginRight: '1vw',
                  color: '#fff',
                  backgroundColor: '#2196f3',
                }}
                onClick={() => handleSkip(L('T1'))}>
                {L('T1')}
              </Button>
              <Button
                variant="contained"
                style={{
                  width: '5vw',
                  marginLeft: '1vw',
                  marginRight: '1vw',
                  color: '#fff',
                  backgroundColor: '#2196f3',
                }}
                onClick={() => handleSkip(L('T2'))}>
                {L('T2')}
              </Button>
              <Button
                variant="contained"
                style={{
                  width: '5vw',
                  marginLeft: '1vw',
                  marginRight: '1vw',
                  color: '#fff',
                  backgroundColor: '#2196f3',
                }}
                onClick={() => handleSkip(L('T6'))}>
                {L('T6')}
              </Button>
            </>
          )
        }
        <Button
          variant="contained"
          style={{
            width: '5vw',
            marginLeft: '1vw',
            marginRight: '1vw',
            color: '#333',
            backgroundColor: '#eee',
          }}
          onClick={onClose}>
          {L('Cancel')}
        </Button>
      </>
    )
  }
}

function onCPUChange(value, currentChildrenData) {
  const ramEl = document.getElementById('ram_request_number')
  if (ramEl) {
    ramEl.value = parseInt(value) ? parseInt(value) * 8 : ramEl.value
    currentChildrenData.set('ram_request_number', ramEl.value)
  }
  currentChildrenData.set('cpu_request_number', value)
}

export default async function getVMLogic(props) {
  const { stepName } = props
  switch (stepName) {
    case CREATE:
      return new VMCreate(props)
    case DETAIL:
      return new VMDetail(props)
    case T3:
      return new VMT3(props)
    default:
      return new VMUpdate(props)
  }
}
