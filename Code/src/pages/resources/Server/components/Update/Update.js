import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/inventory"
import { useParams } from "react-router-dom"
// import dayjs from "dayjs"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/ServerFieldCheck"
import { L } from '../../../../../utils/lang'
import { map2object } from "../../../../../utils/map2object"

function Detail(props) {
  const { map } = props
  const { id } = useParams()
  const history = useHistory()
  const [ _IDError, set_IDError ] = useState(false)
  const [ _IDHelperText, set_IDHelperText ] = useState('')
  const [ AssetIDError, setAssetIDError ] = useState(false)
  const [ AssetIDHelperText, setAssetIDHelperText ] = useState('')
  const [ ClosetIDError, setClosetIDError ] = useState(false)
  const [ ClosetIDHelperText, setClosetIDHelperText ] = useState('')
  const [ EquipTypeError, setEquipTypeError ] = useState(false)
  const [ EquipTypeHelperText, setEquipTypeHelperText ] = useState('')
  const [ PortQtyError, setPortQtyError ] = useState(false)
  const [ PortQtyHelperText, setPortQtyHelperText ] = useState('')
  const [ inventory, setInventory ] = useState([])
  const [ errors, setErrors ] = useState({})

  const [ saving, setSaving ] = useState(true)

  const handleClick = async () => {
    const _IDError = await _IDCheck()
    const AssetIDError = await AssetIDCheck()
    const ClosetIDError = await ClosetIDCheck()
    const EquipTypeError = await EquipTypeCheck()
    const PortQtyError = await PortQtyCheck()
    if (_IDError || AssetIDError || ClosetIDError || EquipTypeError || PortQtyError || saving) return
    setSaving(true)
    API.update(id,
      map2object(map)
    )
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/resources/server' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.listStatus({ limit: 999, page: 1 }).then(({ data }) => {
      // return data.data
      if (data && data.data) {
        return data.data
      } else {
        return []
      }
    }).then(returnObj => {
      API.listEquipType({ limit: 999, page: 1 }).then(({ data }) => {
        if (data && data.data) {
          return {
            InventoryStatus: returnObj,
            EquipTypes: data.data.filter(_ => {
              return _.Type === 'EqServer'
            }),
          }
        } else {
          return {
            InventoryStatus: returnObj,
            EquipTypes: [],
          }
        }
      }).then(returnObj => {
        API.detail(id).then(({ data }) => {
          const {
            _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
            Rack, RLU, ItemOwner, Status, Remark, UnitNo, PortQty, ReqNo,
            DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID, EquipType
          } = data.data
          setSaving(false)

          const list = [
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
              required: false, readOnly: false, value: AssetID,
              error: AssetIDError, helperText: AssetIDHelperText
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
              required: false, readOnly: false, value: ClosetID,
              error: ClosetIDError, helperText: ClosetIDHelperText
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
              value: Status, itemList: returnObj.InventoryStatus,
              labelField: 'ServiceStatus', valueField: 'id',
            },
            {
              id: 'Remark', label: L('Remark'), type: 'text',
              required: false, readOnly: false, value: Remark
            },
            {
              id: 'EquipType', label: L('EquipType'), type: 'select',
              value: EquipType, itemList: returnObj.EquipTypes,
              labelField: 'Type', valueField: 'id',
              required: true,
              error: EquipTypeError, helperText: EquipTypeHelperText
            },
            {
              id: 'UnitNo', label: L('Unit No'), type: 'text',
              required: false, readOnly: false, value: UnitNo
            },
            {
              id: 'PortQty', label: L('Built-in Port'), type: 'text',
              required: false, readOnly: false, value: PortQty,
              error: PortQtyError, helperText: PortQtyHelperText
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
          list.forEach(_ => {
            map.set(_.id, _.value)
          })
          setInventory(list)
        })
      })
    })
    // eslint-disable-next-line
  }, [ id ])

  useEffect(() => {
    const error = {
      _ID: {
        error: _IDError,
        helperText: _IDHelperText,
      },
      AssetID: {
        error: AssetIDError,
        helperText: AssetIDHelperText,
      },
      ClosetID: {
        error: ClosetIDError,
        helperText: ClosetIDHelperText,
      },
      EquipType: {
        error: EquipTypeError,
        helperText: EquipTypeHelperText,
      },
      PortQty: {
        error: PortQtyError,
        helperText: PortQtyHelperText,
      },
    }
    setErrors(error)
    // eslint-disable-next-line
  }, [ _IDHelperText, AssetIDHelperText, ClosetIDHelperText, EquipTypeHelperText, PortQtyHelperText ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    map.set(id, value)
  }

  const _IDCheck = async () => {
    const emptyCheck = checkEmpty("Ref. ID", map.get("_ID"))
    set_IDError(emptyCheck.error)
    set_IDHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const reg = /^[1-9]\d*$/
      if (!reg.test(map.get("_ID"))) {
        set_IDError(true)
        set_IDHelperText(L('Only accept positive integer'))
        emptyCheck.error = true
      }
    }
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(id, map.get("_ID"))
      set_IDError(error)
      set_IDHelperText(msg)
      emptyCheck.error = error
    }

    return emptyCheck.error
  }

  const AssetIDCheck = async () => {
    let error = false
    if (map.get("AssetID")) {
      const reg = /^[1-9]\d*$/
      if (!reg.test(map.get("AssetID"))) {
        error = true
        setAssetIDError(error)
        setAssetIDHelperText(L('Only accept positive integer'))
      }
    }
    if (!error) {
      setAssetIDError(error)
      setAssetIDHelperText()
    }
    return error
  }

  const ClosetIDCheck = async () => {
    let error = false
    if (map.get("ClosetID")) {
      const reg = /^[1-9]\d*$/
      if (!reg.test(map.get("ClosetID"))) {
        error = true
        setClosetIDError(error)
        setClosetIDHelperText(L('Only accept positive integer'))
      }
    }
    if (!error) {
      setClosetIDError(error)
      setClosetIDHelperText()
    }
    return error
  }

  const EquipTypeCheck = async () => {
    const emptyCheck = checkEmpty("EquipType", map.get("EquipType"))
    setEquipTypeError(emptyCheck.error)
    setEquipTypeHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const PortQtyCheck = async () => {
    let error = false
    if (map.get("PortQty")) {
      const reg = /^(0|\d+)(\.\d+)?$/
      if (!reg.test(map.get("PortQty"))) {
        error = true
        setPortQtyError(error)
        setPortQtyHelperText(L('Only accept positive float'))
      }
    }
    if (!error) {
      setPortQtyError(error)
      setPortQtyHelperText()
    }
    return error
  }

  return (
    <React.Fragment>
      <DetailPage
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {inventory}
        errorFieldList={errors}
        showBtn ={true}
        onBtnClick = {handleClick}
        showRequiredField={true}
      />
    </React.Fragment>
  )
}

export default Detail
