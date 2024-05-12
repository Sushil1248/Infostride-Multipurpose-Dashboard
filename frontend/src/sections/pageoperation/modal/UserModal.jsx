import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import { createOrEditUserSchema } from 'src/lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; // Import the zodResolver
import { toast } from 'react-toastify';
import { Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import ErrorMessage from 'src/components/shared/errorMessage';
import { LoadingButton } from '@mui/lab';
import { useCreateOrEditUser } from 'src/lib/api/queriesAndMutations';


const UserModal = forwardRef(({ visible = false, setVisible, editMode, selectedItem,  ...other }, ref) => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const createOrEditUserMutation = useCreateOrEditUser();
  const { isLoading } = createOrEditUserMutation;
  
  // forms

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createOrEditUserSchema), // Integrate loginSchema with React Hook Form
  });

  const onUserSubmit = async (data) => {
    const response = await createOrEditUserMutation.mutateAsync(data);
    console.table(response); // Handle form submission here
    if (response.code === 200) {
      toast.success(response.data.message);
      setVisible(false)
    }
  };
  useEffect (()=>{
    if(editMode && selectedItem){
      setValue('id', selectedItem?.id)
      setValue('username', selectedItem?.username);
      setValue('password', selectedItem?.password);
      setValue('confirm_password', selectedItem?.password);
      setValue('email', selectedItem?.email);
    }
  },[editMode, selectedItem, setValue])
  const addNewUserForm = (
    <form onSubmit={handleSubmit(onUserSubmit)}>
      <Typography variant='h6' className='pt-4 pb-8'>{editMode ? `Edit User's Information`:' Add new user'}</Typography>
      <div className="flex flex-col gap-4">
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xs={12} md={12}>
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


          <Grid item lg={12} sm={12} xs={12} md={12}>
            <TextField
              name="password"
              label="Password"
              value="Test@1234"
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
          <Grid item lg={12} sm={12} xs={12} md={12}>
            <TextField
              name="confirm_password"
              label="Confirm Password"
              value="Test@1234"
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

      </div>


      <LoadingButton size="large" type="submit" variant="contained" color="inherit" sx={{ marginTop: 4 }} className='w-40 float-right'>
        Add User
      </LoadingButton>
    </form>
  );


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
  };
  return (
    <div>
      <Modal
        open={visible}
        onClose={() => setVisible(!visible)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='rounded-md '
      >
        <Box sx={style}>
          {addNewUserForm}
        </Box>
      </Modal>
    </div>
  );
});

UserModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  editMode: PropTypes.bool,
  
};

export default UserModal;
