import { Helmet } from 'react-helmet-async';

import { WebsiteView } from 'src/sections/website/view';

// ----------------------------------------------------------------------

export default function WebsitePage() {
  return (
    <>
      <Helmet>
        <title> Website | Infostide UI </title>
      </Helmet>

      <WebsiteView />
    </>
  );
}
