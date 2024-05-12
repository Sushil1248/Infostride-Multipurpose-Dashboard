import { Helmet } from 'react-helmet-async';

import { PageOperationView } from 'src/sections/pageoperation/view';

// ----------------------------------------------------------------------

export default function PageOperation() {
  return (
    <>
      <Helmet>
        <title> Pages | Infostride UI </title>
      </Helmet>

      <PageOperationView />
    </>
  );
}
