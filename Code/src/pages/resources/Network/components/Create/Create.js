import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/inventory"
import { L } from '../../../../../utils/lang'
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/NetworkFieldCheck"


function Create() {
  const history = useHistory()

  const [ _ID, set_ID ] = useState('')
  const [ _IDError, set_IDError ] = useState(false)
  const [ _IDHelperText, set_IDHelperText ] = useState('')
  const [ UnitCode, setUnitCode ] = useState('')
  const [ AssetID, setAssetID ] = useState('')
  const [ ModelCode, setModelCode ] = useState('')
  const [ ModelDesc, setModelDesc ] = useState('')
  const [ ClosetID, setClosetID ] = useState('')
  const [ Rack, setRack ] = useState('')
  const [ RLU, setRLU ] = useState('')
  const [ ItemOwner, setItemOwner ] = useState('')
  const [ Status, setStatus ] = useState('')
  const [ Remark, setRemark ] = useState('')
  const [ UnitNo, setUnitNo ] = useState('')
  const [ PortQty, setPortQty ] = useState('')
  const [ ReqNo, setReqNo ] = useState('')
  const [ DOB, setDOB ] = useState('')
  const [ DeliveryDate, setDeliveryDate ] = useState('')
  const [ DeliveryNoteReceivedDate, setDeliveryNoteReceivedDate ] = useState('')
  const [ MaintID, setMaintID ] = useState('')
  const [ EquipType, setEquipType ] = useState('')
  const [ inventory, setInventory ] = useState([])

  const [ saving, setSaving ] = useState(false)
  const [ InventoryStatus, setInventoryStatus ] = useState([])
  const [ EquipTypes, setEquipTypes ] = useState([])

  const handleClick = async () => {
    const _IDError = await _IDCheck()
    if (_IDError || saving) return
    setSaving(true)
    API.create(
      {
        _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
        Rack, RLU, ItemOwner, Status, Remark, EquipType, UnitNo, PortQty, ReqNo,
        DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID
      }
    )
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/resources/network' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.listStatus({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        setInventoryStatus(data.data)
      }
    })
  }, [])
  useEffect(() => {
    API.listEquipType({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        setEquipTypes(data.data.filter(_ => {
          return _.Type !== 'EqServer'
        }))
      }
    })
  }, [])
  useEffect(() => {
    const inventoryList = [
      {
        id: '_ID', label: L('Ref. ID'), type: 'text',
        required: true, readOnly: false, value: _ID,
        error: _IDError, helperText: _IDHelperText
      },
      {
        id: 'UnitCode', label: L('New'), type: 'text',
        required: false, readOnly: false, value: UnitCode
      },
      {
        id: 'AssetID', label: L('Asset No'), type: 'text',
        required: false, readOnly: false, value: AssetID
      },
      {
        id: 'ModelCode', label: L('Model Code'), type: 'text',
        required: false, readOnly: false, value: ModelCode
      },
      {
        id: 'ModelDesc', label: L('Description'), type: 'text',
        required: false, readOnly: false, value: ModelDesc
      },
      {
        id: 'ClosetID', label: L('Closet ID'), type: 'text',
        required: false, readOnly: false, value: ClosetID
      },
      {
        id: 'Rack', label: L('Cabinet'), type: 'text',
        required: false, readOnly: false, value: Rack
      },
      {
        id: 'RLU', label: L('Pos. (U)'), type: 'text',
        required: false, readOnly: false, value: RLU
      },
      {
        id: 'ItemOwner', label: L('Item Owner'), type: 'text',
        required: false, readOnly: false, value: ItemOwner
      },
      {
        id: 'Status', label: L('Status'), type: 'select',
        value: Status, itemList: InventoryStatus,
        labelField: 'ServiceStatus', valueField: 'id',
      },
      {
        id: 'Remark', label: L('Remark'), type: 'text',
        required: false, readOnly: false, value: Remark
      },
      {
        id: 'EquipType', label: L('EquipType'), type: 'select',
        value: EquipType, itemList: EquipTypes,
        labelField: 'Type', valueField: 'id',
      },
      {
        id: 'UnitNo', label: L('Unit No'), type: 'text',
        required: false, readOnly: false, value: UnitNo
      },
      {
        id: 'PortQty', label: L('Built-in Port'), type: 'text',
        required: false, readOnly: false, value: PortQty
      },
      {
        id: 'ReqNo', label: L('Req. Form'), type: 'text',
        required: false, readOnly: false, value: ReqNo
      },
      {
        id: 'DOB', label: L('DOB'), type: 'date',
        required: false, readOnly: false, value: DOB
      },
      {
        id: 'DeliveryDate', label: L('Delivery Date'), type: 'date',
        required: false, readOnly: false, value: DeliveryDate
      },
      {
        id: 'DeliveryNoteReceivedDate', label: L('Delivery Note Received Date'), type: 'date',
        required: false, readOnly: false, value: DeliveryNoteReceivedDate
      },
      {
        id: 'MaintID', label: L('MaintID'), type: 'text',
        required: false, readOnly: false, value: MaintID
      },
    ]
    setInventory(inventoryList)
  }, [
    _ID, _IDError, _IDHelperText,
    UnitCode,
    AssetID,
    ModelCode,
    ModelDesc,
    ClosetID,
    Rack,
    RLU,
    ItemOwner,
    Status,
    Remark,
    EquipType,
    UnitNo,
    PortQty,
    ReqNo,
    DOB,
    DeliveryDate,
    DeliveryNoteReceivedDate,
    MaintID,
    InventoryStatus,
    EquipTypes
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
        setStatus(value)
        break
      case 'Remark' :
        setRemark(value)
        break
      case 'EquipType' :
        setEquipType(value)
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
        formTitle={L('Network')}
        onFormFieldChange = {onFormFieldChange}
        onFormFieldBlur = {onFormFieldBlur}
        formFieldList = {inventory}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default Create
