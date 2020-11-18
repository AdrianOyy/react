const create = {
  paper: {
    backgroundColor: '#ecface',
    '#tenant': {
      marginRight: '50%',
    }
  },
  parent: {
    backgroundColor: '#ceadfe',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '14vh'
  },
  button: {
    color: '#f00',
    backgroundColor: '#aaccee',
    marginLeft: '1vw',
    marginRight: '1vw',
  }
}

const T3 = {
  paper: {
    backgroundColor: '#ecface',
    '#tenant': {
      marginRight: '50%',
    }
  },
  parent: {
    backgroundColor: '#ceadfe',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '14vh'
  },
  button: {
    color: '#f00',
    backgroundColor: '#aaccee',
    marginLeft: '1vw',
    marginRight: '1vw',
  }
}

function getVmAllocation(stepName) {
  switch (stepName) {
    case 'T3':
      return T3
    default:
      return create
  }
}

export default getVmAllocation
