import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: icon('ic_settings'),
    children: [
     
      {
        title: 'Add Category',
        path: '/admin/settings/form-builder',
        icon: icon('ic_category'),
      },
      {
        title: 'Add Product',
        path: '/admin/settings/new-form',
        icon: icon('ic_form'),
      },
      {
        title: 'Appearance',
        path: '/admin/settings/themes',
        icon: icon('ic_themes'),
      },
      {
        title: 'CMS',
        path: '/admin/settings/cms',
        icon: icon('ic_cms'),
      },
    ],
  },
];

export default navConfig;
