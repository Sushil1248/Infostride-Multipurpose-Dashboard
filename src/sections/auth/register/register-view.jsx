import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; // Import the zodResolver

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { registerSchema } from 'src/lib/validation';

// import { useRouter } from 'src/routes/hooks';

import { Link } from 'react-router-dom';

import { bgGradient } from 'src/theme/css';
import APIUtils from 'src/lib/api/APIUtils';
import AuthService from 'src/lib/api/AuthServices';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import ErrorMessage from 'src/components/shared/errorMessage';
import { useRouter } from 'src/routes/hooks';
import { toast } from 'react-toastify';
import Loader from 'src/layouts/shared/Loader';
import { useRegisterMutation } from 'src/lib/api/queriesAndMutations';
import { Grid } from '@mui/material';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const registerMutation = useRegisterMutation();
  const {isLoading} = registerMutation;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema), // Integrate loginSchema with React Hook Form
  });

  const onSubmit = async (data) => {
    const response = await APIUtils.handleRequest(AuthService.register(data));
    console.table(response); // Handle form submission here
    if(response.code === 200){
      router.push('/auth/login')
      toast.success("Thank you for registering! Please Login.")
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item lg={6} sm={12} xs={12} md={6}>
            <TextField
              name="firstName"
              label="Enter First name"
              sx={{ width: '100%' }}
              {...register('firstName')}
            />
            {errors.firstName && <ErrorMessage message={errors.firstName && errors.firstName.message} />}
          </Grid>

          <Grid item lg={6} sm={12} xs={12} md={6}>
            <TextField
              name="username"
              sx={{ width: '100%' }}
              label="Enter username"
              {...register('username')}
            />
            {errors.username && <ErrorMessage message={errors.username && errors.username.message} />}
          </Grid>

          <Grid item lg={12} sm={12} xs={12} md={12}>
           <TextField
            name="email"
            label="Email address"
            sx={{ width: '100%' }}
            {...register('email')}
          />
          {errors.email && <ErrorMessage message={errors.email && errors.email.message} />}
          </Grid>

      
        {/* Display validation error */}

       
        <Grid item lg={6} sm={12} xs={12} md={6}>
            <TextField
              name="department"
              sx={{ width: '100%' }}
              label="Enter department name ( DME, DTU .... )"
              {...register('department')}
            />
            {errors.department && <ErrorMessage message={errors.department && errors.department.message} />}
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
            <TextField
              name="emp_code"
              sx={{ width: '100%' }}
              label="Email your employee code eg: 45974"
              {...register('emp_code')}
            />
            {errors.emp_code && <ErrorMessage message={errors.emp_code && errors.emp_code.message} />}
            </Grid>

       

       
            <Grid item lg={6} sm={12} xs={12} md={6}>
            <TextField
              name="password"
              label="Password"
              sx={{ width: '100%' }}
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
            {errors.password && <ErrorMessage message={errors.password && errors.password.message} />}
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
            <TextField
              name="confirm_password"
              label="Confirm Password"
              sx={{ width: '100%' }}
              {...register('confirm_password')} // Register form input and apply Zod validation
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setshowConfirmPassword(!showConfirmPassword)} edge="end">
                      <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.confirm_password && <ErrorMessage message={errors.confirm_password && errors.confirm_password.message} />}
            </Grid>
            </Grid>
       

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit" sx={{marginTop: 4}}>
        Register
      </LoadingButton>
    </form>
  );

  return (
    <>
    {
    isLoading ? (
      <Loader type="default" />
    ) : ( 
   <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1, p: 0 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 800,
          }}
        >
          <Typography variant="h4">Register with Infostide</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account? {" "}
            <Link variant="subtitle2" to="/auth/login" className='text-white'>
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

          {renderForm}
        </Card>
      </Stack>
    </Box>
    )}
    </>
  );
}
