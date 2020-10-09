import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { L } from '../../utils/lang'
import Helmet from 'react-helmet'

import {
  FormControl,
  Input,
  InputLabel,
  Button as MuiButton,
  Paper,
  Typography
} from "@material-ui/core"
import { spacing } from "@material-ui/system"

const Button = styled(MuiButton)(spacing)

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`

function SignUp() {
  return (
    <Wrapper>
      <Helmet title={L('Sign Up')} />
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        {L('Get started')}
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        {L('creatingExperience')}
      </Typography>
      <form>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="name">{L('Name')}</InputLabel>
          <Input id="name" name="name" autoFocus />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="company">{L('Company')}</InputLabel>
          <Input id="company" name="company" />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">{L('Email Address')}</InputLabel>
          <Input id="email" name="email" autoComplete="email" />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">{L('Password')}</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </FormControl>
        <Button
          component={Link}
          to="/"
          fullWidth
          variant="contained"
          color="primary"
          mt={2}
        >
          {L('Sign up')}
        </Button>
      </form>
    </Wrapper>
  )
}

export default SignUp
