import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { CrudView } from 'src/sections/crud/view';

// ----------------------------------------------------------------------

export default function WebsiteSettings() {
    const { element } = useParams();
    const columns = [
        { id: 'username', label: 'Name' },
        { id: 'email', label: 'Email' },
        { id: 'role', label: 'Role' },
        { id: 'isVerified', label: 'Verified', align: 'center' },
        { id: 'status', label: 'Status' },
        { id: 'action', label: 'Action' },
    ];
    const users = [];
    return (
        <>
            <Helmet>
                <title> {import.meta.env.VITE_ENV} Settings </title>
            </Helmet>

            <CrudView label={element} columns={columns} tabledata={users} />
        </>
    );
}
