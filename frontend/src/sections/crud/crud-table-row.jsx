import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CrudTableRow({
  selected,
  data,
  columns,
  handleClick,
  deleteFunction,
  editFunction,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // Check if row data is defined before proceeding
  if (!data) {
    console.error('Row data is undefined');
    return null;
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        {columns.map((column) => (
          <TableCell key={column.id} align={column.align || 'left'}>
            {column.id === 'avatarUrl' ? (
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar alt={data.name} src={data[column.id]} />
                <Typography variant="subtitle2" noWrap>
                  {data.name}
                </Typography>
              </Stack>
            ) : column.id === 'status' ? (
              <Label color={(data[column.id] === 'banned' && 'error') || 'success'}>
                {data[column.id]}
              </Label>
            ) : column.id === 'isEmailVerified' ? (
              data[column.id] !== undefined && data[column.id] !== null
                ? data[column.id] ? 'Yes' : 'No'
                : 'N/A'
            ) : column.id.toLowerCase() === 'action' ? (
              <IconButton onClick={handleOpenMenu}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            ) : (
              data[column.id] !== undefined && data[column.id] !== null
                ? data[column.id]
                : 'N/A'
            )}
          </TableCell>
        ))}

      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={editFunction}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={deleteFunction}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

CrudTableRow.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  selected: PropTypes.bool,
  handleClick: PropTypes.func,
  editFunction: PropTypes.func,
  deleteFunction: PropTypes.func,
};
