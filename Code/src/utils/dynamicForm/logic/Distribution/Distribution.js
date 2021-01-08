import { Common } from "../Common"
import Api from "../../../../api/diyForm"
import { object2map } from "../../../map2object"
import { DetailActions, UpdateActions } from "../../../../components/HADynamicForm/Components/Actions"
import { Button } from "@material-ui/core"
import { L } from "../../../lang"
import React from "react"
import { CREATE, HA4, UPDATE } from "../../../variable/stepName"
import ContractItems from "../../../../components/ContractItems/ContractItems"
import { getUser } from "../../../auth"
import { fieldCheck } from "../utils"

const applicant = document.createElement("div")
applicant.id = "headline_applicant's_particulars"
applicant.innerText = "Applicant's Particulars:"
applicant.style.width = '100%'
applicant.style.marginBottom = '1em'
applicant.style.fontSize = '1.8em'


class Distribution extends Common {
  async insertHeadLine() {
    const surname = document.getElementById("element_surname")
    surname && surname.parentElement.insertBefore(applicant, surname)
  }

  onParentFieldChange(fieldName, value) {
    if (fieldName === 'isowner') {
      const target = this.remarkedItem.get('isowner')
      target && target.forEach(fn => {
        const id = 'element_' + fn
        const el = document.getElementById(id)
        el && (el.style.display = value.size ? 'none' : 'block')
      })
      const itemList = this.parentInitDetail.filter(e => e.remark === fieldName)
      itemList && itemList.forEach(item => {
        item.show = !value.size
      })
    }
    this.parentData.set(fieldName, value)
    return value
  }

  getContractList() {
    return [ ContractItems.get('Distribution List Application') ]
  }

  shouldContinue(item) {
    if (item.remark === 'isowner' && this.parentData.get('isowner') && this.parentData.get('isowner').size) {
      return true
    }
    if (this.stepName && this.stepName === CREATE && !item.showOnRequest) return true
    if (this.stepName && this.stepName !== HA4 && item.fieldName === 'distributionlistid') return true
    return false
  }

  async getInitData() {
    const user = getUser()
    const parentInitData = new Map()
    if (user) {
      parentInitData.set('isowner_name', user.cn)
    }
    return { parentInitData }
  }

  getParentTitle() {
    if (this.stepName === CREATE) return null
    return 'Distribution List'
  }

  getDisabled(item, isParent = false) {
    if (this.stepName === HA4 && item.fieldName === 'distributionlistid') return false
    return isParent ? this.disabledAllParent : this.disabledAllChild
  }

  // 特殊字段验证(异步)
  async asyncCheck(field) {
    const emailFieldNameList = [
      'supervisoremailaccount'
    ]
    const phoneFieldNameList = [
      'phoneno',
      'isowner_phoneno'
    ]
    const faxFieldNameList = [
      'faxno'
    ]
    const fieldNameList = {
      emailFieldNameList,
      phoneFieldNameList,
      faxFieldNameList
    }
    return fieldCheck(this, field, fieldNameList)
  }
}

class DistributionDetail extends Distribution {
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

class DistributionUpdate extends Distribution {
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

export default async function getDistributionLogic(props) {
  const { stepName } = props
  switch (stepName) {
    case CREATE:
      return new Distribution(props)
    case UPDATE:
      return new DistributionUpdate(props)
    case HA4:
      return new DistributionUpdate(props)
    default:
      return new DistributionDetail(props)
  }
}
