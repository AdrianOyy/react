import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/inventory"
import { useParams } from "react-router-dom"
// import dayjs from "dayjs"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/NetworkFieldCheck"

function Detail(props) {
  const { onMount } = props
  const { id } = useParams()
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
  
  const [ saving, setSaving ] = useState(true)
  const [ InventoryStatus, setInventoryStatus ] = useState([])
  const [ EquipTypes, setEquipTypes ] = useState([])

  useEffect(() => {
    onMount('update')
    // eslint-disable-next-line
  }, [])

  const handleClick = async () => {
    const _IDError = await _IDCheck()
    if (_IDError || saving) return
    setSaving(true)
    API.update(id, 
      {
        _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
        Rack, RLU, ItemOwner, Status, Remark, UnitNo, PortQty, ReqNo,
        DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID, EquipType
      }
    )
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: '/resources/network' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      console.log(data.data)
      const {
        _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
        Rack, RLU, ItemOwner, Status, Remark, UnitNo, PortQty, ReqNo,
        DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID, EquipType
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
      setStatus(Status)
      setRemark(Remark)
      setEquipType(EquipType)
      setUnitNo(UnitNo)
      setPortQty(PortQty)
      setReqNo(ReqNo)
      setDOB(DOB)
      setDeliveryDate(DeliveryDate)
      setDeliveryNoteReceivedDate(DeliveryNoteReceivedDate)
      setMaintID(MaintID)
      setSaving(false)
    })
  }, [ id ])

  useEffect(() => {
    API.listStatus({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        setInventoryStatus(data.data)
      }
    })
    API.listEquipType({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        console.log('11111111111111111111')
        setEquipTypes(data.data)
      }
    })
  }, [])

  useEffect(() => {
    const inventoryList = [
      {
        id: '_ID', label: 'Ref. ID', type: 'text',
        required: true, readOnly: false, value: _ID,
        error: _IDError, helperText: _IDHelperText
      },
      {
        id: 'UnitCode', label: 'New', type: 'text',
        required: false, readOnly: false, value: UnitCode
      },
      {
        id: 'AssetID', label: 'Asset No', type: 'text',
        required: false, readOnly: false, value: AssetID
      },
      {
        id: 'ModelCode', label: 'Model Code', type: 'text',
        required: false, readOnly: false, value: ModelCode
      },
      {
        id: 'ModelDesc', label: 'Description', type: 'text',
        required: false, readOnly: false, value: ModelDesc
      },
      {
        id: 'ClosetID', label: 'Closet ID', type: 'text',
        required: false, readOnly: false, value: ClosetID
      },
      {
        id: 'Rack', label: 'Cabinet', type: 'text',
        required: false, readOnly: false, value: Rack
      },
      {
        id: 'RLU', label: 'Pos. (U)', type: 'text',
        required: false, readOnly: false, value: RLU
      },
      {
        id: 'ItemOwner', label: 'Item Owner', type: 'text',
        required: false, readOnly: false, value: ItemOwner
      },
      {
        id: 'Status', label: 'Status', type: 'select',
        value: Status, itemList: InventoryStatus,
        labelField: 'ServiceStatus', valueField: 'id',
      },
      {
        id: 'Remark', label: 'Remark', type: 'text',
        required: false, readOnly: false, value: Remark
      },
      {
        id: 'EquipType', label: 'EquipType', type: 'select',
        value: EquipType, itemList: EquipTypes,
        labelField: 'Type', valueField: 'id',
      },
      {
        id: 'UnitNo', label: 'Unit No', type: 'text',
        required: false, readOnly: false, value: UnitNo
      },
      {
        id: 'PortQty', label: 'Built-in Port', type: 'text',
        required: false, readOnly: false, value: PortQty
      },
      {
        id: 'ReqNo', label: 'Req. Form', type: 'text',
        required: false, readOnly: false, value: ReqNo
      },
      {
        id: 'DOB', label: 'DOB', type: 'date',
        required: false, readOnly: false, value: DOB
      },
      {
        id: 'DeliveryDate', label: 'Delivery Date', type: 'date',
        required: false, readOnly: false, value: DeliveryDate
      },
      {
        id: 'DeliveryNoteReceivedDate', label: 'Delivery Note Received Date', type: 'date',
        required: false, readOnly: false, value: DeliveryNoteReceivedDate
      },
      {
        id: 'MaintID', label: 'MaintID', type: 'text',
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
      const { error, msg } = await checkExist(id, _ID)
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
        formTitle = 'Network'
        onFormFieldChange = {onFormFieldChange}
        onFormFieldBlur = {onFormFieldBlur}
        formFieldList = {inventory}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default Detail
