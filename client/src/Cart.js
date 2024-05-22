import ClearIcon from '@mui/icons-material/Clear';
import { Box, List, ListItem, ListItemText, ListItemButton, Divider, Paper, IconButton, Tooltip } from '@mui/material';
import Button from "@mui/material/Button";

const StockCart = ({cartItems, ClearCart, StockClick, RemoveItem}) => {
    const RenderCart = (items) => {
        if (items.length === 0) {
            return (
                <Paper>
                    <List>
                        <ListItem>
                            <ListItemText primary={'Following list is empty'}/>
                        </ListItem>
                    </List>
                </Paper>
            );
        }
        else {
            return (
                <Paper>
                    <Button onClick={() => ClearCart()} sx={{width: 'calc(100%)'}}>
                        Click to clear list
                    </Button>
                    <Divider sx={{borderBottomWidth: 5 }}/>
                    <List>
                        {items.map((item) => (
                            <ListItem key={item}>
                                <Tooltip title={`View ${item}`} placement="bottom-start">
                                    <ListItemButton onClick={() => StockClick(item)}>
                                        <ListItemText primary={item}/>
                                    </ListItemButton>
                                </Tooltip>
                                <Tooltip title={`Remove ${item} from following`}>
                                    <IconButton onClick={() => RemoveItem(item)}>
                                        <ClearIcon/>
                                    </IconButton>
                                </Tooltip>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )
        }
    }
    return (
        <Box sx={{ width: 'calc(100%)' }}>
            {RenderCart(cartItems)}
        </Box>
    );
};

export default StockCart;