import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';
import { Collapse, Divider, List } from '@mui/material';
import { useGetWebsiteListingWithMenus } from 'src/lib/api/queriesAndMutations';
import Loader from '../shared/Loader';
import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify';
import { createUnderScoreSlug } from 'src/utils/format-string';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const websiteListingWithMenuMutation = useGetWebsiteListingWithMenus();
  const [websites, setWebsites] = useState([]);
  const { isLoading } = websiteListingWithMenuMutation;

  const upLg = useResponsive('up', 'lg');
  const fetchData = async () => {
    const WebsiteDataResponse = await websiteListingWithMenuMutation.mutateAsync();
    const WebsiteData = WebsiteDataResponse?.data;
    console.log(WebsiteDataResponse, "WebsiteDataResponse")

    if (WebsiteData) {
      if (WebsiteDataResponse.code === 200) {
        setWebsites(WebsiteData.websites);
      }
    }
  }

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
      <Divider sx={{ my: 3, mb: 4 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Websites
        </Typography>
      </Divider>
      {isLoading ? (
        <Loader />
      ) : (
        websites.map((item, index) => (
          <NavItemWithDropDown key={`${item.buisness_name} -${index}`} item={item} />
        ))
      )}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3 }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item, iconUrl = false, dynamicRoute = '' }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={!iconUrl ? item.path : dynamicRoute}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 20, height: 20, mr: 2 }}>
        {!iconUrl ? item.icon : <SvgColor src={`/assets/icons/navbar/${item?.imgURL}.svg`} sx={{ width: 1, height: 1 }} />}
      </Box>

      <Box component="span">{item.title || item.label} </Box>
    </ListItemButton>
  );
}

function NavItemWithDropDown({ item }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const active = item.path === pathname;

  return (
    <>
      {item ? (
        <>
          <ListItemButton
            onClick={handleClick}
            sx={{
              minHeight: 44,
              borderRadius: 0.75,
              typography: 'body2',
              color: 'text.secondary',
              textTransform: 'capitalize',
              fontWeight: 'fontWeightMedium',
              ...(active && {
                color: 'primary.main',
                fontWeight: 'fontWeightSemiBold',
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                },
              }),
            }}
          >
            <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
              {item.icon === '' || item.icon == undefined ? <SvgColor src={`/assets/icons/navbar/${'ic_blog'}.svg`} sx={{ width: 1, height: 1 }} /> : <SvgColor src={`/assets/icons/navbar/${'ic_blog'}.svg`} sx={{ width: 1, height: 1 }} />}
            </Box>
            <Box component="p" className='flex justify-between gap-4'><span className='max-w-[180px] min-w-[140px]'>{item.business_name}</span> <span>{!open ? <Iconify icon="eva:arrow-ios-downward-fill" /> : <Iconify icon="eva:arrow-ios-upward-fill" />}</span></Box>

          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.menus.map((childItem) => (
                <NavItem key={childItem.id} item={childItem} iconUrl={true} dynamicRoute={`/${createUnderScoreSlug(item.business_name)}/${childItem?.route.replace(/\//g, '')}`} />
              ))}
            </List>
          </Collapse>
        </>
      ) : (
        <ListItemButton
          component={RouterLink}
          to={item.path}
          sx={{
            minHeight: 44,
            borderRadius: 0.75,
            typography: 'body2',
            color: 'text.secondary',
            textTransform: 'capitalize',
            fontWeight: 'fontWeightMedium',
            ...(active && {
              color: 'primary.main',
              fontWeight: 'fontWeightSemiBold',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
              },
            }),
          }}
        >
          <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
            {item.icon}
          </Box>
          <Box component="span">{item.title || item.label}</Box>
        </ListItemButton>
      )}
    </>
  );
}


NavItem.propTypes = {
  item: PropTypes.object,
};
