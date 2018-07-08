import React from 'react';
import Typography from '@material-ui/core/Typography';

const TabContainer = ({ children }) => (
  <Typography component="div" style={{ padding: 8 * 3 }}>
    {children}
  </Typography>
);

export default TabContainer;
