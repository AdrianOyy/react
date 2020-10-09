import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import ExpandTable from "../../../../../components/ExpandTable"
import API from "../../../../../api/inventory"
import { L } from '../../../../../utils/lang'
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'


import {
  Box,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

const showPolicy = {
  index: 4,
  list: [
    'id', '_ID', 'InventoryID', 'DefGateway', 'SubnetMask', 'ConfigFile',
    'CurVer', 'NxBtVer', 'BlockDHCP', 'MedicalNW', 'NetworkApplied', 'Group'
  ],
  labels: [
    L('id'), L('_ID'), L('InventoryID'), L('Gateway'), L('Subnet'), L('Config File'),
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

const showEquipmentPort = {
  index: 4,
  list: [
    'id', '_ID', 'InventoryID', 'SlotID', 'PortID', 'PortType', 'OutletID',
    'Remark', 'PortStatus', 'PortSecurity', 'Polarity', 'PortSpeed',
    'Duplex', 'VLanID', 'PortPolicyType', 'PortPolicy', 'ConnectingInventory'
  ],
  labels: [
    L('id'), L('_ID'), L('Unit Code'), L('Slot'), L('Port'), L('Port Type'), L('Outlet ID'),
    L('Remark of Equipment Port'), L('Outlet Status'), L('Port Security'), L('Port Polarity'), L('Port Speed'),
    L('Duplex'), L('VLAN'), L('Port Policy Type'), L('Port Policy'), L('Connecting Inventory'),
  ]
}

const showPortAssignment = {
  index: 4,
  list: [
    'id', '_ID', 'EquipPortID', 'Slot', 'Port', 'RequesterTeam', 'PortUsage', 'PortAssignStatus',
    'PortAssignDate', 'PortAssignerID', 'PortAssignerDisplayName', 'PortTeamingEquip',
    'PortTeamingEquipPort', 'MoveInRef', 'MachineIP', 'MachineHostName',
    'PortAssignmentRemarks', 'IPAddRef'
  ],
  labels: [
    L('id'), L('_ID'), L('EquipPortID'), L('Slot'), L('Port'), L('Requester Team'), L('Port Usage'), L('Port Assign Status'),
    L('Port Assign Date'), L('Port Assigner ID'), L('Port Assigner Display Name'), L('Port Teaming Equip'),
    L('PortTeaming Equip Port'), L('Move In Ref'), L('Machine IP'), L('Machine Host Name'),
    L('Port Assignment Remarks'), L('IP Add Ref'),
  ]
}

const showPowerOutput = {
  index: 4,
  list: [
    'id', '_ID', 'PowerID', 'OutletType', 'InventoryID',
  ],
  labels: [
    L('id'), L('_ID'), L('Power ID'), L('Outlet Type'), L('Inventory ID')
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
  const [ equipmentPorts, setEquipmentPorts ] = useState([])
  const [ portAssignments, setPortAssignments ] = useState([])
  const [ powerInputs, setPowerInputs ] = useState([])
  const [ powerOutputs, setPowerOutputs ] = useState([])

  const [ showProps, setShowProps ] = useState([])

  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('DD-MMM-YYYY HH:mm')
  }

  const classes = useStyles()
  const [ value, setValue ] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

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
          createdAt, updatedAt, policy, equipPort, powerInput, powerOutput
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
        if (equipPort && equipPort.length > 0) {
          setEquipmentPorts(equipPort)
          const tempPortAssignments = []
          equipPort.map((_) => {
            tempPortAssignments.push(_.portAssignment)
            return _
          })
          setPortAssignments(tempPortAssignments)
        }
        if (powerOutput && powerOutput.length > 0) {
          setPowerOutputs(powerOutput)
        }
        if (equipType && equipType.Type === 'EqNetwork') {
          setShowProps([
            {
              label: L('Network'),
              id: `simple-tab-0`,
              'aria-controls': `simple-tabpanel-0`,
            },
            {
              label: L('Assigment'),
              id: `simple-tab-1`,
              'aria-controls': `simple-tabpanel-1`,
            },
          ])
        } else if (
          equipType &&
          (equipType.Type === 'EqUPS' ||
          equipType.Type === 'EqPDU' ||
          equipType.Type === 'EqATS')
        ) {
          setShowProps([
            {
              label: L('Assigment'),
              id: `simple-tab-0`,
              'aria-controls': `simple-tabpanel-0`,
            },
          ])
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
        formTitle = 'Network'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {inventory}
      />
      <div className={classes.root}>
        <Tabs value={value} onChange={handleChange} aria-label="ant example">
          {
            showProps.map(_ => {
              return  <Tab {..._} />
            })
          }
        </Tabs>
        <TabPanel value={value} index={0}>
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
          {
            (EquipType === 'EqUPS' || EquipType === 'EqPDU' || EquipType === 'EqATS') ?
              <ExpandTable
                label={L('PowerOutput')}
                rows={powerOutputs}
                show={showPowerOutput}
              /> : null
          }
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ExpandTable
            label={L('Equipment Port')}
            rows={equipmentPorts}
            show={showEquipmentPort}
          />
          <ExpandTable
            label="Port Assignment"
            rows={portAssignments}
            show={showPortAssignment}
          />
          <ExpandTable
            label="PowerOutput"
            rows={powerOutputs}
            show={showPowerOutput}
          />
        </TabPanel>
      </div>
    </React.Fragment>
  )
}

export default Detail
