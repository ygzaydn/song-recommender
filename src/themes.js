import { makeStyles } from "@material-ui/core/styles";
import { color } from "./colors";

export const artistInfoStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexGrow: 1,
        margin: "1vh 0.2vw 5vh 0.2vw",
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
        maxWidth: "1000px",
        background: `${color.PINKCOLOR}`,
        width: "90vw",
    },
    title: {
        maxWidth: "inherit",
        height: "auto",
        textAlign: "center",
        color: `${color.WHITECOLOR}`,
        fontWeight: "bold",
        fontSize: "150%",
        background: `${color.BLACKCOLOR}`,
        padding: "1%",
        borderRadius: "15px",
    },
    bioTitle: {
        maxWidth: "inherit",
        height: "auto",
        textAlign: "center",
        color: `${color.WHITECOLOR}`,
        background: `${color.BLACKCOLOR}`,
    },
    bio: {
        textAlign: "center",
        color: `${color.BLACKCOLOR}`,
        border: `2px solid ${color.BLACKCOLOR}`,
        padding: "1%",
        background: `${color.YELLOWCOLOR}`,
    },
    gridList: {
        flexWrap: "nowrap",
        padding: 0,
        width: "100%",
        justifyContent: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        //alignItems: 'center',
        margin: "auto",
        width: "80vw",
        maxWidth: "1000px",
    },
    collapseStyle: {
        border: `2px solid ${color.BLACKCOLOR}`,
        padding: 0,
    },
}));

export const breadcrumbsStyle = makeStyles(() => ({
    ol: {
        justifyContent: "center",
    },
    root: {
        color: "white",
        display: "flex",
        justifyContent: "center",
        fontSize: "80%",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    underlineTypo: {
        display: "flex",
        justifyContent: "center",
        textDecoration: "underline",
        fontSize: "80%",
        color: `${color.PINKCOLOR}`,
    },
    menuStyle: {
        background: `${color.BLACKCOLOR}`,
        color: `${color.WHITECOLOR}`,
        border: `2px solid ${color.PINKCOLOR}`,
    },
    menuItemStyle: {
        borderBottom: `1px solid  ${color.PINKCOLOR}`,
        borderTop: `1px solid  ${color.PINKCOLOR}`,
        "&:hover": {
            background: `${color.PINKCOLOR}`,
        },
    },
    menuItemTitle: {
        textAlign: "center",
        background: `${color.PINKCOLOR}`,
        "&:hover": {
            background: `${color.PINKCOLOR}`,
        },
    },
}));

export const cardComponentStyle = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "left",
        border: "1px solid black",
        borderRadius: 0,
        height: 160,
        background: `${color.YELLOWCOLOR}`,
    },
    details: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "2vh",
    },
    content: {
        flex: "1 0 auto",
        padding: "0 0.5vw",
        paddingRight: "1vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    cover: {
        minWidth: 150,
        fontSize: "144px",
    },
    subtitle1: {
        maxWidth: "45vw",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "inline-block",
        color: `${color.GRAYCOLOR}`,
        textDecoration: "underline",
    },
    typoColor: {
        color: `${color.GRAYCOLOR}`,
    },
    typoColorBold: {
        color: `${color.GRAYCOLOR}`,
        textShadow: `0.2px 0.2px ${color.GRAYCOLOR}`,
    },
}));

export const geoTopArtistStyle = makeStyles((width) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        //alignItems: 'center',
        margin: "auto",
        width: "80vw",
        maxWidth: "1000px",
    },
    container: {
        display: "grid !important",
        width: "auto",
        margin: "auto !important",
        gridTemplateColumns: `${
            window.innerWidth < 800
                ? "45vw 45vw !important"
                : "22.5vw 22.5vw 22.5vw 22.5vw !important"
        }`,
    },
}));

export const listComponentStyle = makeStyles((theme) => ({
    root: {
        borderRadius: 3,
        border: 0,
        padding: "5%",
        display: "grid",
        flexWrap: "wrap",
        backgroundColor: `${color.BLACKCOLOR}`,
        minHeight: "10vh",
        maxHeight: 250,
        overflow: "hidden",
        textAlign: "center",
        "&:hover": {
            transition: "0.5s",
            boxShadow: `inset 0px 0px 0px 3px ${color.PINKCOLOR}`,
        },
        "&:active": {
            transform: "scale(0.9)",
            transition: "0.7s",
        },
    },
    label: {
        textTransform: "capitalize",
    },
    name: {
        display: "grid",
        alignItems: "center",
        color: `${color.WHITECOLOR}`,
        backgroundColor: `${color.BLACKCOLOR}`,
        height: 140,
        fontSize: 18,
    },
    artist: {
        display: "grid",
        alignItems: "center",
        color: `${color.WHITECOLOR}`,
        backgroundColor: `${color.BLACKCOLOR}`,
        height: 80,
        borderTop: "1px solid white",
        fontSize: 14,
    },
    match: {
        display: "grid",
        alignItems: "end",
        fontWeight: "bold",
        color: `${color.WHITECOLOR}`,
        backgroundColor: `${color.PINKCOLOR}`,
        height: 25,
    },
}));

export const smallCardStyle = makeStyles({
    root: {
        width: "35vw",
        minHeight: "35vh",
        padding: 0,
        borderColor: `${color.BLACKCOLOR}`,
        backgroundColor: `${color.YELLOWCOLOR}`,
        overflowY: "auto !important",
    },
    rootTitle1: {
        padding: "0 !important",
        borderColor: `${color.BLACKCOLOR}`,
        display: "grid",
        height: "100%",
        //gridTemplateRows: '15% 15% 15% 15% 15% 15%',
    },
    rootTitle2: {
        padding: "0 !important",
        borderColor: `${color.BLACKCOLOR}`,
        display: "grid",
        height: "100%",
        gridTemplateRows: "16.6666% 65%",
        paddingBottom: "0 !important",
    },
    title: {
        fontSize: "1rem",
        fontWeight: "bold",
        color: `${color.WHITECOLOR}`,
        textAlign: "center",
        backgroundColor: `${color.BLACKCOLOR}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    pos: {
        color: `${color.BLACKCOLOR}`,
        textDecoration: "underline",
        fontSize: 20,
        textAlign: "center",
    },
    moreInfo: {
        color: `${color.BLACKCOLOR}`,
        fontSize: 16,
        textAlign: "center",
    },
    singerInfo: {
        color: `${color.BLACKCOLOR}`,
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
    },
    similarArtistLine: {
        display: "flex",
        justifyContent: "space-between",
        margin: "0 2vw",
    },
    arrow: {
        alignSelf: "center",
        fontSize: "1.5rem",
        "&:active": {
            fontSize: "2rem",
            transition: "0.1s",
        },
    },
});

export const mainPageStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
        margin: "6vh auto ",
        alignContent: "center",
    },
}));

export const styledTextFieldStyle = makeStyles(() => ({
    searchField: {
        background: "white",
        color: "white",
        borderRadius: 3,
        border: 0,
    },
}));
