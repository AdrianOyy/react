import React, { useState } from "react"
import styled from "styled-components"
import { rgba } from "polished"

import { NavLink as RouterNavLink, withRouter } from "react-router-dom"
import { darken } from "polished"

import PerfectScrollbar from "react-perfect-scrollbar"
import "../vendor/perfect-scrollbar.css"

import { spacing } from "@material-ui/system"
import { getUser } from "../utils/user"
import {
  Avatar,
  Badge,
  Box as MuiBox,
  Chip,
  Collapse,
  Drawer as MuiDrawer,
  Grid,
  List as MuiList,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core"

import { ExpandLess, ExpandMore } from "@material-ui/icons"

// import { green } from "@material-ui/core/colors";

import routes from "../routes/index"
import { authMenu } from "../utils/auth"

// import { Layers } from "react-feather";
const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

const Box = styled(MuiBox)(spacing)

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${props => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`

const List = styled(MuiList)`
  background-color: ${props => props.theme.sidebar.background};
`

const Items = styled.div`
  padding-top: ${props => props.theme.spacing(2.5)}px;
  padding-bottom: ${props => props.theme.spacing(2.5)}px;
`

const Brand = styled(ListItem)`
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props => props.theme.sidebar.header.color};
  background-color: ${props => props.theme.sidebar.header.background};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${props => props.theme.spacing(6)}px;
  padding-right: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
`

// const BrandIcon = styled(Layers)`
//   margin-right: ${props => props.theme.spacing(2)}px;
//   color: ${props => props.theme.sidebar.header.brand.color};
// `;

// const BrandChip = styled(Chip)`
//   background-color: ${green[700]};
//   border-radius: 5px;
//   color: ${props => props.theme.palette.Common.white};
//   font-size: 60%;
//   height: 20px;
//   margin-left: 2px;
//   margin-bottom: 1px;
//   padding: 4px 0;

//   span {
//     padding-left: ${props => props.theme.spacing(1.5)}px;
//     padding-right: ${props => props.theme.spacing(1.5)}px;
//   }
// `;

const Category = styled(ListItem)`
  padding-top: ${props => props.theme.spacing(3)}px;
  padding-bottom: ${props => props.theme.spacing(3)}px;
  padding-left: ${props => props.theme.spacing(6)}px;
  padding-right: ${props => props.theme.spacing(5)}px;
  font-weight: ${props => props.theme.typography.fontWeightRegular};

  svg {
    color: ${props => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &.${props => props.activeClassName} {
    background-color: ${props => darken(0.05, props.theme.sidebar.background)};

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`

const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${props => props.theme.sidebar.color};
    font-size: ${props => props.theme.typography.body1.fontSize}px;
    font-weight: ${props => props.theme.sidebar.category.fontWeight};
    padding: 0 ${props => props.theme.spacing(4)}px;
  }
`

const CategoryIconLess = styled(ExpandLess)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`

const CategoryIconMore = styled(ExpandMore)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`

const Link = styled(ListItem)`
  padding-left: ${props => props.theme.spacing(15)}px;
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-bottom: ${props => props.theme.spacing(2)}px;

  span {
    color: ${props => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover span {
    color: ${props => rgba(props.theme.sidebar.color, 0.9)};
  }

  &.${props => props.activeClassName} {
    background-color: ${props => darken(0.06, props.theme.sidebar.background)};

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`

const LinkText = styled(ListItemText)`
  color: ${props => props.theme.sidebar.color};
  span {
    font-size: ${props => props.theme.typography.body1.fontSize}px;
  }
  margin-top: 0;
  margin-bottom: 0;
`

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${props => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 12px;
  top: 8px;
  background: ${props => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${props => props.theme.sidebar.badge.color};
    padding-left: ${props => props.theme.spacing(2)}px;
    padding-right: ${props => props.theme.spacing(2)}px;
  }
`

const CategoryBadge = styled(LinkBadge)`
  top: 12px;
`

const SidebarSection = styled(Typography)`
  color: ${props => props.theme.sidebar.color};
  padding: ${props => props.theme.spacing(4)}px
    ${props => props.theme.spacing(6)}px ${props => props.theme.spacing(1)}px;
  opacity: 0.9;
  display: block;
`

const SidebarFooter = styled.div`
  background-color: ${props =>
    props.theme.sidebar.footer.background} !important;
  padding: ${props => props.theme.spacing(2.75)}px
    ${props => props.theme.spacing(4)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`

const SidebarFooterText = styled(Typography)`
  color: ${props => props.theme.sidebar.footer.color};
`

const SidebarFooterSubText = styled(Typography)`
  color: ${props => props.theme.sidebar.footer.color};
  font-size: .725rem;
  display: block;
  padding: 1px;
`

const StyledBadge = styled(Badge)`
  margin-right: ${props => props.theme.spacing(1)}px;

  span {
    background-color: ${props => props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${props => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`

function SidebarCategory({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  badge,
  ...rest
}) {
  return (
    <Category {...rest}>
      {icon}
      <CategoryText>{name}</CategoryText>
      {isCollapsable ? (
        isOpen ? (
          <CategoryIconMore />
        ) : (
          <CategoryIconLess />
        )
      ) : null}
      {badge ? <CategoryBadge label={badge} /> : ""}
    </Category>
  )
}

function SidebarLink({ name, to, badge }) {
  return (
    <Link
      button
      dense
      component={NavLink}
      exact
      to={to}
      activeClassName="active"
    >
      <LinkText>{name}</LinkText>
      {badge ? <LinkBadge label={badge} /> : ""}
    </Link>
  )
}

function Sidebar({ classes, staticContext, location, ...rest }) {
  const user = getUser()
  const initOpenRoutes = () => {
    /* Open collapse element that matches current url */
    const pathName = location.pathname

    let _routes = {}

    routes.forEach((route, index) => {
      const isActive = pathName.indexOf(route.path) === 0
      const isOpen = route.open
      const isHome = !!(route.containsHome && pathName === "/")

      _routes = Object.assign({}, _routes, { [index]: isActive || isOpen || isHome })
    })

    return _routes
  }

  const [ openRoutes, setOpenRoutes ] = useState(() => initOpenRoutes())

  const toggle = index => {
    // Collapse all elements
    Object.keys(openRoutes).forEach(
      item => openRoutes[index] || setOpenRoutes(openRoutes => Object.assign({}, openRoutes, { [item]: false }))
    )

    // Toggle selected element
    setOpenRoutes(openRoutes => Object.assign({}, openRoutes, { [index]: !openRoutes[index] }))
  }

  const getSidebarLink = (route, index)  => {
    const { path } = route
    if (authMenu(path)) {
      return (
        <SidebarLink
          key={index}
          name={route.name}
          to={route.path}
          icon={route.icon}
          badge={route.badge}
        />
      )
    }

  }

  return (
    <Drawer variant="permanent" {...rest}>
      <Brand>
        <Avatar
          alt="Logo"
          variant="square"
          style={{ width: '24px', height: '24px', textAlign: 'center', margin: '0', marginRight: '10px' }}
          src="/static/img/logo/sidebar.svg"
        />
        <Box ml={1}>SENSE Platform
          {/* <BrandChip label="PRO" /> */}
        </Box>
      </Brand>
      <Scrollbar>
        <List disablePadding>
          <Items>
            {routes.map((category, index) => (
              <React.Fragment key={index}>
                {category.header ? (
                  <SidebarSection>{category.header}</SidebarSection>
                ) : null}

                {category.children ? (
                  <React.Fragment key={index}>
                    <SidebarCategory
                      isOpen={!openRoutes[index]}
                      isCollapsable={true}
                      name={category.id}
                      icon={category.icon}
                      button={true}
                      onClick={() => toggle(index)}
                    />

                    <Collapse
                      in={openRoutes[index]}
                      timeout="auto"
                      unmountOnExit
                    >
                      {category.children.map((route, index) => (
                        getSidebarLink(route, index)
                      ))}
                    </Collapse>
                  </React.Fragment>
                ) : (
                  <SidebarCategory
                    isCollapsable={false}
                    name={category.id}
                    to={category.path}
                    activeClassName="active"
                    component={NavLink}
                    icon={category.icon}
                    exact
                    badge={category.badge}
                  />
                )}
              </React.Fragment>
            ))}
          </Items>
        </List>
      </Scrollbar>
      <SidebarFooter>
        <Grid container spacing={2}>
          <Grid item>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot"
            >
              <Avatar alt="Lucy Lavender" src="/static/img/avatars/avatar-1.jpg" />
            </StyledBadge>
          </Grid>
          <Grid item>
            <SidebarFooterText variant="body2">
              {user ? user.displayName : ''}
            </SidebarFooterText>
            <SidebarFooterSubText variant="caption">
              UX Designer
            </SidebarFooterSubText>
          </Grid>
        </Grid>
      </SidebarFooter>
    </Drawer>
  )
}

export default withRouter(Sidebar)
