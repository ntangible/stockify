import * as React from 'react';
import axios from 'axios';
import { Paper, InputBase, Tooltip, List, ListItem, ListItemButton, ListItemText, Box, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const SearchBar = ({AddItem, StockClick}) => {
    const [searchTerm, SetSearchTerm] = React.useState('');
    const [searchResults, SetSearchResults] = React.useState([]);

    const search = async (term) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/search/${term}`);

            SetSearchResults(response.data);
        }
        catch (error) {
            console.error('Error fetching search results:', error);
        }
    }

    const SearchSubmit = (event) => {
        event.preventDefault(); 
        search(searchTerm);
    }
    return (
        <Box sx={{ width: 'calc(100%)' }}>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" value={searchTerm} onChange={(term) => SetSearchTerm(term.target.value)}/>
                <Tooltip title="Click to search">
                    <IconButton type="submit" sx={{ p: '10px' }} onClick={SearchSubmit}>
                        <SearchIcon />
                    </IconButton>
                </Tooltip>
            </Paper>
            {searchResults.length > 0 ? (
                <Paper>
                    <List sx={{ bgcolor: 'background.paper', marginTop: 1}}>
                        {searchResults.map((result) => (
                            <ListItem key={result['1. symbol']}>
                                <Tooltip title={`View ${result['1. symbol']}`} placement="bottom-start">
                                    <ListItemButton onClick={() => StockClick(result['1. symbol'])}>
                                        <ListItemText
                                            primary={`${result['2. name']} (${result['1. symbol']})`}
                                            secondary={`${result['4. region']} - ${result['8. currency']}`}
                                        />
                                    </ListItemButton>
                                </Tooltip>
                                <Tooltip title={`Add ${result['1. symbol']} to following`}>
                                    <IconButton onClick={() => AddItem(result['1. symbol'])}>
                                        <AddIcon/>
                                    </IconButton>
                                </Tooltip>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            ) : (<Divider/>)}
        </Box>
    );
}

export default SearchBar;