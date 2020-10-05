import React, { useState } from 'react';
import { Grid, Paper, Typography, Collapse, GridList } from '@material-ui/core/'
import 'fontsource-roboto';
import { mapDispatchToProps, mapStateToProps } from '../store'
import { connect } from 'react-redux'
import { BigCard } from './BigCard-Component/BigCard'
import { ConnectedSmallCard } from './SmallCard'
import { getTagInfoFromName } from '../axiosCalls'
import { StyledButton } from './StyledButtonComponent'
import { StyledTextField } from './StyledTextField'
import { getArtistInfoFromName } from '../axiosCalls'
import { artistInfoStyle } from '../themes'

const TagInfo = ({tagState, onGetTag, onStateChange, onGetTopArtistTag, onGetTopTracksTag, onGetTopAlbumsTag, onGetArtist,onGetTopTracks,onGetTopAlbums}) => {
    const classes = artistInfoStyle();
    const [checked, setChecked] = useState(false);
    const [searchText, setSearchText] = useState('');

    const setTextField = (event) => {
    setSearchText(event.target.value)
    }

    const unCollapse = () => {
        setChecked((prev) => !prev)
    }

    return(
        <div className={classes.root}>
        {tagState.getTag && tagState.getTopAlbumTags && tagState.getTopArtistTags && tagState.getTopTrackTags
        ?
        <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.title}>
                            {tagState.getTag.name}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className={classes.collapseStyle} >
                        <Typography variant="subtitle1" className={classes.bioTitle} onClick={unCollapse}>
                            {checked ?  'Click to close !' : 'Click here for more info!'}
                        </Typography>
                        <Collapse in={checked} collapsedSize={150}>
                            <Typography className={classes.bio}>
                                {tagState.getTag.wiki.content.split('<a hr')[0]
                                }
                            </Typography>
                        </Collapse>
                    </Grid>
                    <Grid item xs={6} >
                        <GridList className={classes.gridList} cols={1}>
                            <ConnectedSmallCard clickInfo={false} title="Stats" data1={tagState.getTag.reach} data2={tagState.getTag.total} par1="Reach" par2="Total" stats={true}/>
                        </GridList>
                    </Grid>
                    <Grid item xs={6}>
                        <GridList className={classes.gridList} cols={1}>
                            <ConnectedSmallCard data1={tagState.getTopArtistTags} title="Related Artists" clickInfo={true} clickInfoFunction={(name) => getArtistInfoFromName(name,onGetArtist,onGetTopTracks,onGetTopAlbums,onStateChange)}/>
                        </GridList>
                    </Grid>
                    <Grid item xs={12}>
                        <BigCard data={tagState.getTopTrackTags} icon={true} title="Related Tracks" playcount={false}/>
                    </Grid>
                    <Grid item xs={12}>
                        <BigCard data={tagState.getTopAlbumTags} title="Related Albums" playcount={false}/>
                    </Grid>
                </Grid>
            </Paper>
            : <form className={classes.form} noValidate autoComplete="off">
                <StyledTextField label="Tag Name" onChange={setTextField}/>
                <StyledButton color="primary" variant="outlined" onClick={()=> getTagInfoFromName(searchText,onGetTag,onGetTopAlbumsTag,onGetTopArtistTag, onGetTopTracksTag, onStateChange)}>
                Search
                </StyledButton>
             </form>
        }
            
        </div>
    )
}

export const ConnectedTagInfo = connect(mapStateToProps,mapDispatchToProps)(TagInfo)