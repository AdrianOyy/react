import fontFamily from "../../../fontFamily"

class Common {
  constructor() {
    this.container = {
      backgroundColor: '#fff',
      borderRadius: '1em',
      // minWidth: '40vw',
      width: '85%',
      maxWidth: '1000px',
      minHeight: '60vh',
      padding: '1em 1em 1em 1em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    }
    this.parentTitle = {
      width: '100%',
      padding: '0 0',
      marginBottom: '2em',
      textAlign: 'left',
    }
    this.parent = {
      backgroundColor: '#fff',
      minHeight: '20vh',
      width: '100%',
      padding: '2em 1em',
    }
    this.parentRawData = {
      padding: '0 2em 0 0',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    }
    this.child = {
      marginTop: '10vh',
      minHeight: '20vh',
      width: '100%',
    }
    this.childTable = {}
    this.childForm = {}
    this.childFormTitle = {}
    this.actions = {
      width: '100%',
      marginTop: '5em',
      display: 'flex',
      justifyContent: 'center',
    }
    this.commonElement = {
      root: {
        width: '90%',
        marginBottom: '2em',
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
        '-webkit-user-select': 'none',
        '-moz-user-select': 'none',
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

export default Common
