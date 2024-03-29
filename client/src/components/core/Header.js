import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  getUserDataToDisplay,
} from '../../features/usersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ButtonGroup, Divider, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';

import Button from '@mui/material/Button';
import { useState } from 'react';
import DropdownMenuButtons from '../utils/DropdownMenuButtons';
import { useSignoutUserMutation } from '../../features/services/userAPI';


const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: 'inline',
  },
  title: {
    padding: `${theme.spacing(5)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  dashboardTitle: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a': {
      color: '#3f4771',
    },
  },
  logo: {
    maxWidth: 80,
  },
  rightButtons: {
    backgroundColor: 'white',
    marginRight: '2px',
    marginTop: '50px',
    textTransform: 'none',
    marginLeft: 'auto',
  },
  welcomeMessage: {
    paddingLeft: '20px',
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signOut, result] = useSignoutUserMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const userDataForDisplaying = useSelector(getUserDataToDisplay);

  useEffect(() => {
    if (result.isSuccess) {
      navigate('/');
    }
  }, [result.isSuccess]);

  const pages = [
    '/',
    '/dashboard',
    '/transactions',
    '/statistics',
    '/editProfile',
    '/editPassword',
    '/deleteAccount',
    '/addNewIncome',
    '/addNewExpense',
    '/editTransaction',
  ];

  const requestedPage = window.location.pathname;

  const open = Boolean(anchorEl);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const editProfile = () => {
    navigate(`editProfile/${userData._id}`);
  };

  const editPassword = () => {
    navigate(`/editPassword/${userDataForDisplaying._id}`);
  };

  const deleteAccount = () => {
    navigate(`/deleteAccount/${userData._id}`);
  };

  const date = new Date();

  const signout = () => {
    signOut();
    navigate('/');
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuButtons = ['Edit Profile', 'Edit Password', 'Delete Account'];
  const menuFunctions = [editProfile, editPassword, deleteAccount];
  return (
    pages.includes(requestedPage) && (
      <AppBar position='static'>
        {userDataForDisplaying?.firstName && (
          <span
            style={{ display: 'block', marginLeft: '10px' }}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <Typography component='p' sx={{ display: { xs: 'block', md: 'none' } }}>
              Hello, {`${userDataForDisplaying.firstName} ${userDataForDisplaying.lastName}`}
            </Typography>
            <Typography
              component='p'
              style={{ fontSize: '9px' }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {dateFormat(date, 'dddd, dd mmmm')}
            </Typography>
          </span>
        )}

        <Toolbar disableGutters>
          <Box
            component='img'
            sx={{
              height:
                window.location.pathname === '/' ||
                window.location.pathname === '/signin' ||
                window.location.pathname === '/signup'
                  ? 64
                  : 38,
              display: { xs: 'none', md: 'block' },
              marginTop: { xs: '4px' },
              marginBottom: { xs: '4px' },
              marginLeft:'30px'
            }}
            alt='Expense tracker'
            src='https://joyofandroid.com/wp-content/uploads/2019/06/monefy-money-manager-best-android-business-expense-tracker-finance-financial-income-list-add-deduct-minus-computer-smartphone.png'
          />
          <br />

          {window.location.pathname === '/signup' || window.location.pathname === '/' ? null : (
            <ButtonGroup style={{ marginLeft: 'auto' }}>
              <DropdownMenuButtons
                buttonLabel='Profile'
                handleOpenMenuButtons={handleOpen}
                menuButtons={menuButtons}
                menuFunctions={menuFunctions}
                open={open}
                handleClose={handleClose}
                anchorEl={anchorEl}
                color='white'
              />
              <Button
                variant='primary'
                onClick={signout}
                style={{ textTransform: 'none', color: 'white' }}
              >
                Signout
              </Button>
            </ButtonGroup>
          )}
        </Toolbar>

        {userDataForDisplaying?.firstName && (
          <span style={{ marginLeft: '10px' }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography variant='h6' sx={{ display: { xs: 'none', md: 'block' } }}>
              Hello, {`${userDataForDisplaying.firstName} ${userDataForDisplaying.lastName}`}
            </Typography>
            <Typography
              component='p'
              style={{ fontSize: '10px', marginBottom:"20px" }}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              {dateFormat(date, 'dddd, dd mmmm')}
            </Typography>
          </span>
        )}
      </AppBar>
    )
  );
};

export default Header;
