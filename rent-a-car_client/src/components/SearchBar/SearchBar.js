import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

const SearchBar = ({setSearchQuery}) => (
    <Stack ml={6} ms={6} mb={4}> 
    <form className="search">
      <TextField
        id="search-bar"
        margin="dense"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        
        variant="outlined"
        placeholder="Search..."
        size="medium"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "inherit", fontSize: "3rem"}} />
      </IconButton>
    </form>
    </Stack>
  );

  export default SearchBar;