import { Common } from "../Common"
import { isEmail } from "../../../regex"
import accountManagementAPI from "../../../../api/accountManagement"
import Api from "../../../../api/diyForm"
import { object2map } from "../../../map2object"
import { DetailActions, UpdateActions } from "../../../../components/HADynamicForm/Components/Actions"
import { Button } from "@material-ui/core"
import { L } from "../../../lang"
import React from "react"
import { CREATE, DETAIL, HA4 } from "../../../variable/stepName"
import { getUser } from "../../../auth"


class NonPersonal extends Common {
  // 特殊字段验证(异步)
  async asyncCheck(field) {
    const { fieldName, required, fieldDisplayName } = field
    if (required && this.isEmpty(fieldName)) {
      const message = `${fieldDisplayName} is required`
      this.parentFieldError.set(fieldName, message)
      return { error: true, message }
    }
    if (fieldName === 'alternaterecipient') {
      if (!isEmail(this.parentData.get('alternaterecipient'))) {
        const message = 'Incorrect Email Address'
        this.parentFieldError.set(fieldName, message)
        return { error: true, message }
      }
    }
    if (fieldName === 'supervisoremailaccount') {
      if (!isEmail(this.parentData.get('supervisoremailaccount'))) {
        const message = 'Incorrect Email Address'
        this.parentFieldError.set(fieldName, message)
        return { error: true, message }
      }
      const { data } = await accountManagementAPI.getUsersByEmails({ emails: [ this.parentData.get('supervisoremailaccount') ] })
      if (!data || !data.data || !data.data[0]) {
        const message = 'User never logged in'
        this.parentFieldError.set(fieldName, message)
        return { error: true, message }
      }
    }
    return { error: false, message: '' }
  }
  async getInitData() {
    const user = getUser()
    const parentInitData = new Map()
    if (user) {
      parentInitData.set('surname', user.cn)
      parentInitData.set('firstname', user.sn)
      parentInitData.set('christianname', user.givenName)
    }
    return { parentInitData }
  }
  shouldContinue(item) {
    console.log('this.stepName=========================this.stepName')
    console.log(this.stepName)
    console.log('this.stepName=========================this.stepName')
    if (this.stepName && this.stepName === CREATE && !item.showOnRequest) return true
    if (this.stepName && this.stepName !== HA4 && item.fieldName === 'emailid') return true
    return false
  }
  getDisabled(item, isParent = false) {
    if (this.stepName === HA4 && item.fieldName === 'emailid') return false
    return isParent ? this.disabledAllParent : this.disabledAllChild
  }
}

class NonPersonalDetail extends NonPersonal {
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

class NonPersonalUpdate extends NonPersonal {
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

export default async function getNonPersonalLogic(props) {
  const { stepName } = props
  switch (stepName) {
    case CREATE:
      return new NonPersonal(props)
    case DETAIL:
      return new NonPersonalDetail(props)
    default:
      return new NonPersonalUpdate(props)
  }
}
