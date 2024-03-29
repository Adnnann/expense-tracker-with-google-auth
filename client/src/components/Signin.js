import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
//import {GoogleLogin } from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import { makeStyles } from '@material-ui/core';
import { setUserDataToDisplay } from '../features/usersSlice';
import { useDispatch  } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useSigninUserMutation, useSignUpGoogleUserMutation } from '../features/services/userAPI';
import TextFields from '../components/utils/TextFieldsGenerator';
import { fetchCurrencyExchangeRates } from '../features/exchangeRatesSlice';
import {GoogleLogin, useGoogleLogin} from '@react-oauth/google'
import jwtDecode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle',
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  noaccount: {
    margin: 'auto',
    marginBottom: theme.spacing(1),
    marginRight: '0',
  },
  signup: {
    margin: 'auto',
    marginBottom: theme.spacing(1),
  },
}));

const Signin = () => {

  const KEY = process.env.REACT_APP_GOOGLE_KEY;


  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [signInUser, result] = useSigninUserMutation();
  const [signUpGoogleUser, resultGoogleSignUp] = useSignUpGoogleUserMutation();
  
  useEffect(() => {
    if (result.isSuccess || resultGoogleSignUp.isSuccess) {

      dispatch(setUserDataToDisplay(resultGoogleSignUp.data));
      dispatch(fetchCurrencyExchangeRates())
      navigate('/dashboard');
  }
}, [result, resultGoogleSignUp]);

  // send request to server to login user and in case there are errors collect error
  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    signInUser(user);
  };

  // get values from input fields
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const redirectToSignup = () => {
    navigate('/signup');
  };

  const textFields = ['email', 'password'];
  const buttonFunctions = [clickSubmit, redirectToSignup];
  const buttonValues = [values.email, values.password];
  const changeHandler = [handleChange('email'), handleChange('password')];
  const labels = ['Email', 'Password'];
  const id = ['email', 'password'];
  const buttonClasses = Array(2).fill(classes.textField);
  const types = ['email', 'password']


const logIn = (res) => {


const {family_name, 
       given_name, 
       email,
       jti
}  = jwtDecode(res.credential)

      const user = {
        email: email,
        firstName: given_name,
        lastName: family_name,
        password: jti,
      };
      signUpGoogleUser(user)
}
  const errorMessage = (error) => {
    console.log(error);
};

const logOut = () => {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
  .then(auth2.disconnect())
}

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h6' className={classes.tittle}>
          Sign In
        </Typography>

        <TextFields
          fields={textFields}
          values={buttonValues}
          changeHandler={changeHandler}
          labels={labels}
          id={id}
          buttonClasses={buttonClasses}
          buttonFunctions={buttonFunctions}
          types={types}
        />
      
        {
          //display error returned from server
          result.isError && (
            <Typography component='p' color='error'>
              {result.error.data}
            </Typography>)
        }
      </CardContent>

      <CardActions>
      <ButtonGroup   
      orientation="vertical"
        style={{margin:'0 auto'}}>
        <Button
          color='primary'
          variant='contained'
          onClick={clickSubmit}
          className={classes.submit}
          style={{minWidth:"180px", minHeight:"60px"}}
        >
          Login
        </Button>
   
        {/* <GoogleLogin
        clientId={`${KEY}.apps.googleusercontent.com`}
        onSuccess={logIn}
        onFailure={logIn}
        cookiePolicy={'single_host_origin'}
        render={renderProps=>(
             */
            
      /* <Button startIcon={<GoogleIcon/>}
            style={{margin:"0 auto", display:"-ms-flexbox", minHeight:"60px", maxWidth:"200px", backgroundColor:'red'}} color='primary' variant='contained' 
            onClick={renderProps.onClick}>Google Sign In</Button>
        //)} */}
        <GoogleLogin
        referrerpolicy="origin"
         onSuccess={logIn} 
         onError={errorMessage} 
         buttonText="Login" />
      
        
      </ButtonGroup>
      </CardActions>
      

      <CardActions>
        <Typography component='p' className={classes.noaccount}>
          No account?
        </Typography>

        <Typography
          component='p'
          color='primary'
          className={classes.signup}
          onClick={redirectToSignup}
          style={{cursor:"pointer"}}
        >
          SIGN UP
        </Typography>
      
      </CardActions>
     
    </Card>
  );
};

export default Signin;
