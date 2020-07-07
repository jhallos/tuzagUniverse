import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';

import { withStyles } from '@material-ui/core/styles'

const styles = {
    root: {
        flexGrow: 1
    }
}

const Header = ({ classes }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: '#fff' }} >
                <Toolbar>
                    <div class="logo"></div>
                    <Typography variant="h5" style={{ color: '#333' }}>
                        Universe
                    </Typography>
                    <IconButton 
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
                        <Menu
                        id="fade-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                        >
                            <MenuItem onClick={handleClose}><a style={{ color: '#333' }} href="/login">Login</a></MenuItem>
                            <MenuItem onClick={handleClose}><a style={{ color: '#333' }} href="/register">Register</a></MenuItem>
                            <MenuItem onClick={handleClose}><a style={{ color: '#333' }} href="/">Home</a></MenuItem>
                        </Menu>                    
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default withStyles(styles)(Header)