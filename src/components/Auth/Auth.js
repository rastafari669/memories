import {Container, Avatar, Paper, Typography,Grid, Button } from '@material-ui/core'
import React,{useState} from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import {GoogleLogin} from 'react-google-login'
import Icon from './icon'
import {useDispatch} from 'react-redux'
import {signin,signup} from '../../actions/auth'

const initialState = {firsName: '', lastName: '',email: '', password:'',comfirmPassword:''}

const Auth = ({history}) => {
    const classes = useStyles();
    const [showPassword, setshowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [isSignUp, setIsSignUp] = useState(false)
    const dispatch = useDispatch()

    

    const handleShowPassword = () => setshowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) =>{
        e.preventDefault();
     

     if(isSignUp){
      dispatch(signup(formData,history))
     }else{
      dispatch(signin(formData,history))
     }
    }

    const handleChange = (e) =>{
      setFormData({...formData,[e.target.name]: e.target.value })
    }

    const switchMode = () =>{
     setIsSignUp((prevIsSignUp) => !prevIsSignUp);
     setshowPassword(false)
    }

    const googleSuccess = async (res) =>{
     const result = res?.profileObj;
     const token = res?.tokenId;

     try {
         dispatch({type: 'AUTH', data: {result,token}})

         history.push('/');
     } catch (error) {
          console.log(error);
     }
    }

    const googleFailure = (error) =>{
        console.log('Google sign in was unsucceful. Try again later');
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon/>
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                  {
                      isSignUp && (
                          <>
                          <Input name='firstName' handleChange={handleChange} label='First Name' autoFocus half/>
                          <Input name='lasttName' handleChange={handleChange} label='Last Name' autoFocus half/>
                          </>
                      )
                  }
                  <Input name='email' label='Email address' handleChange={handleChange} type='email'/>
                  <Input name='password' label='password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                  {isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}
                  </Grid>
                 
                  <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                      {isSignUp ? 'Sign Up' : 'Sign In'}
                  </Button>
                  <GoogleLogin
                  clientId='575769782159-q6sfsctk41crlfvlf5qe54qpsd7tsa7h.apps.googleusercontent.com'
                  render={(renderProps) =>(
                      <Button 
                      className={classes.googleButton} 
                      color='primary' 
                      fullWidth 
                      onClick={renderProps.onClick} 
                      disabled={renderProps.disabled} 
                      startIcon={<Icon/>}
                      variant='contained'
                      >
                      Google Sign In
                      </Button>
                    
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy='single_host_origin'
                  />
                  <Grid type='container' justify='flex-end'>
                      <Grid type='item'>
                          <Button onClick={switchMode}>
                              {isSignUp ? 'Already have an account ? Sign In' : "Don't have an account? Sign Up"}
                          </Button>
                      </Grid>
                  </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
