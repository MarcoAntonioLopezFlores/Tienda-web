import { lighten, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react'

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      backgroundColor: lighten(theme.palette.primary.light, 0.5),
      paddingRight: theme.spacing(1)
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    title: {
      flex: "1 1 100%"
    }
  }));
  
  const TitleTableComponent = ({titleHead}) => {
    const classes = useToolbarStyles();
  
    return (
      <Toolbar className={classes.root}>
        <Typography
          className={classes.title}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          {titleHead}
        </Typography>
      </Toolbar>
    );
  };

  export default TitleTableComponent;
