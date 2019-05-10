import { grey } from '@material-ui/core/colors';
import { Theme, createStyles } from '@material-ui/core';

const CreateArticleStyles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        cssLabel: {
            '&$cssFocused': {
                color: grey[600],
            },
            fontFamily: 'Georgia, Times, serif',
            fontSize: '1.4em',
            lineHeight: '0.7'
        },
        cssFocused: {
            fontFamily: 'Georgia, Times, serif',
            fontSize: '1.4em'
        },
        cssUnderline: {
            '&:after': {
                borderBottomColor: grey[600],
            },
        },
        cssOutlinedInput: {
            fontFamily: 'Georgia, Times, serif',
            fontSize: '1.4em',
            '&$cssFocused $notchedOutline': {
                borderColor: grey[600],
            },
        },
        notchedOutline: {},
        bootstrapRoot: {
            'label + &': {
                marginTop: theme.spacing.unit * 3,
            },
        },
        button: {
            margin: theme.spacing.unit,
        },
        input: {
            display: 'none',
        },
    });

export default CreateArticleStyles