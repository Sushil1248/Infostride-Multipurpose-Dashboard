import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import { createOrEditUserSchema, createOrEditWebsiteSchema } from 'src/lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; // Import the zodResolver
import { toast } from 'react-toastify';
import { Grid,TextField, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import ErrorMessage from 'src/components/shared/errorMessage';
import { LoadingButton } from '@mui/lab';
import { useCreateOrEditWebsite } from 'src/lib/api/queriesAndMutations';


const WebsiteModal = forwardRef(({ visible = false, setVisible, editMode, selectedItem, ...other }, ref) => {

  const createOrEditWebsiteMutation = useCreateOrEditWebsite();
  const { isLoading } = createOrEditWebsiteMutation;

  // forms

  const menuSchemaJson = [
    {
      "id": Math.random().toString(36).substr(2, 9),
      "imgURL": "pages",
      "route": "/pages",
      "label": "Pages",
      "category": false,
      "type": "default"
    },

    {
      "id": Math.random().toString(36).substr(2, 9),
      "imgURL": "dashboard",
      "route": "/dashboard",
      "label": "Dashboard",
      "category": false,
      "type": "default"
    },
    {
      "id": Math.random().toString(36).substr(2, 9),
      "imgURL": "posts",
      "route": "/posts",
      "label": "Posts",
      "category": false,
      "type": "default"
    },
    {
      "id": Math.random().toString(36).substr(2, 9),
      "imgURL": "media",
      "route": "/media",
      "label": "Media",
      "category": false,
      "type": "default"
    },
    {
      "id": Math.random().toString(36).substr(2, 9),
      "imgURL": "plugins",
      "route": "/plugins",
      "label": "plugins",
      "category": false,
      "type": "default"
    }
  ];

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createOrEditWebsiteSchema), // Integrate loginSchema with React Hook Form
  });

  const onWebsiteSubmit = async (data) => {
    try {
      const updateData = {
        id: selectedItem.id || '',
        business_name: getValues('business_name'),
        description: getValues('description'),
        url: getValues('url') || '',
      };
  
      if (data.icon) {
        // @ts-ignore
        updateData.icon = data.icon;
      }
      if (data.icon === '') {
        updateData.icon = '';
      }
      if (!editMode) {
        updateData.menus = menuSchemaJson;
      }
      const updateResponse = await createOrEditWebsiteMutation.mutateAsync(updateData);
      
      console.log(updateResponse);
      if (updateResponse.code === 200) {
        toast.success(updateResponse.data.message);
        setVisible(false);
      }
    } catch (error) {
      toast({ description: 'Website operated Failed!', variant: 'destructive' });
    }
    
    // Return a value here (can be null or undefined)
    return null; // or return undefined;
  };
  



  useEffect(() => {
    if (editMode && selectedItem) {
      setValue('id', selectedItem?.id);
      setValue('business_name', selectedItem?.business_name || '');
      setValue('description', selectedItem?.description);
      setValue('url', selectedItem?.url|| '');
    }
  }, [editMode, selectedItem, setValue])
  const addEditWebsiteForm = (
    <form onSubmit={handleSubmit(onWebsiteSubmit)}>
      <Typography variant='h6' className='pt-4 pb-8'>{editMode ? `Edit User's Information` : ' Add new user'}</Typography>
      <div className="flex flex-col gap-4">
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xs={12} md={12}>
            <TextField
              name="business_name"
              sx={{ width: '100%' }}
              label="Enter Buisness Name"
              {...register('business_name')}
            />
            {errors.business_name && <ErrorMessage message={errors.business_name && errors.business_name.message} />}
          </Grid>

          <Grid item lg={12} sm={12} xs={12} md={12}>
            <TextField
              name="url"
              label="Enter URL"
              sx={{ width: '100%' }}
              {...register('url')}
            />
            {errors.url && <ErrorMessage message={errors.url && errors.url.message} />}
          </Grid>


          <Grid item lg={12} sm={12} xs={12} md={12}>
            <TextField
              name="description"
              multiline
              label="Description"
              placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl suscipit adipiscing bibendum est. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Eu mi bibendum neque egestas congue'
              sx={{ width: '100%' }}
              {...register('description')} // Register form input and apply Zod validation
            />
            {errors.description && <ErrorMessage message={errors.description && errors.description.message} />}
          </Grid>
        </Grid>

      </div>


      <LoadingButton size="large" type="submit" variant="contained" color="inherit" sx={{ marginTop: 4 }} className='w-40 float-right'>
        Save Website
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
          {addEditWebsiteForm}
        </Box>
      </Modal>
    </div>
  );
});

WebsiteModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  editMode: PropTypes.bool,

};

export default WebsiteModal;
