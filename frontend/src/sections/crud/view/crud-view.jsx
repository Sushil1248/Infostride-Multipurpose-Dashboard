import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import CrudTableRow from '../crud-table-row';
import CrudTableHead from '../crud-table-head';
import TableEmptyRows from '../table-empty-rows';
import CrudTableToolbar from '../crud-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import CrudModal from '../modal/CrudModal';
import { capitalizeFirstLetter } from 'src/utils/format-string';


// ----------------------------------------------------------------------

export default function CrudPage({ label, columns, tabledata }) {

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [visible, setVisible] = useState(false);
  const [orderBy, setOrderBy] = useState(columns[0]?.id || '');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState({});
  const [editMode, setEditMode] = useState(false)
  // Example usage
  const formItems = [
    {
      name: "username",
      label: "Username",
      type: "text",
      validation: { type: "string", min: 2, message: "Username is too short" }
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      validation: { type: "string", email: true, message: "Invalid email address" }
    },
    {
      name: "password",
      label: "Password",
      type: "text",
      validation: { type: "string", min: 6, message: "Password is too short" }
    },
    {
      name: "confirm_password",
      label: "Confirm Password",
      type: "text",
      validation: { type: "string", min: 6 }
    },
    {
      name: "singleImage",
      label: "Profile Image",
      type: "single-image",
      validation: { type: "any" }
    },
    {
      name: "multiImage",
      label: "Gallery Image",
      type: "multi-image",
      validation: { type: "any" }
    },
    {
      name: "terms",
      label: "Agree to terms",
      type: "checkbox",
      validation: { type: "boolean", required: true, message: "Must agree to terms" }
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" }
      ],
      validation: { type: "string", required: true, message: "Please select your gender" }
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      validation: { type: "number", min: 18, message: "You must be at least 18 years old" }
    },
    {
      name: "country",
      label: "Country",
      type: "dropdown",
      options: [
        { label: "United States", value: "us" },
        { label: "Canada", value: "ca" },
        { label: "India", value: "in" }
      ],
      validation: { type: "string", required: true, message: "Please select a country" }
    },
    {
      name: "birthdate",
      label: "Birthdate",
      type: "date",
      validation: { type: "date", required: true, message: "Please select a birthdate" }
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      validation: { type: "string", pattern: /^[0-9]{10}$/, message: "Phone number must be 10 digits" }
    },
    {
      name: "bio",
      label: "Short Bio",
      type: "textarea",
      validation: { type: "string", max: 200, message: "Bio should not exceed 200 characters" }
    }
  ];



  // handle sort
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  // handle select all
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tabledata.map((n) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // handle click function
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleEdit = (event, data) => {
    setSelectedItem(data);
    setEditMode(true);
    setVisible(true);
  }

  const handleDelete = (event, id) => {
    console.log('I am clicked', id)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: tabledata,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{capitalizeFirstLetter(label)}s</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => { setVisible(true); setEditMode(false) }}>
          New {capitalizeFirstLetter(label)}
        </Button>

      </Stack>

      <Card >
        <CrudTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CrudTableHead
                order={order}
                orderBy={orderBy}
                rowCount={tabledata.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={columns}
              />
              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <CrudTableRow
                    key={row.id}
                    data={row}
                    columns={columns}
                    selected={selected.indexOf(row.username) !== -1}
                    handleClick={(event) => handleClick(event, row.username)}
                    editFunction={(event) => handleEdit(event, row)}
                    deleteFunction={(event) => handleDelete(event, row.id)}
                  />
                ))}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, tabledata.length)} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={tabledata.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {/* modal */}
      <CrudModal visible={visible} setVisible={setVisible} crudFor={label} formItems={formItems} editMode={editMode} selectedItem={selectedItem} />
    </Container>
  );
}
