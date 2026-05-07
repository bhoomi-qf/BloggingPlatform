import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
        <Toolbar />
        <List>
            {['Dashboard', 'Blogs', 'Authers'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
    </Drawer>
  );
}

export default Sidebar;