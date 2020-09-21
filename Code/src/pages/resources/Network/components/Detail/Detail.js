import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/inventory"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';


import {
  Box,
  Collapse,
  Grid,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
  Typography,
  IconButton,
} from '@material-ui/core'
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

function allProps(label, index) {
  return {
    label,
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

const showPolicy = {
  index: 4,
  list: [
    'id', '_ID', 'InventoryID', 'DefGateway', 'SubnetMask', 'ConfigFile',
    'CurVer', 'NxBtVer', 'BlockDHCP', 'MedicalNW', 'NetworkApplied', 'Group'
  ],
  labels: [
    'id', '_ID', 'InventoryID', 'Gateway', 'Subnet', 'Config File',
    'Current Firmware Version', 'Next Boot Firmware Version',
    'DHCP Snooping', 'MedicalNW', 'Network Applied', 'Group'
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
    'id', '_ID', 'Unit Code', 'Slot', 'Port', 'Port Type', 'Outlet ID',
    'Remark of Equipment Port', 'Outlet Status', 'Port Security', 'Port Polarity', 'Port Speed',
    'Duplex', 'VLAN', 'Port Policy Type', 'Port Policy', 'Connecting Inventory'
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
    'id', '_ID', 'EquipPortID', 'Slot', 'Port', 'Requester Team', 'Port Usage', 'Port Assign Status',
    'Port Assign Date', 'Port Assigner ID', 'Port Assigner Display Name', 'Port Teaming Equip',
    'PortTeaming Equip Port', 'Move In Ref', 'Machine IP', 'Machine Host Name',
    'Port Assignment Remarks', 'IP Add Ref'
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

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

  function ExpandTable(props) {
    const { rows, show } = props;
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {
                show && show.labels.map((_, i) => {
                  if (i >= 1 && i <= show.index) {
                    return <TableCell>{_}</TableCell>
                  }
                })
              }
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row) => (
              <DetailRow key={row[0]} show={show} row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  
  function DetailRow(props) {
    const { key, row, show } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    // 不包括id
    const listrows = []
    show.list.map((_, i) => {
      if (i !== 0) {
        listrows.push({ label: show.labels[i], value: row[_] });
      }
    })
  
    return (
      <React.Fragment>
        <TableRow key={key}>
          {
            listrows.map((_, i) => {
              if (i === 0) {
                return <TableCell component="th" scope="row">{_.value}</TableCell>
              } else if (i >= 1 && i < show.index) {
                return <TableCell>{_.value}</TableCell>
              }
            })
          }
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Paper mt={0}>
                <form noValidate autoComplete="off">
                  <Grid container spacing={ 3 }>
                    {
                      listrows.map((_, i) => {
                        return <TextField disabled label={_.label} value={_.value} variant="outlined" style={{ marginTop: "5ch",  marginRight: "10ch" }}/>
                      })
                    }
                  </Grid>
                </form>
              </Paper>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

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
          equipPort.map(_ => {
            tempPortAssignments.push(_.portAssignment);
          })
          setPortAssignments(tempPortAssignments)
        }
        if (powerOutput && powerOutput.length > 0) {
          setPowerOutputs(powerOutput)
        }
        if (equipType && equipType.Type === 'EqNetwork') {
          setShowProps([
            {
              label: 'Network',
              id: `simple-tab-0`,
              'aria-controls': `simple-tabpanel-0`,
            },
            {
              label: 'Assigment',
              id: `simple-tab-1`,
              'aria-controls': `simple-tabpanel-1`,
            },
          ])
        } else {
          setShowProps([
            {
              label: 'Network',
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
        id: 'EquipType', label: 'EquipType', type: 'text',
        disabled: true, readOnly: true, value: EquipType
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
  }, [
    _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
    Rack, RLU, ItemOwner, ServiceStatus, Remark, UnitNo, PortQty, ReqNo,
    DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID,
    createdAt, updatedAt
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
          {/* <Tab label="Network" {...allProps(0)} />
          <Tab label="Assigment" {...allProps(1)} /> */}
          {/* <Tab {...allProps("Network", 0)} />
          <Tab {...allProps("Assigment", 1)} /> */}
          {
            showProps.map(_ => {
              return  <Tab {..._} />;
            })
          }
        </Tabs>
        <TabPanel value={value} index={0}>
          <Typography variant={ 'h3' } gutterBottom>
            Policy
          </Typography>
          <ExpandTable rows={policys} show={showPolicy} />

          <Typography variant={ 'h3' } gutterBottom>
            PowerInput
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="PowerInput">
              <TableHead>
                <TableRow>
                  <TableCell>_ID</TableCell>
                  <TableCell>Power ID</TableCell>
                  <TableCell>Inlet Type</TableCell>
                  <TableCell>Inventory ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {powerInputs.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row._ID}</TableCell>
                    <TableCell>{row.PowerID}</TableCell>
                    <TableCell>{row.InputType}</TableCell>
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
          <ExpandTable rows={equipmentPorts} show={showEquipmentPort} />
          <Typography variant={ 'h3' } gutterBottom>
            Port Assignment
          </Typography>
          <ExpandTable rows={portAssignments} show={showPortAssignment} />
          <Typography variant={ 'h3' } gutterBottom>
            PowerOutput
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="PowerOutput">
              <TableHead>
                <TableRow>
                  <TableCell>_ID</TableCell>
                  <TableCell align="right">Power ID</TableCell>
                  <TableCell align="right">Outlet Type</TableCell>
                  <TableCell align="right">Inventory ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {powerOutputs.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row._ID}</TableCell>
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
