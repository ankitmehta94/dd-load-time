import { makeStyles } from '@material-ui/core/styles';

export const paperStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));