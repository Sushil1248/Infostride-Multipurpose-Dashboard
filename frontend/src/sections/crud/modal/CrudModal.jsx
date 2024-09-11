import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import { createValidationSchema } from '../helper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Checkbox, Grid, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { LoadingButton } from '@mui/lab';
import { useCreateOrEditUser } from 'src/lib/api/queriesAndMutations';
import { deleteImageFromCloudinary, uploadImageToCloudinary } from '../helper/cloudinary';

const CrudModal = forwardRef(({ visible = false, setVisible, formItems, editMode, selectedItem, ...other }, ref) => {

  const [showPassword, setShowPassword] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});
  const [imageUrls, setImageUrls] = useState({}); // Keep track of uploaded image URLs

  const createOrEditMutation = useCreateOrEditUser();
  const { isLoading } = createOrEditMutation;

  // Dynamic form schema based on formItems
  const schema = createValidationSchema(formItems);

  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (editMode && selectedItem) {
      Object.keys(selectedItem).forEach((key) => {
        setValue(key, selectedItem[key]);
        if (Array.isArray(selectedItem[key])) {
          // Set image URLs for existing images
          setImageUrls(prev => ({ ...prev, [key]: selectedItem[key] }));
        }
      });
    }
  }, [editMode, selectedItem, setValue]);

  const handleFileChange = async (event, name, type = 'single-image') => {
    const files = event.target.files;

    if (files.length > 0) {
      const fileArray = Array.from(files);

      // Check for duplicates
      const isDuplicate = fileArray.some(file =>
        imageUrls[name]?.some(existingUrl => file.name === existingUrl.name && file.size === existingUrl.size)
      );

      if (isDuplicate) {
        toast.error('This image has already been uploaded.');
        return;
      }

      // Create previews
      const previews = fileArray.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => ({ ...prev, [name]: previews }));

      let uploadedUrls = [];

      if (type === 'multi-image') {
        // Upload multiple images
        uploadedUrls = await Promise.all(fileArray.map(file => uploadImageToCloudinary(file)));
        setImageUrls(prev => ({ ...prev, [name]: uploadedUrls })); // Update URLs for multi-image
        setValue(name, uploadedUrls);
      } else {
        // Upload a single image
        if (imageUrls[name]?.length > 0) {
          // If an old image exists, delete it first
          await deleteImageFromCloudinary(imageUrls[name][0]);
        }

        const url = await uploadImageToCloudinary(fileArray[0]);
        setImageUrls(prev => ({ ...prev, [name]: [url] })); // Update URL for single image
        setValue(name, url);
      }
    }
  };


  const handleCancelImage = async (name, index) => {
    const imageUrlArray = imageUrls[name];
    if (imageUrlArray) {
      const imageUrl = imageUrlArray[index];
      // Delete image from Cloudinary
      await deleteImageFromCloudinary(imageUrl);

      // Remove the image from the preview and URL state
      setImagePreviews(prev => {
        const updatedPreviews = { ...prev };
        updatedPreviews[name] = updatedPreviews[name].filter((_, i) => i !== index);
        return updatedPreviews;
      });
      setImageUrls(prev => {
        const updatedUrls = { ...prev };
        updatedUrls[name] = updatedUrls[name].filter((_, i) => i !== index);
        return updatedUrls;
      });

      // Update the form value
      setValue(name, imageUrls[name] || []);
    }
  };

  const renderImagePreviews = (name) => (
    <Grid container spacing={2} style={{ marginTop: '10px' }}>
      {imagePreviews[name] && imagePreviews[name].map((preview, index) => (
        <Grid item xs={4} key={index}>
          <img
            src={preview}
            alt={`preview-${index}`}
            style={{ width: '100%', maxHeight: '100px', objectFit: 'cover' }}
          />
          <IconButton onClick={() => handleCancelImage(name, index)}>
            <Iconify icon="eva:trash-2-outline" />
          </IconButton>
        </Grid>
      ))}
    </Grid>
  );

  const togglePasswordVisibility = (name) => {
    setShowPassword(prev => ({ ...prev, [name]: !prev[name] }));
  };

  console.log(getValues(), errors);
  const onSubmit = async (data) => {
    try {
      const response = await createOrEditMutation.mutateAsync(data);
      if (response.code === 200) {
        toast.success(response.data.message);
        setVisible(false);
      } else {
        toast.error('Submission failed');
      }
    } catch (error) {
      toast.error('An error occurred during submission');
    }
  };

  const renderInput = (item) => {
    switch (item.type) {
      case 'text':
        if (item.name === 'password' || item.name === 'confirm_password') {
          return (
            <TextField
              name={item.name}
              label={item.label}
              type={showPassword[item.name] ? 'text' : 'password'}
              sx={{ width: '100%' }}
              {...register(item.name)}
              error={!!errors[item.name]}
              helperText={errors[item.name]?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => togglePasswordVisibility(item.name)}
                    >
                      <Iconify icon={showPassword[item.name] ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          );
        }
        return (
          <TextField
            name={item.name}
            label={item.label}
            sx={{ width: '100%' }}
            {...register(item.name)}
            error={!!errors[item.name]}
            helperText={errors[item.name]?.message}
          />
        );

      case 'checkbox':
        return (
          <>
            {item?.label}
            <Checkbox
              name={item.name}
              {...register(item.name)}
              onInput={(e) => setValue(item.name, e.target.checked)}
              checked={!!watch(item.name)}
            />
          </>
        );

      case 'single-image':
        return (
          <>
            <input
              type="file"
              accept="image/*"
              onInput={(e) => handleFileChange(e, item.name, 'single-image')}
              {...register(item.name)}
              id={`upload-${item.name}`}
              style={{ display: 'none' }}
            />
            <label htmlFor={`upload-${item.name}`}>
              <IconButton component="span" sx={{ marginBottom: 1 }}>
                <Iconify icon="eva:upload-fill" />
              </IconButton>
              {item?.label}
            </label>
            {imagePreviews[item.name] && (
              <img
                src={imagePreviews[item.name][0]}
                alt="preview"
                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
              />
            )}
          </>
        );

      case 'multi-image':
        return (
          <>
            <input
              type="file"
              accept="image/*"
              multiple
              onInput={(e) => handleFileChange(e, item.name, 'multi-image')}
              {...register(item.name)}
              id={`upload-${item.name}`}
              style={{ display: 'none' }}
            />
            <label htmlFor={`upload-${item.name}`}>
              <IconButton component="span" sx={{ marginBottom: 1 }}>
                <Iconify icon="eva:upload-fill" />
              </IconButton>
              {item?.label}
            </label>
            {renderImagePreviews(item.name)}
          </>
        );

      case 'dropdown':
        return (
          <Select
            name={item.name}
            {...register(item.name)}
            displayEmpty
            sx={{ width: '100%' }}
            error={!!errors[item.name]}
            renderValue={(selected) => {
              if (!selected) return <em>Select an option</em>;
              return selected;
            }}
          >
            {item.options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );

      case 'radio':
        return (
          <>
            <Typography>{item.label}</Typography>
            {item.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  value={option.value}
                  {...register(item.name)}
                  checked={watch(item.name) === option.value}
                />
                {option.label}
              </label>
            ))}
          </>
        );

      case 'date':
        return (
          <TextField
            name={item.name}
            label={item.label}
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ width: '100%' }}
            {...register(item.name)}
            error={!!errors[item.name]}
            helperText={errors[item.name]?.message}
          />
        );

      case 'number':
        return (
          <TextField
            name={item.name}
            label={item.label}
            type="number"
            sx={{ width: '100%' }}
            {...register(item.name)}
            error={!!errors[item.name]}
            helperText={errors[item.name]?.message}
          />
        );

      case 'textarea':
        return (
          <TextField
            name={item.name}
            label={item.label}
            multiline
            rows={4}
            sx={{ width: '100%' }}
            {...register(item.name)}
            error={!!errors[item.name]}
            helperText={errors[item.name]?.message}
          />
        );

      default:
        return null;
    }
  };

  const dynamicForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h6' className='pt-4 pb-8 mb-4'>
        {editMode ? `Edit Information` : 'Add New'}
      </Typography>

      <Grid container spacing={3}>
        {formItems.map((item, index) => (
          <Grid item lg={12} sm={12} xs={12} md={12} key={index}>
            {renderInput(item)}
          </Grid>
        ))}
      </Grid>

      <LoadingButton
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        sx={{ marginTop: 4 }}
        className='w-40 float-right'
        loading={isLoading}
      >
        {editMode ? 'Update' : 'Add'}
      </LoadingButton>
    </form>
  );

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',  // Adjust the width based on the screen size
    maxHeight: '100vh',  // Ensure the modal doesn't overflow the viewport height
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 2,
    overflowY: 'auto',  // Enable vertical scrolling if content exceeds max height
  };

  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Modal
      open={visible}
      onClose={() => setVisible(!visible)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='rounded-md'
      sx={modalStyle}
    >
      <Box sx={style}>
        {dynamicForm}
      </Box>
    </Modal>
  );
});

CrudModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  formItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    validation: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })),
  })).isRequired,
  selectedItem: PropTypes.object,
  editMode: PropTypes.bool,
};

export default CrudModal;
