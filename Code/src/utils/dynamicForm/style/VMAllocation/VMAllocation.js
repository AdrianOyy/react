import Common from "../Common"
import fontFamily from "../../../fontFamily"

class VMAllocation extends Common {
  constructor(props) {
    super(props)
    this.container = {
      backgroundColor: '#fff',
      borderRadius: '1em',
      minWidth: '50vw',
      minHeight: '60vh',
      padding: '1em 1em 1em 1em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
    this.parent = {
      backgroundColor: '#F2F5F8',
      minHeight: '21em',
      border: '1px solid #E5E5E5',
      borderRadius: '0.8em',
      width: '60%',
      display: 'flex',
    }
    this.parentRawData = {
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      borderTopLeftRadius: '0.8em',
      borderBottomLeftRadius: '0.8em',
      justifyContent: 'flex-between',
      width: '50%',
      margin: 0,
      padding: '2em 0 0 2%',
    }
    this.justification = {
      root: {
        width: '90%',
        marginBottom: '1em',
      },
      label: {
        fontSize: '1.2em',
        color: 'rgba(0,0,0,.85)',
        '-webkit-user-select': 'none',
        '-moz-user-select': 'none',
      },
      input: {
      },
      helperText: {
        color: '#f44336',
        height: '1vh',
        lineHeight: '1vh',
        fontSize: '1em',
        fontFamily,
        marginTop: '0.5em',
      }
    }
  }

}

export default VMAllocation
