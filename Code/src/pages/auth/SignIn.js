import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import authAPI from '../../api/auth.js'
import Helmet from 'react-helmet';
import { encryption } from '../../utils/encryption'

import {
  Avatar,
  // Checkbox,
  FormControl,
  // FormControlLabel,
  Input,
  InputLabel,
  Button as MuiButton,
  Paper,
  Snackbar,
  Typography
} from "@material-ui/core";
import { Alert as MuiAlert } from '@material-ui/lab';
import { spacing } from "@material-ui/system";

// import AES from 'crypto-js/aes';
// import Base64 from 'crypto-js/enc-base64';

const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

// const BigAvatar = styled(Avatar)`
//   width: 92px;
//   height: 92px;
//   text-align: center;
//   margin: 0 auto ${props => props.theme.spacing(5)}px;
// `;

const Alert = styled(MuiAlert)(spacing);

function SignIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('info');
  const [message, setMessage] = React.useState('');

  const login =  () => {
    let account = email;
    let pwd = password;

    // let pwd = Base64.stringify(AES.encrypt(password, 'secret key 123'));
    if (account && pwd) {

      authAPI.login({
        username: account,
        password: encryption(pwd)
      }).then(response => {
        if (!response.data.data) {
          setSeverity('error')
          setOpen(true);
          setMessage('Login failed');
        } else {
          localStorage.setItem('token',response.data.data)
          setSeverity('success')
          setOpen(true);
          setMessage('Login success');
          history.push('/dashboard/analytics')
          // console.log(response.data.data)
        }
      })
    } else {
      setSeverity('warning')
      setOpen(true);
      if (!account) {
        setMessage('username is required');
      } else if (!pwd) {
        setMessage('password is required');
      }
    }
  };

  const handleChange = (event, type) => {
    if (type === 'password') {
      setPassword(event.target.value);
    } else if (type === 'email') {
      setEmail(event.target.value);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Wrapper>
      <Helmet title="Sign In" />
      <Avatar
        alt="Logo"
        variant="square"
        style={{ width: '92px', height: '92px', textAlign: 'center', margin: '0 auto', top: '-5px' }}
        src="/static/img/logo/homePage.png"
      />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Welcome to SENSE Platform!
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Sign in to your account to continue
      </Typography>
      <form>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            onChange={(event) => handleChange(event, 'email')}
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            onChange={(event) => handleChange(event, 'password')}
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </FormControl>
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          // component={Link}
          onClick = {login}
          to="#"
          fullWidth
          variant="contained"
          color="primary"
          mb={2}
        >
          Sign in
        </Button>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity={severity} onClose={handleClose}>
            {message}
          </Alert>
        </Snackbar>
        {/* <Button
          component={Link}
          to="/auth/reset-password"
          fullWidth
          color="primary"
        >
          Forgot password
        </Button> */}
      </form>
    </Wrapper>
  );
}

export default SignIn;
