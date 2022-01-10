import axios from "axios";

export const getArtistInfoFromName = async (
    name,
    dispatcherMethod1,
    dispatcherMethod2,
    dispatcherMethod3
) => {
    const requestOne = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    const requestTwo = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    const requestThree = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    const responses = await axios.all([requestOne, requestTwo, requestThree]);
    try {
        return responses;
        /*const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
        dispatcherMethod1(responseOne);
        dispatcherMethod2(responseTwo);
        dispatcherMethod3(responseThree);*/
    } catch (error) {
        console.log(error);
    }
};

export const getTrackFromSearch = async (mbid) => {
    const requestOne = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_API_KEY}&mbid=${mbid}&format=json`
    );
    const requestTwo = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.getSimilar&api_key=${process.env.REACT_APP_API_KEY}&mbid=${mbid}&format=json`
    );
    const responses = await axios.all([requestOne, requestTwo]);
    try {
        return responses;
    } catch (error) {
        console.log(error);
    }
};

export const getTrackFromSearchwithNameandArtist = async (track, artist) => {
    const requestOne = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_API_KEY}&track=${track}&artist=${artist}&format=json`
    );
    const requestTwo = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.getSimilar&api_key=${process.env.REACT_APP_API_KEY}&track=${track}&artist=${artist}&format=json`
    );
    const responses = await axios.all([requestOne, requestTwo]);
    try {
        return responses;
    } catch (error) {
        console.log(error);
    }
};

export const searchTrackByNameAndArtist = async (trackName, trackArtist) => {
    const res = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${trackName}&artist=${trackArtist}&autocorrect=1&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    try {
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getTagInfoFromName = async (tag) => {
    const requestOne = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=tag.getInfo&api_key=${process.env.REACT_APP_API_KEY}&tag=${tag}&format=json`
    );
    const requestTwo = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=tag.getTopAlbums&api_key=${process.env.REACT_APP_API_KEY}&tag=${tag}&format=json`
    );
    const requestThree = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=tag.getTopArtists&limit=5&api_key=${process.env.REACT_APP_API_KEY}&tag=${tag}&format=json`
    );
    const requestFour = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&api_key=${process.env.REACT_APP_API_KEY}&tag=${tag}&format=json`
    );
    const responses = await axios.all([
        requestOne,
        requestTwo,
        requestThree,
        requestFour,
    ]);
    try {
        return responses;
    } catch (error) {
        console.log(error);
    }
};

export const getTopTags = async (dispatcherMethod) => {
    const res = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    try {
        dispatcherMethod(res);
    } catch (err) {
        console.log(err);
    }
};

export const getGeoInfo = async (country) => {
    const res = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    const resTwo = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=geo.getTopArtists&country=${country}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    const responses = await axios.all([res, resTwo]);
    try {
        return responses;
    } catch (err) {
        console.log(err);
    }
};

export const getGeoTopArtists = async (country, dispatcherMethod) => {
    const res = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=geo.getTopArtists&country=${country}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    try {
        dispatcherMethod(res);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};

export const getCharts = async () => {
    const requestOne = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    const requestTwo = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    const requestThree = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    const responses = await axios.all([requestOne, requestTwo, requestThree]);
    try {
        return responses;
    } catch (error) {
        console.log(error);
    }
};

export const getAlbumByMbid = async (mbid) => {
    const call = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.REACT_APP_API_KEY}&mbid=${mbid}&format=json`
    );
    try {
        return call;
    } catch (err) {
        console.log(err);
    }
};

export const queryYoutubeLink = async (stateFunc, songName, artistName) => {
    await axios
        .get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${songName} - ${artistName}&key=AIzaSyDw42F5UkRgcoXrvweBhzxDZoNICAdT7YQ`
        )
        .then((res) => {
            stateFunc(res.data.items[0].id.videoId);
        })
        .catch((err) => console.log(err));
};
