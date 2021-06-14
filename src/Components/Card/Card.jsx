import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
  });
export default function CardHOC(Component) {
    // const classes = useStyles();
    return function CardContainer({...props}) {
    
        return (
            <Card  style={{height:'100%'}}>
                <Component {...props}/>
            </Card>
        )
    } 
}