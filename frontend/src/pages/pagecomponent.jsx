import { Helmet } from 'react-helmet-async';

import { PageComponentView } from 'src/sections/pagecomponent/view';

// ----------------------------------------------------------------------

export default function PageComponent() {
  return (
    <>
      <Helmet>
        <title> Pages | Infostride UI </title>
      </Helmet>

      <PageComponentView />
    </>
  );
}
