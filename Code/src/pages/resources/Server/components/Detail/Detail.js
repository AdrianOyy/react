import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import ExpandTable from "../../../../../components/ExpandTable"
import API from "../../../../../api/inventory"
import { L } from '../../../../../utils/lang'
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

const showPolicy = {
  index: 4,
  list: [
    'id', '_ID', 'InventoryID', 'IPAddress', 'DefGateway', 'SubnetMask', 'ConfigFile',
    'CurVer', 'NxBtVer', 'BlockDHCP', 'MedicalNW', 'NetworkApplied', 'Group'
  ],
  labels: [
    L('id'), L('_ID'), L('InventoryID'), L('IP Address'), L('Gateway'), L('Subnet'), L('Config File'),
    L('Current Firmware Version'), L('Next Boot Firmware Version'),
    L('DHCP Snooping'), L('MedicalNW'), L('Network Applied'), L('Group')
  ]
}

const showPowerInput = {
  index: 4,
  list: [
    'id', '_ID', 'PowerID', 'InputType', 'InventoryID',
  ],
  labels: [
    L('id'), L('_ID'), L('Power ID'), L('Inlet Type'), L('InventoryID')
  ]
}

function Detail(props) {
  const { onMount } = props

  const { id } = useParams()
  const [ _ID, set_ID ] = useState('')
  const [ UnitCode, setUnitCode ] = useState('')
  const [ AssetID, setAssetID ] = useState('')
  const [ ModelCode, setModelCode ] = useState('')
  const [ ModelDesc, setModelDesc ] = useState('')
  const [ ClosetID, setClosetID ] = useState('')
  const [ Rack, setRack ] = useState('')
  const [ RLU, setRLU ] = useState('')
  const [ ItemOwner, setItemOwner ] = useState('')
  const [ ServiceStatus, setServiceStatus ] = useState('')
  const [ Remark, setRemark ] = useState('')
  const [ UnitNo, setUnitNo ] = useState('')
  const [ PortQty, setPortQty ] = useState('')
  const [ ReqNo, setReqNo ] = useState('')
  const [ DOB, setDOB ] = useState('')
  const [ DeliveryDate, setDeliveryDate ] = useState('')
  const [ DeliveryNoteReceivedDate, setDeliveryNoteReceivedDate ] = useState('')
  const [ MaintID, setMaintID ] = useState('')
  const [ EquipType, setEquipType ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')

  const [ inventory, setInventory ] = useState([])
  const [ policys, setPolicys ] = useState([])
  const [ powerInputs, setPowerInputs ] = useState([])


  const classes = useStyles()

  useEffect(() => {
    onMount('detail')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      if (data && data.data) {
        const {
          _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
          Rack, RLU, ItemOwner, status, Remark, equipType, UnitNo, PortQty, ReqNo,
          DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID,
          createdAt, updatedAt, policy, powerInput
        } = data.data
        set_ID(_ID)
        setUnitCode(UnitCode)
        setAssetID(AssetID)
        setModelCode(ModelCode)
        setModelDesc(ModelDesc)
        setClosetID(ClosetID)
        setRack(Rack)
        setRLU(RLU)
        setItemOwner(ItemOwner)
        setServiceStatus(status ? status.ServiceStatus : '')
        setRemark(Remark)
        setEquipType(equipType ? equipType.Type : '')
        setUnitNo(UnitNo)
        setPortQty(PortQty)
        setReqNo(ReqNo)
        setDOB(DOB)
        setDeliveryDate(DeliveryDate)
        setDeliveryNoteReceivedDate(DeliveryNoteReceivedDate)
        setMaintID(MaintID)
        setCreatedAt(createdAt)
        setUpdastedAt(updatedAt)
        if (policy && policy.length > 0) {
          setPolicys(policy)
        }
        if (powerInput && powerInput.length > 0) {
          setPowerInputs(powerInput)
        }
      }
    })
  }, [ id ])

  useEffect(() => {
    const inventoryList = [
      {
        id: '_ID', label: L('Ref. ID'), type: 'text',
        disabled: true, readOnly: true, value: _ID
      },
      {
        id: 'UnitCode', label: L('New'), type: 'text',
        disabled: true, readOnly: true, value: UnitCode
      },
      {
        id: 'AssetID', label: L('Asset No'), type: 'text',
        disabled: true, readOnly: true, value: AssetID
      },
      {
        id: 'ModelCode', label: L('Model Code'), type: 'text',
        disabled: true, readOnly: true, value: ModelCode
      },
      {
        id: 'ModelDesc', label: L('Description'), type: 'text',
        disabled: true, readOnly: true, value: ModelDesc
      },
      {
        id: 'ClosetID', label: L('Closet ID'), type: 'text',
        disabled: true, readOnly: true, value: ClosetID
      },
      {
        id: 'Rack', label: L('Cabinet'), type: 'text',
        disabled: true, readOnly: true, value: Rack
      },
      {
        id: 'RLU', label: L('Pos. (U)'), type: 'text',
        disabled: true, readOnly: true, value: RLU
      },
      {
        id: 'ItemOwner', label: L('Item Owner'), type: 'text',
        disabled: true, readOnly: true, value: ItemOwner
      },
      {
        id: 'ServiceStatus', label: L('Status'), type: 'text',
        disabled: true, readOnly: true, value: ServiceStatus
      },
      {
        id: 'Remark', label: L('Remark'), type: 'text',
        disabled: true, readOnly: true, value: Remark
      },
      {
        id: 'EquipType', label: L('EquipType'), type: 'text',
        disabled: true, readOnly: true, value: EquipType
      },
      {
        id: 'UnitNo', label: L('Unit No'), type: 'text',
        disabled: true, readOnly: true, value: UnitNo
      },
      {
        id: 'PortQty', label: L('Built-in Port'), type: 'text',
        disabled: true, readOnly: true, value: PortQty
      },
      {
        id: 'ReqNo', label: L('Req. Form'), type: 'text',
        disabled: true, readOnly: true, value: ReqNo
      },
      {
        id: 'DOB', label: L('DOB'), type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(DOB)
      },
      {
        id: 'DeliveryDate', label: L('Delivery Date'), type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(DeliveryDate)
      },
      {
        id: 'DeliveryNoteReceivedDate', label: L('Delivery Note Received Date'), type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(DeliveryNoteReceivedDate)
      },
      {
        id: 'MaintID', label: L('MaintID'), type: 'text',
        disabled: true, readOnly: true, value: MaintID
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
    setInventory(inventoryList)
  }, [
    _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
    Rack, RLU, ItemOwner, ServiceStatus, Remark, UnitNo, PortQty, ReqNo,
    DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID,
    createdAt, updatedAt, EquipType
  ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case '_ID' :
        set_ID(value)
        break
      case 'UnitCode' :
        setUnitCode(value)
        break
      case 'AssetID' :
        setAssetID(value)
        break
      case 'ModelCode' :
        setModelCode(value)
        break
      case 'ModelDesc' :
        setModelDesc(value)
        break
      case 'ClosetID' :
        setClosetID(value)
        break
      case 'Rack' :
        setRack(value)
        break
      case 'RLU' :
        setRLU(value)
        break
      case 'ItemOwner' :
        setItemOwner(value)
        break
      case 'Status' :
        setServiceStatus(value)
        break
      case 'Remark' :
        setRemark(value)
        break
      case 'UnitNo' :
        setUnitNo(value)
        break
      case 'PortQty' :
        setPortQty(value)
        break
      case 'ReqNo' :
        setReqNo(value)
        break
      case 'DOB' :
        setDOB(value)
        break
      case 'DeliveryDate' :
        setDeliveryDate(value)
        break
      case 'DeliveryNoteReceivedDate' :
        setDeliveryNoteReceivedDate(value)
        break
      case 'MaintID' :
        setMaintID(value)
        break
      case 'EquipType' :
        setEquipType(value)
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Server'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {inventory}
      />
      <div className={classes.root}>
        <ExpandTable
          label={L('Policy')}
          rows={policys}
          show={showPolicy}
        />
        <ExpandTable
          label={L('PowerInput')}
          rows={powerInputs}
          show={showPowerInput}
        />
      </div>
    </React.Fragment>
  )
}

export default Detail
