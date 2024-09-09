import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { Collapse, Divider, List } from '@mui/material';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import { account } from 'src/_mock/account';
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify';
import { useGetWebsiteListingWithMenus } from 'src/lib/api/queriesAndMutations';
import Loader from '../shared/Loader';
import { createUnderScoreSlug } from 'src/utils/format-string';
import { NAV } from './config-layout';
import navConfig from './config-navigation';

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

    if (WebsiteData && WebsiteDataResponse.code === 200) {
      setWebsites(WebsiteData.websites);
    }
  };

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
      {navConfig.map((item, index) => (
        item?.children ? (
          <NavItemWithDropDown key={`${item.title}-${index}`}  item={item} />)
          : (
            <NavItem key={item.title} item={item} />
          )

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
          <NavItemWithDropDown key={`${item.business_name}-${index}`} item={item} />
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
    <Box sx={{ flexShrink: { lg: 0 }, width: { lg: NAV.WIDTH } }}>
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
            sx: { width: NAV.WIDTH },
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
      <Box component="span">{item.title || item.label}</Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

// ----------------------------------------------------------------------

function NavItemWithDropDown({ item }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ minHeight: 44, borderRadius: 0.75 }}>
        <Box component="span" sx={{ width: 20, height: 20, mr: 2 }}>
          {item.icon}
        </Box>
        <Box component="span" sx={{ flexGrow: 1 }}>
          {item.title}
        </Box>
        <Iconify icon={open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'} />
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children.map((child) => (
            <NavItem key={child.title} item={child} />
          ))}
        </List>
      </Collapse>
    </>
  );
}


NavItemWithDropDown.propTypes = {
  item: PropTypes.object,
};
