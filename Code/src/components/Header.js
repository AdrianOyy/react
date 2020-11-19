import React, { useEffect, useState, } from "react"
import styled, { withTheme } from "styled-components"
import { getUser } from "../utils/auth"
import { connect } from "react-redux"
import AccountCircle from '@material-ui/icons/AccountCircle'
// import { darken } from "polished";

import {
  // Badge,
  Avatar,
  Grid,
  Hidden,
  // InputBase,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar
} from "@material-ui/core"

import { Menu as MenuIcon } from "@material-ui/icons"

import {
  // Bell,
  // MessageSquare,
  // Search as SearchIcon,
  Power
} from "react-feather"
import { signOut } from "../utils/auth"
import NaviBar from "./NaviBar"
import { getCurrentPage } from "../utils/url"
import menu from "../utils/menu"

const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.header.background};
  color: ${props => props.theme.header.color};
  box-shadow: ${props => props.theme.shadows[1]};
`

const IconButton = styled(MuiIconButton)`
  svg {
    width: 20px;
    height: 20px;
  }
`

// const Indicator = styled(Badge)`
//   .MuiBadge-badge {
//     background: ${props => props.theme.header.indicator.background};
//     color: ${props => props.theme.palette.Common.white};
//   }
// `

function UserMenu() {
  const [ anchorMenu, setAnchorMenu ] = useState(null)
  const user = getUser()

  const toggleMenu = event => {
    setAnchorMenu(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorMenu(null)
  }


  return (
    <React.Fragment>
      <Grid container spacing={2} alignItems={'center'}>
        <Grid item>
          <Avatar alt="" style={{ width: '30px', height: '30px' }}>
            <AccountCircle />
          </Avatar>
        </Grid>
        <Grid item>
          {user ? user.displayName : ''}
        </Grid>
        <IconButton
          aria-owns={anchorMenu ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <Power />
        </IconButton>
      </Grid>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        {/* <MenuItem onClick={closeMenu}>
          Profile
        </MenuItem> */}
        <MenuItem onClick={signOut}>
          Sign out
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

const Header = ({ onDrawerToggle }) => {
  const [ breadcrumbsList, setBreadcrumbsList ] = useState([])
  useEffect(() => {
    const { rootName, pageName, moduleName } = getCurrentPage()
    console.log(rootName, pageName, moduleName)
    const model = [
      {
        title: menu[rootName] ? menu[rootName].name : '',
      },
      {
        title: menu[rootName] && menu[rootName].children[pageName] ? menu[rootName].children[pageName].name : '',
        path: menu[rootName] && menu[rootName].children[pageName] ? (moduleName === 'List' ? '' : menu[rootName].children[pageName].path) : '/'
        // path: '/'
      }
    ]
    console.log(menu)
    if (moduleName !== 'List') {
      model.push({
        title: moduleName
      })
    }
    setBreadcrumbsList(model)
    // eslint-disable-next-line
  }, [ window.location.href ])
  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            {/* <Grid item>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Textarea placeholder="Search topics" />
            </Search>
          </Grid> */}
            <Grid item xs />
            <Grid item>
              {/* <IconButton color="inherit">
                <Indicator badgeContent={3}>
                  <MessageSquare />
                </Indicator>
              </IconButton> */}
              {/* <IconButton color="inherit">
                <Indicator badgeContent={7}>
                  <Bell />
                </Indicator>
              </IconButton> */}
              {/* <LanguageMenu /> */}
              <UserMenu />
            </Grid>
          </Grid>
        </Toolbar>
        <NaviBar breadcrumbsList={breadcrumbsList}/>
      </AppBar>
    </React.Fragment>
  )
}

export default connect()(withTheme(Header))
