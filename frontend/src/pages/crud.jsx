import { Helmet } from 'react-helmet-async';
import { CrudView } from 'src/sections/crud/view';
import { useUserListingContext } from 'src/contexts/UserListingContext';


export default function UserPage() {
  const { users } = useUserListingContext();

  const columns = [
    { id: 'username', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    { id: 'isVerified', label: 'Verified', align: 'center' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' },
  ];
  return (
    <>
      <Helmet>
        <title> Crud </title>
      </Helmet>

      <CrudView label="user" columns= {columns} tabledata={users}/>
    </>
  );
}
