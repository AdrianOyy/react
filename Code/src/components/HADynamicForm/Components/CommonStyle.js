import { fade } from "@material-ui/core/styles"
import fontFamily from "../../../utils/fontFamily"

function getCommonStyle(theme, style, error, helperText, disabled = false) {
  return {
    root: Object.assign({
      // padding: `0 0 ${error && helperText ? '0' : '1vh'} 0`,
      maxWidth: '300px',
      boxSizing: 'border-box',
      height: '5.5em',
      marginBottom: '2.5em',
    }, style ? style.root : {}),
    label: Object.assign({}, style ? style.label : {}),
    input: Object.assign({
      borderRadius: 4,
      width: '100%',
      // maxWidth: '50vw',
      height: '33px',
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      transition: theme.transitions.create([ 'border-color', 'box-shadow' ]),
      color: disabled ? 'rgba(196, 196, 196, 0.8)' : 'black',
      fontSize: 16,
      marginTop: '0.5em',
      padding: '0px 26px 0px 12px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: error ? theme.palette.error.main : (disabled ? '#dedede' : '#ccc'),
      fontFamily,
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        outline: 'none',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      }
    }, style ? style.input : {}),
    inputCheck: Object.assign({
      padding: '0',
      width: '2em',
      height: '33px',
      color: '#fff',
      backgroundColor: '#2553F4',
      '&:hover': {
        backgroundColor: '#2196f3',
      },
    }, style ? style.inputCheck : {}),
    textarea: Object.assign({
      borderRadius: 4,
      width: '100%',
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      transition: theme.transitions.create([ 'border-color', 'box-shadow' ]),
      color: disabled ? 'rgba(196, 196, 196, 0.8)' : 'black',
      fontSize: 16,
      marginTop: '0.5em',
      padding: '0px 26px 0px 12px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: error ? theme.palette.error.main : (disabled ? '#dedede' : '#ccc'),
      fontFamily,
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        outline: 'none',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      }
    }, style ? style.textarea : {}),
    helperText: Object.assign({}, style ? style.helperText : {})
  }
}

export default getCommonStyle
