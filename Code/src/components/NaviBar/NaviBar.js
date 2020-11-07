import React from "react"
// import {
//   NavLink as RouterNavLink,
// } from "react-router-dom"
import styled from "styled-components"
import {
  Typography,
  // Link,
  Breadcrumbs as MuiBreadcrumbs
} from "@material-ui/core"
import { spacing } from "@material-ui/system"
import { setPage } from "../../redux/actions/pageActions"
import store from "../../redux/store"
import { getCurrentPage } from "../../utils/url"
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

// const NavLink = React.forwardRef((props, ref) => (
//   <RouterNavLink innerRef={ref} {...props} />
// ))

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

export default function NaviBar(props) {
  const {
    breadcrumbsList
  } = props

  const getLinkStyle = (el) => {
    if (!el.path) {
      return {
        userSelect: 'none',
      }
    }
    return {
      userSelect: 'none',
      color: '#2553f4',
      cursor: 'pointer',
    }
  }

  const handleClick = (el) => {
    if (!el.path) return
    const { moduleName } = getCurrentPage()
    // const toListPage = store.getState().pageReducer.currentPage.toListPage
    if (moduleName !== 'List') {
      store.dispatch(
        setPage(
          Object.assign(
            store.getState().pageReducer.currentPage,
            { toListPage: true }
          )
        )
      )
    }
  }
  return (
    <div style={{
      backgroundColor: '#E5EAF0',
      width: '100%',
      height: '2.5rem',
      fontSize: '1.2rem',
      display: "flex",
      alignItems: 'center',
      color: "rgba(0, 0, 0, 0.7)",
      paddingLeft: '25px',
    }}>
      <Breadcrumbs aria-label="Breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
        {
          breadcrumbsList && breadcrumbsList.map((el, i) =>
            <Typography
              style={getLinkStyle(el)}
              onClick={() => handleClick(el)}
              key={i + el.title}
            >
              { el.title }
            </Typography>
          )
        }
      </Breadcrumbs>
    </div>
  )
}
