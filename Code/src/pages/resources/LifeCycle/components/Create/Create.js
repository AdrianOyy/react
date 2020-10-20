import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/inventoryLifeCycle"
import { L } from '../../../../../utils/lang'
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/LifeCycleFieldCheck"


function Create(props) {
  const { onMount } = props
  const history = useHistory()
  const [ _ID, set_ID ] = useState('')
  const [ _IDError, set_IDError ] = useState(false)
  const [ _IDHelperText, set_IDHelperText ] = useState('')
  const [ InventoryID, setInventoryID ] = useState('')
  const [ AssetID, setAssetID ] = useState('')
  const [ RecordCreatedOn, setRecordCreatedOn ] = useState('')
  const [ ActionType, setActionType ] = useState('')
  const [ ActionDetails, setActionDetails ] = useState('')
  const [ SuccessorInventoryID, setSuccessorInventoryID ] = useState('')
  const [ ActionDate, setActionDate ] = useState('')
  const [ RespStaff, setRespStaff ] = useState('')
  const [ RespStaffDisplayName, setRespStaffDisplayName ] = useState('')
  const [ Reason, setReason ] = useState('')
  const [ CaseRef, setCaseRef ] = useState('')
  const [ LifeCycles, setLifeCycles ] = useState([])

  const [ saving, setSaving ] = useState(false)
  const [ Inventorys, setInventorys ] = useState([])

  useEffect(() => {
    onMount('create')
    // eslint-disable-next-line
  }, [])

  const handleClick = async () => {
    const _IDError = await _IDCheck()
    if (_IDError || saving) return
    setSaving(true)
    API.create(
      {
        _ID, InventoryID, AssetID, RecordCreatedOn, ActionType, ActionDetails,
        SuccessorInventoryID, ActionDate, RespStaff, RespStaffDisplayName,
        Reason, CaseRef
      }
    )
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/resources/life-cycle' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.listInventorys().then(({ data }) => {
      if (data && data.data) {
        setInventorys(data.data)
      }
    })
  }, [])
  useEffect(() => {
    const lifeCycleList = [
      {
        id: '_ID', label: L('Ref. ID'), type: 'text',
        required: true, readOnly: false, value: _ID,
        error: _IDError, helperText: _IDHelperText
      },
      {
        id: 'InventoryID', label: L('Inventory'), type: 'select',
        value: InventoryID, itemList: Inventorys,
        labelField: '_ID', valueField: '_ID',
      },
      {
        id: 'AssetID', label: L('Asset No'), type: 'text',
        required: false, readOnly: false, value: AssetID
      },
      {
        id: 'RecordCreatedOn', label: L('Record Created On'), type: 'date',
        required: false, readOnly: false, value: RecordCreatedOn
      },
      {
        id: 'ActionType', label: L('Action Type'), type: 'text',
        required: false, readOnly: false, value: ActionType
      },
      {
        id: 'ActionDetails', label: L('Action Details'), type: 'text',
        required: false, readOnly: false, value: ActionDetails
      },
      {
        id: 'SuccessorInventoryID', label: L('Successor Inventory ID'), type: 'text',
        required: false, readOnly: false, value: SuccessorInventoryID
      },
      {
        id: 'ActionDate', label: L('Action Date'), type: 'date',
        required: false, readOnly: false, value: ActionDate
      },
      {
        id: 'RespStaff', label: L('Resp Staff'), type: 'text',
        required: false, readOnly: false, value: RespStaff
      },
      {
        id: 'RespStaffDisplayName', label: L('Resp Staff Display Name'), type: 'text',
        required: false, readOnly: false, value: RespStaffDisplayName
      },
      {
        id: 'Reason', label: L('Reason'), type: 'text',
        required: false, readOnly: false, value: Reason
      },
      {
        id: 'CaseRef', label: L('Case Ref'), type: 'text',
        required: false, readOnly: false, value: CaseRef
      },
    ]
    setLifeCycles(lifeCycleList)
  }, [
    _ID, _IDError, _IDHelperText,
    InventoryID,
    AssetID,
    RecordCreatedOn,
    ActionType,
    ActionDetails,
    SuccessorInventoryID,
    ActionDate,
    RespStaff,
    RespStaffDisplayName,
    Reason,
    CaseRef,
    Inventorys,
  ])
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case '_ID' :
        set_ID(value)
        break
      case 'InventoryID' :
        setInventoryID(value)
        break
      case 'AssetID' :
        setAssetID(value)
        break
      case 'RecordCreatedOn' :
        setRecordCreatedOn(value)
        break
      case 'ActionType' :
        setActionType(value)
        break
      case 'ActionDetails' :
        setActionDetails(value)
        break
      case 'SuccessorInventoryID' :
        setSuccessorInventoryID(value)
        break
      case 'ActionDate' :
        setActionDate(value)
        break
      case 'RespStaff' :
        setRespStaff(value)
        break
      case 'RespStaffDisplayName' :
        setRespStaffDisplayName(value)
        break
      case 'Reason' :
        setReason(value)
        break
      case 'CaseRef' :
        setCaseRef(value)
        break
      default:
        break
    }
  }
  const _IDCheck = async () => {
    const emptyCheck = checkEmpty("Ref. ID", _ID)
    set_IDError(emptyCheck.error)
    set_IDHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, _ID)
      set_IDError(error)
      set_IDHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const onFormFieldBlur = (_, id) => {
    switch (id) {
      case "_ID":
        _IDCheck()
        break
      default:
        break
    }
  }
  return (
    <React.Fragment>
      <DetailPage
        formTitle={L('Life Cycle')}
        onFormFieldChange = {onFormFieldChange}
        onFormFieldBlur = {onFormFieldBlur}
        formFieldList = {LifeCycles}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default Create
