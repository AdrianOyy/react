import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/inventory"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';


import {
  Box,
  Collapse,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  IconButton,
} from '@material-ui/core'
import {
  RemoveRedEye as RemoveRedEyeIcon
} from "@material-ui/icons"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function createPolicy(PolicyID, IPAddress, DefGateway, SubnetMask,
  ConfigFile, CurVer, NxBtVer, BlockDHCP, network_applied) {
  return {
    PolicyID, IPAddress, DefGateway, SubnetMask,
    ConfigFile, CurVer, NxBtVer, BlockDHCP, network_applied
  };
}
const policys = [
  createPolicy(1, '127.0.0.1', 'Gateway1', 'Subnet1', 'Config File1', 'Version1', 'NxBtVer1', 'BlockDHCP1', 'network_applied1'),
  createPolicy(2, '0.0.0.0', 'Gateway1', 'Subnet2', 'Config File2', 'Version2', 'NxBtVer2', 'BlockDHCP2', 'network_applied2'),
];

function createPowerInput(InputID, PowerID, InletType, InventoryID) {
  return {
    InputID, PowerID, InletType, InventoryID
  };
}
const powerInputs = [
  createPowerInput(1, 'PowerID1', 'InletType1', 'InventoryID'),
  createPowerInput(2, 'PowerID2', 'InletType2', 'InventoryID'),
];

function createEquipmentPort(
    EquipPortID, InventoryID, SlotID, PortID, PortType, OutletID,
    Remark, PortStatus, PortSecurity, Polarity, PortSpeed,
    Duplex, VLanID, PortPolicyType, PortPolicy, ConnectingInventory
  ) {
  return {
    EquipPortID, InventoryID, SlotID, PortID, PortType, OutletID,
    Remark, PortStatus, PortSecurity, Polarity, PortSpeed,
    Duplex, VLanID, PortPolicyType, PortPolicy, ConnectingInventory
  };
}
const equipmentPorts = [
  createEquipmentPort(
    1, 'InventoryID', 'SlotID1', 'PortID1', 'PortType1', 'OutletID1',
    'Remark1', 'PortStatus1', 'PortSecurity1', 'Polarity1', 'PortSpeed1',
    'Duplex1', 'VLanID1', 'PortPolicyType1', 'PortPolicy1', 'ConnectingInventory1'
  ),
  createEquipmentPort(
    2, 'InventoryID', 'SlotID2', 'PortID2', 'PortType2', 'OutletID2',
    'Remark2', 'PortStatus2', 'PortSecurity2', 'Polarity2', 'PortSpeed2',
    'Duplex2', 'VLanID2', 'PortPolicyType2', 'PortPolicy2', 'ConnectingInventory2'
  ),
];

function createPortAssignment(
  EquipPortID, Slot, Port, RequesterTeam, PortUsage, PortAssignStatus,
  PortAssignDate, PortAssignerID, PortAssignerDisplayName, PortTeamingEquip,
  PortTeamingEquipPort, MoveInRef, MachineIP, MachineHostName,
  PortAssignmentRemarks, IPAddRef
) {
  return {
    EquipPortID, Slot, Port, RequesterTeam, PortUsage, PortAssignStatus,
    PortAssignDate, PortAssignerID, PortAssignerDisplayName, PortTeamingEquip,
    PortTeamingEquipPort, MoveInRef, MachineIP, MachineHostName,
    PortAssignmentRemarks, IPAddRef
  };
}
const portAssignments = [
  createPortAssignment(
    1, 'Slot1', 'Port1', 'RequesterTeam1', 'PortUsage1', 'PortAssignStatus1',
    'PortAssignDate1', 'PortAssignerID1', 'PortAssignerDisplayName1',
    'PortTeamingEquip1', 'PortTeamingEquipPort1', 'MoveInRef1', 'MachineIP1',
    'MachineHostName1', 'PortAssignmentRemarks1', 'IPAddRef1'
  ),
  createPortAssignment(
    2, 'Slot2', 'Port2', 'RequesterTeam2', 'PortUsage2', 'PortAssignStatus2',
    'PortAssignDate2', 'PortAssignerID2', 'PortAssignerDisplayName2',
    'PortTeamingEquip2', 'PortTeamingEquipPort2', 'MoveInRef2', 'MachineIP2',
    'MachineHostName2', 'PortAssignmentRemarks2', 'IPAddRef2'
  ),
];

function createPowerOutput(OutputID, PowerID, OutletType, InventoryID) {
  return {
    OutputID, PowerID, OutletType, InventoryID
  };
}
const powerOutputs = [
  createPowerOutput(1, 'PowerID1', 'OutletType1', 'InventoryID'),
  createPowerOutput(2, 'PowerID2', 'OutletType2', 'InventoryID'),
];

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
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')

  // const [ Slot, setSlot ] = useState('')
  // const [ Port, setPort ] = useState('')
  // const [ RequesterTeam, setRequesterTeam ] = useState('')
  // const [ PortUsage, setPortUsage ] = useState('')
  // const [ PortAssignStatus, setPortAssignStatus ] = useState('')
  // const [ PortAssignDate, setPortAssignDate ] = useState('')
  // const [ PortAssignerID, setPortAssignerID ] = useState('')
  // const [ PortAssignerDisplayName, setPortAssignerDisplayName ] = useState('')
  // const [ PortTeamingEquip, setPortTeamingEquip ] = useState('')
  // const [ PortTeamingEquipPort, setPortTeamingEquipPort ] = useState('')
  // const [ MoveInRef, setMoveInRef ] = useState('')
  // const [ MachineIP, setMachineIP ] = useState('')
  // const [ MachineHostName, setMachineHostName ] = useState('')
  // const [ PortAssignmentRemarks, setPortAssignmentRemarks ] = useState('')
  // const [ IPAddRef, setIPAddRef ] = useState('')

  const [ inventory, setInventory ] = useState([])
  // const [ portAssignment, setPortAssignment ] = useState([])

  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('DD-MMM-YYYY HH:mm')
  }

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const history = useHistory()
  const handleDetail = (_, id, type) => {
    // Type Policy Equipment Port Port Assignment
    // history.push({ pathname: `${path}/detail/${id}` })
  }

  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  
  function createData(name, calories, fat, carbs, protein, price) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        { date: '2020-01-05', customerId: '11091700', amount: 3 },
        { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
      ],
    };
  }
  
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  ];

  useEffect(() => {
    onMount('detail')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      if (data && data.data) {
        console.log(data.data)
        const {
          _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
          Rack, RLU, ItemOwner, status, Remark, UnitNo, PortQty, ReqNo,
          DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID,
          createdAt, updatedAt
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
        setUnitNo(UnitNo)
        setPortQty(PortQty)
        setReqNo(ReqNo)
        setDOB(DOB)
        setDeliveryDate(DeliveryDate)
        setDeliveryNoteReceivedDate(DeliveryNoteReceivedDate)
        setMaintID(MaintID)
        setCreatedAt(createdAt)
        setUpdastedAt(updatedAt)
        // setSlot()
        // setPort()
        // setRequesterTeam()
        // setPortUsage()
        // setPortAssignStatus()
        // setPortAssignDate()
        // setPortAssignerID()
        // setPortAssignerDisplayName()
        // setPortTeamingEquip()
        // setPortTeamingEquipPort()
        // setMoveInRef()
        // setMachineIP()
        // setMachineHostName()
        // setPortAssignmentRemarks()
        // setIPAddRef()
      }
    })
  }, [ id ])

  useEffect(() => {
    const inventoryList = [
      {
        id: '_ID', label: 'Ref. ID', type: 'text',
        disabled: true, readOnly: true, value: _ID
      },
      {
        id: 'UnitCode', label: 'New', type: 'text',
        disabled: true, readOnly: true, value: UnitCode
      },
      {
        id: 'AssetID', label: 'Asset No', type: 'text',
        disabled: true, readOnly: true, value: AssetID
      },
      {
        id: 'ModelCode', label: 'Model Code', type: 'text',
        disabled: true, readOnly: true, value: ModelCode
      },
      {
        id: 'ModelDesc', label: 'Description', type: 'text',
        disabled: true, readOnly: true, value: ModelDesc
      },
      {
        id: 'ClosetID', label: 'Closet ID', type: 'text',
        disabled: true, readOnly: true, value: ClosetID
      },
      {
        id: 'Rack', label: 'Cabinet', type: 'text',
        disabled: true, readOnly: true, value: Rack
      },
      {
        id: 'RLU', label: 'Pos. (U)', type: 'text',
        disabled: true, readOnly: true, value: RLU
      },
      {
        id: 'ItemOwner', label: 'Item Owner', type: 'text',
        disabled: true, readOnly: true, value: ItemOwner
      },
      {
        id: 'ServiceStatus', label: 'Status', type: 'text',
        disabled: true, readOnly: true, value: ServiceStatus
      },
      {
        id: 'Remark', label: 'Remark', type: 'text',
        disabled: true, readOnly: true, value: Remark
      },
      {
        id: 'UnitNo', label: 'Unit No', type: 'text',
        disabled: true, readOnly: true, value: UnitNo
      },
      {
        id: 'PortQty', label: 'Built-in Port', type: 'text',
        disabled: true, readOnly: true, value: PortQty
      },
      {
        id: 'ReqNo', label: 'Req. Form', type: 'text',
        disabled: true, readOnly: true, value: ReqNo
      },
      {
        id: 'DOB', label: 'DOB', type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(DOB)
      },
      {
        id: 'DeliveryDate', label: 'Delivery Date', type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(DeliveryDate)
      },
      {
        id: 'DeliveryNoteReceivedDate', label: 'Delivery Note Received Date', type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(DeliveryNoteReceivedDate)
      },
      {
        id: 'MaintID', label: 'MaintID', type: 'text',
        disabled: true, readOnly: true, value: MaintID
      },
      {
        id: 'createdAt', label: 'Created At', type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(createdAt)
      },
      {
        id: 'updatedAt', label: 'Updated At', type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(updatedAt)
      },
    ]
    setInventory(inventoryList)
    // const portAssignmentList = [
    //   {
    //     id: 'Slot', label: 'Slot', type: 'text',
    //     disabled: true, readOnly: true, value: Slot
    //   },
    //   {
    //     id: 'Port', label: 'Port', type: 'text',
    //     disabled: true, readOnly: true, value: Port
    //   },
    //   {
    //     id: 'RequesterTeam', label: 'RequesterTeam', type: 'text',
    //     disabled: true, readOnly: true, value: RequesterTeam
    //   },
    //   {
    //     id: 'PortUsage', label: 'PortUsage', type: 'text',
    //     disabled: true, readOnly: true, value: PortUsage
    //   },
    //   {
    //     id: 'PortAssignStatus', label: 'PortAssignStatus', type: 'text',
    //     disabled: true, readOnly: true, value: PortAssignStatus
    //   },
    //   {
    //     id: 'PortAssignDate', label: 'PortAssignDate', type: 'text',
    //     disabled: true, readOnly: true, value: PortAssignDate
    //   },
    //   {
    //     id: 'PortAssignerID', label: 'PortAssignerID', type: 'text',
    //     disabled: true, readOnly: true, value: PortAssignerID
    //   },
    //   {
    //     id: 'PortAssignerDisplayName', label: 'PortAssigner Display Name', type: 'text',
    //     disabled: true, readOnly: true, value: PortAssignerDisplayName
    //   },
    //   {
    //     id: 'PortTeamingEquip', label: 'PortTeamingEquip', type: 'text',
    //     disabled: true, readOnly: true, value: PortTeamingEquip
    //   },
    //   {
    //     id: 'PortTeamingEquipPort', label: 'PortTeamingEquipPort', type: 'text',
    //     disabled: true, readOnly: true, value: PortTeamingEquipPort
    //   },
    //   {
    //     id: 'MoveInRef', label: 'MoveInRef', type: 'text',
    //     disabled: true, readOnly: true, value: MoveInRef
    //   },
    //   {
    //     id: 'MachineIP', label: 'MachineIP', type: 'text',
    //     disabled: true, readOnly: true, value: MachineIP
    //   },
    //   {
    //     id: 'MachineHostName', label: 'MachineHostName', type: 'text',
    //     disabled: true, readOnly: true, value: MachineHostName
    //   },
    //   {
    //     id: 'PortAssignmentRemarks', label: 'PortAssignmentRemarks', type: 'text',
    //     disabled: true, readOnly: true, value: PortAssignmentRemarks
    //   },
    //   {
    //     id: 'IPAddRef', label: 'IPAddRef', type: 'text',
    //     disabled: true, readOnly: true, value: IPAddRef
    //   },
    // ]
    // setPortAssignment(portAssignmentList)
  }, [
    _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
    Rack, RLU, ItemOwner, ServiceStatus, Remark, UnitNo, PortQty, ReqNo,
    DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID,
    createdAt, updatedAt
    // ,
    // Slot, Port, RequesterTeam, PortUsage, PortAssignStatus,
    // PortAssignDate, PortAssignerID, PortAssignerDisplayName,
    // PortTeamingEquip, PortTeamingEquipPort, MoveInRef, MachineIP,
    // MachineHostName, PortAssignmentRemarks, IPAddRef
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
      // case 'Slot' :
      //   setSlot(value)
      //   break
      // case 'Port' :
      //   setPort(value)
      //   break
      // case 'RequesterTeam' :
      //   setRequesterTeam(value)
      //   break
      // case 'PortUsage' :
      //   setPortUsage(value)
      //   break
      // case 'PortAssignStatus' :
      //   setPortAssignStatus(value)
      //   break
      // case 'PortAssignDate' :
      //   setPortAssignDate(value)
      //   break
      // case 'PortAssignerID' :
      //   setPortAssignerID(value)
      //   break
      // case 'PortAssignerDisplayName' :
      //   setPortAssignerDisplayName(value)
      //   break
      // case 'PortTeamingEquip' :
      //   setPortTeamingEquip(value)
      //   break
      // case 'PortTeamingEquipPort' :
      //   setPortTeamingEquipPort(value)
      //   break
      // case 'MoveInRef' :
      //   setMoveInRef(value)
      //   break
      // case 'MachineIP' :
      //   setMachineIP(value)
      //   break
      // case 'MachineHostName' :
      //   setMachineHostName(value)
      //   break
      // case 'PortAssignmentRemarks' :
      //   setPortAssignmentRemarks(value)
      //   break
      // case 'IPAddRef' :
      //   setIPAddRef(value)
      //   break
      default:
        break
    }
  }
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Network'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {inventory}
      />
      <div className={classes.root}>
        <Tabs value={value} onChange={handleChange} aria-label="ant example">
          <Tab label="Network" {...a11yProps(0)} />
          <Tab label="Assigment" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {/* <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}

          <Typography variant={ 'h3' } gutterBottom>
            Policy
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="Policy">
              <TableHead>
                <TableRow>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Gateway</TableCell>
                  <TableCell>Subnet</TableCell>
                  <TableCell>Config File</TableCell>
                  <TableCell/>
                  {/* <TableCell align="right">Current Firmware Version</TableCell>
                  <TableCell align="right">Next Boot Firmware Version</TableCell>
                  <TableCell align="right">DHCP Snooping</TableCell>
                  <TableCell align="right">Network Applied</TableCell> */}
                  {/* <TableCell align="right">Actions</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {policys.map((row) => (
                  <TableRow key={row.PolicyID}>
                    <TableCell>{row.IPAddress}</TableCell>
                    <TableCell>{row.DefGateway}</TableCell>
                    <TableCell>{row.SubnetMask}</TableCell>
                    <TableCell>{row.ConfigFile}</TableCell>
                    <TableCell>
                      <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    {/* <TableCell align="right">{row.CurVer}</TableCell>
                    <TableCell align="right">{row.NxBtVer}</TableCell>
                    <TableCell align="right">{row.BlockDHCP}</TableCell>
                    <TableCell align="right">{row.network_applied}</TableCell> */}
                    {/* <TableCell padding="none" align="right">
                      <IconButton aria-label="detail" onClick={(event) => handleDetail(event, row.PolicyID, 'Policy')}>
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant={ 'h3' } gutterBottom>
            PowerInput
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="PowerInput">
              <TableHead>
                <TableRow>
                  <TableCell>Input ID</TableCell>
                  <TableCell>Power ID</TableCell>
                  <TableCell>Inlet Type</TableCell>
                  <TableCell>Inventory ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {powerInputs.map((row) => (
                  <TableRow key={row.InputID}>
                    <TableCell>{row.InputID}</TableCell>
                    <TableCell>{row.PowerID}</TableCell>
                    <TableCell>{row.InletType}</TableCell>
                    <TableCell>{row.InventoryID}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant={ 'h3' } gutterBottom>
            Equipment Port
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="Equipment Port">
              <TableHead>
                <TableRow>
                  <TableCell>Unit Code</TableCell>
                  <TableCell align="right">Slot</TableCell>
                  <TableCell align="right">Port</TableCell>
                  {/* <TableCell align="right">Port Type</TableCell>
                  <TableCell align="right">Outlet ID</TableCell>
                  <TableCell align="right">Remark of Equipment Port</TableCell>
                  <TableCell align="right">Outlet Status</TableCell>
                  <TableCell align="right">Port Security</TableCell>
                  <TableCell align="right">Port Polarity</TableCell>
                  <TableCell align="right">Port Speed</TableCell>
                  <TableCell align="right">Duplex</TableCell>
                  <TableCell align="right">VLAN</TableCell>
                  <TableCell align="right">Port Policy Type</TableCell>
                  <TableCell align="right">Port Policy</TableCell>
                  <TableCell align="right">Connecting Inventory</TableCell> */}
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {equipmentPorts.map((row) => (
                  <TableRow key={row.EquipPortID}>
                    <TableCell>{row.InventoryID}</TableCell>
                    <TableCell align="right">{row.SlotID}</TableCell>
                    <TableCell align="right">{row.PortID}</TableCell>
                    {/* <TableCell align="right">{row.PortType}</TableCell>
                    <TableCell align="right">{row.OutletID}</TableCell>
                    <TableCell align="right">{row.Remark}</TableCell>
                    <TableCell align="right">{row.PortStatus}</TableCell>
                    <TableCell align="right">{row.PortSecurity}</TableCell>
                    <TableCell align="right">{row.Polarity}</TableCell>
                    <TableCell align="right">{row.PortSpeed}</TableCell>
                    <TableCell align="right">{row.Duplex}</TableCell>
                    <TableCell align="right">{row.VLanID}</TableCell>
                    <TableCell align="right">{row.PortPolicyType}</TableCell>
                    <TableCell align="right">{row.PortPolicy}</TableCell>
                    <TableCell align="right">{row.ConnectingInventory}</TableCell> */}
                    <TableCell padding="none" align="right">
                      <IconButton aria-label="detail" onClick={(event) => handleDetail(event, row.InventoryID, 'Equipment Port')}>
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant={ 'h3' } gutterBottom>
            Port Assignment
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="Port Assignment">
              <TableHead>
                <TableRow>
                  <TableCell>Slot</TableCell>
                  <TableCell align="right">Port</TableCell>
                  <TableCell align="right">Requester Team</TableCell>
                  {/* <TableCell align="right">Usage</TableCell>
                  <TableCell align="right">Assign Status</TableCell>
                  <TableCell align="right">Assign Date</TableCell>
                  <TableCell align="right">Assigner ID</TableCell>
                  <TableCell align="right">Assigner Display Name</TableCell>
                  <TableCell align="right">Teaming Equip</TableCell>
                  <TableCell align="right">Teaming Equip Port</TableCell>
                  <TableCell align="right">Move In Ref</TableCell>
                  <TableCell align="right">Machine IP</TableCell>
                  <TableCell align="right">Machine Host Name</TableCell>
                  <TableCell align="right">Remarks</TableCell>
                  <TableCell align="right">IP Add Ref</TableCell> */}
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portAssignments.map((row) => (
                  <TableRow key={row.EquipPortID}>
                    <TableCell>{row.Slot}</TableCell>
                    <TableCell align="right">{row.Port}</TableCell>
                    <TableCell align="right">{row.RequesterTeam}</TableCell>
                    {/* <TableCell align="right">{row.PortUsage}</TableCell>
                    <TableCell align="right">{row.PortAssignStatus}</TableCell>
                    <TableCell align="right">{row.PortAssignDate}</TableCell>
                    <TableCell align="right">{row.PortAssignerID}</TableCell>
                    <TableCell align="right">{row.PortAssignerDisplayName}</TableCell>
                    <TableCell align="right">{row.PortTeamingEquip}</TableCell>
                    <TableCell align="right">{row.PortTeamingEquipPort}</TableCell>
                    <TableCell align="right">{row.MoveInRef}</TableCell>
                    <TableCell align="right">{row.MachineIP}</TableCell>
                    <TableCell align="right">{row.MachineHostName}</TableCell>
                    <TableCell align="right">{row.PortAssignmentRemarks}</TableCell>
                    <TableCell align="right">{row.IPAddRef}</TableCell> */}
                    <TableCell padding="none" align="right">
                      <IconButton aria-label="detail" onClick={(event) => handleDetail(event, row.EquipPortID, 'Port Assignment')}>
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant={ 'h3' } gutterBottom>
            PowerOutput
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="PowerOutput">
              <TableHead>
                <TableRow>
                  <TableCell>Output ID</TableCell>
                  <TableCell align="right">Power ID</TableCell>
                  <TableCell align="right">Outlet Type</TableCell>
                  <TableCell align="right">Inventory ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {powerOutputs.map((row) => (
                  <TableRow key={row.OutputID}>
                    <TableCell>{row.OutputID}</TableCell>
                    <TableCell align="right">{row.PowerID}</TableCell>
                    <TableCell align="right">{row.OutletType}</TableCell>
                    <TableCell align="right">{row.InventoryID}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </div>
    </React.Fragment>
  )
}

export default Detail
