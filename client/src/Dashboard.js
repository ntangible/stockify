import * as React from 'react';
import { Container, IconButton, Divider, Typography, List, Toolbar, Box, Paper } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import StockChart from './StockChart';
import StockCart from './Cart';
import SearchBar from './Search';
import { useCookies } from 'react-cookie';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Dashboard() {
  const isInitialLoad = React.useRef(true);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  }

  const [cartItems, SetCartItems] = React.useState(['AAPL']);

  const ClearCart = () => {
    SetCartItems([]);
  }

  const RemoveItem = (remItem) => {
    const newArr = cartItems.filter(item => item !== remItem);
    SetCartItems(newArr);
  }

  const AddItem = (item) => {
    SetCartItems(prev => {
      if (!prev.includes(item)) {
        return [...prev, item];
      }
      else
        return prev;
    });
  }

  const [cookies, SetCookie] = useCookies(['cartItems']);

  React.useEffect(() => {
    if (isInitialLoad.current) {
      const savedCartItems = cookies.cartItems;
      if (savedCartItems) {
          SetCartItems(savedCartItems);
      }
      isInitialLoad.current = false;
    }
  }, [cookies.cartItems]);

  React.useEffect(() => {
    SetCookie('cartItems', cartItems, { path: '/', maxAge: 604800 });
  }, [cartItems, SetCookie]);

  const [page, SetPage] = React.useState('main');
  const [currStock, SetCurrStock] = React.useState('');

  let pageContent, title;
  const DashboardClick = () => {
    SetPage('main');
  }
  const SearchIconClick = () => {
    SetPage('search');
  }
  const CartClick = () => {
    SetPage('cart');
  }
  const StockClick = (stockSymbol) => {
    SetPage('stock');
    SetCurrStock(stockSymbol);
  }

  if (page === 'main') {
    pageContent = (
      <Paper sx={{ width: 'calc(100%)', height: 'calc(85vh)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Typography variant="h1">
          Welcome!
        </Typography>
        <Divider sx={{margin: 1}}/>
        <Typography variant="h3">
          Let's get started by searching for a stock!
        </Typography>
        <Divider sx={{margin: 1}}/>
        <Typography variant='h6'>
          Access the search feature by clicking on the search icon on the upper right hand corner.
        </Typography>
        <Divider sx={{margin: 1}}/>
        <Typography variant='h6'>
          Access the main page and following list with the icons on the menu to the left.
        </Typography>
      </Paper>
    );
    title = 'Main';
  }
  else if (page === 'cart') {
    pageContent = <StockCart {...{ cartItems, ClearCart, StockClick, RemoveItem }}/>
    title = 'Following';
  }
  else if (page === 'search') {
    pageContent = <SearchBar {...{ AddItem, StockClick }}/>
    title = 'Search';
  }
  else if (page === 'stock') {
    pageContent = <StockChart stock={currStock} AddItem={AddItem}/>;
    title = `${currStock}`;
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
            <IconButton color="inherit" onClick={SearchIconClick}>
              <SearchIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems({DashboardClick: DashboardClick})}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems({CartClick: CartClick})}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
            {pageContent}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
