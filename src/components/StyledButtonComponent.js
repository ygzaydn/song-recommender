import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { color } from '../colors';

export const StyledButton = withStyles({
  root: {
    background: `${color.PINKCOLOR}`,
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 56,
    padding: '0 30px',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);