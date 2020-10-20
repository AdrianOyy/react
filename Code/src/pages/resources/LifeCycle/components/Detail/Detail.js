import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/inventoryLifeCycle"
import { L } from '../../../../../utils/lang'
import { useParams } from "react-router-dom"
import dayjs from "dayjs"

function Detail(props) {
  const { onMount } = props
  const { id } = useParams()
  const [ _ID, set_ID ] = useState('')
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
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ LifeCycles, setLifeCycles ] = useState([])

  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('DD-MMM-YYYY HH:mm')
  }

  useEffect(() => {
    onMount('detail')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      if (data && data.data) {
        const {
          _ID, InventoryID, AssetID, RecordCreatedOn, ActionType, ActionDetails,
          SuccessorInventoryID, ActionDate, RespStaff, RespStaffDisplayName,
          Reason, CaseRef,
          createdAt, updatedAt
        } = data.data
        set_ID(_ID)
        setInventoryID(InventoryID)
        setAssetID(AssetID)
        setRecordCreatedOn(RecordCreatedOn)
        setActionType(ActionType)
        setActionDetails(ActionDetails)
        setSuccessorInventoryID(SuccessorInventoryID)
        setActionDate(ActionDate)
        setRespStaff(RespStaff)
        setRespStaffDisplayName(RespStaffDisplayName)
        setReason(Reason)
        setCaseRef(CaseRef)
        setCreatedAt(createdAt)
        setUpdastedAt(updatedAt)
      }
    })
  }, [ id ])

  useEffect(() => {
    const lifeCycleList = [
      {
        id: '_ID', label: L('Ref. ID'), type: 'text',
        disabled: true, readOnly: true, value: _ID
      },
      {
        id: 'InventoryID', label: L('Inventory'), type: 'text',
        disabled: true, readOnly: true, value: InventoryID
      },
      {
        id: 'AssetID', label: L('Asset No'), type: 'text',
        disabled: true, readOnly: true, value: AssetID
      },
      {
        id: 'RecordCreatedOn', label: L('Record Created On'), type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(RecordCreatedOn)
      },
      {
        id: 'ActionType', label: L('Action Type'), type: 'text',
        disabled: true, readOnly: true, value: ActionType
      },
      {
        id: 'ActionDetails', label: L('Action Details'), type: 'text',
        disabled: true, readOnly: true, value: ActionDetails
      },
      {
        id: 'SuccessorInventoryID', label: L('Successor Inventory ID'), type: 'text',
        disabled: true, readOnly: true, value: SuccessorInventoryID
      },
      {
        id: 'ActionDate', label: L('Action Date'), type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(ActionDate)
      },
      {
        id: 'RespStaff', label: L('Resp Staff'), type: 'text',
        disabled: true, readOnly: true, value: RespStaff
      },
      {
        id: 'RespStaffDisplayName', label: L('Resp Staff Display Name'), type: 'text',
        disabled: true, readOnly: true, value: RespStaffDisplayName
      },
      {
        id: 'Reason', label: L('Reason'), type: 'text',
        disabled: true, readOnly: true, value: Reason
      },
      {
        id: 'CaseRef', label: L('Case Ref'), type: 'text',
        disabled: true, readOnly: true, value: CaseRef
      },
      {
        id: 'createdAt', label: L('Created At'), type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(createdAt)
      },
      {
        id: 'updatedAt', label: L('Updated At'), type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(updatedAt)
      },
    ]
    setLifeCycles(lifeCycleList)
  }, [
    _ID,
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
    createdAt,
    updatedAt,
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
      case 'createdAt' :
        setCreatedAt(value)
        break
      case 'updatedAt' :
        setUpdastedAt(value)
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <DetailPage
        formTitle={L('Detail')}
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {LifeCycles}
      />
    </React.Fragment>
  )
}

export default Detail
