import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'; // Import the zodResolver

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MuiOtpInput } from 'mui-one-time-password-input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { loginSchema } from 'src/lib/validation';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { useLoginMutation } from 'src/lib/api/queriesAndMutations';
import { ERROR_STATUS, SUCCESS_STATUS, RESTRICT_STATUS } from 'src/lib/api/messageAndResponseConstants';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import ErrorMessage from 'src/components/shared/errorMessage';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isAlertMessage, setIsAlertMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [formType, setFormType] = useState('login_form');
  const [remainingTime, setRemainingTime] = useState(120); // 120 seconds = 2 minutes
  const [timerRunning, setTimerRunning] = useState(false);
  const [otp, setOtp] = useState('');
  const loginMutation = useLoginMutation();
  const { isLoading } = loginMutation;
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema), // Integrate loginSchema with React Hook Form
  });

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }

    // Return undefined when timerRunning is false
    return undefined;
  }, [timerRunning]);

  useEffect(() => {
    if (remainingTime === 0) {
      setValue('form_type', 'login_form');
      toast.success('Timer expired! Please generate the code again....');
    }
  }, [remainingTime, setValue]);

  const handleChange = (newValue) => {
    setOtp(newValue);
    setValue('verification_code', newValue);
  }



  const onSubmit = async (data) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      if (response.status === ERROR_STATUS) {
        setError(response.message.field_error, {
          type: 'manual',
          message: response.message.message,
          shouldFocus: true
        });
      }
      if (response.status === RESTRICT_STATUS) {
        setIsAlertMessage(true);
        setAlertMessage(response?.message?.toast_message);
        if (response?.message?.field_error) {
          setError(response.message.field_error, {
            type: 'manual',
            message: response.message.message,
            shouldFocus: true
          });
        }
      }
      if (response?.status === SUCCESS_STATUS) {
        if (response?.data?.email_sent) {
          toast.success(response?.data?.message);
          setFormType('verification_form');
          setValue('form_type', 'verification_form');
          setRemainingTime(120);
          setTimerRunning(true);
        }
        if(response?.data?.login_success){
          toast.success(response?.data?.message);
          localStorage.setItem('token', response?.data?.token)
          router.push('/');
        }
      }

    } catch (error) {
      console.log('An unexpected error occurred:', error);
    }
  };

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  // Display leading zero for single digit seconds
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const renderLoginForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="form_type" value={formType} {...register('form_type')} />
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          {...register('email')} // Register form input and apply Zod validation
        />
        <ErrorMessage message={errors.email && errors.email.message} />
        {/* Display validation error */}
        <TextField
          name="password"
          label="Password"
          {...register('password')} // Register form input and apply Zod validation
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ErrorMessage message={errors.password && errors.password.message} />
        {/* Display validation error */}
      </Stack>

      {isAlertMessage && (
        <Alert variant="filled" severity="error">
          {alertMessage}
        </Alert>
      )}

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit" disabled={isLoading}>
        Login
      </LoadingButton>
    </form>
  );

  const renderVerificationForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="form_type" value={formType} {...register('form_type')} />
      <MuiOtpInput value={otp} onChange={handleChange} length={6} />
      <ErrorMessage message={errors.verification_code && errors.verification_code.message} />
      <LoadingButton sx={{ marginTop: 4 }} fullWidth size="large" type="submit" variant="contained" color="inherit" disabled={isLoading} >
        {remainingTime === 0 ? 'Generate Code' : 'Submit'}
      </LoadingButton>
    </form>
  )

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
      }}
    >
      {formType === 'login_form' && (<Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />)}

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1, p: 0 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: formType === 'login_form' ? 420 : 600,
          }}
        >
          {formType === 'login_form' && (
            <>
              <Typography variant="h4">Sign in to Infostide</Typography>
              <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                Don’t have an account?
                <Link variant="subtitle2" to="/auth/register" >
                  Login
                </Link>
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  fullWidth
                  size="large"
                  color="inherit"
                  variant="outlined"
                  sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                >
                  <Iconify icon="eva:google-fill" color="#DF3E30" />
                </Button>

                <Button
                  fullWidth
                  size="large"
                  color="inherit"
                  variant="outlined"
                  sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                >
                  <Iconify icon="eva:facebook-fill" color="#1877F2" />
                </Button>

                <Button
                  fullWidth
                  size="large"
                  color="inherit"
                  variant="outlined"
                  sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                >
                  <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  OR
                </Typography>
              </Divider>
            </>
          )}

          {formType === 'verification_form' && (
            <>
              <Logo
                sx={{ marginBottom: { xs: 4, md: 4 } }}
              />
              <Typography variant="h4">Verify your Identity</Typography>
              <Typography variant="body1" my={2}>An OTP (One-Time Password) has been sent to your email address. Please check your inbox and enter the OTP below to verify your identity.</Typography>
              <Stack>Your Otp Will Expire in {minutes}:{formattedSeconds}</Stack>
            </>
          )}

          {formType === 'login_form' ? renderLoginForm : renderVerificationForm}
        </Card>
      </Stack>
    </Box>
  );
}
