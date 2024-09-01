import { Helmet } from 'react-helmet-async';

import { WebsiteView } from 'src/sections/website/view';

// ----------------------------------------------------------------------

export default function WebsitePage() {
  return (
    <>
      <Helmet>
        <title> Website </title>
      </Helmet>

      <WebsiteView />
    </>
  );
}
