import axios from "axios";

export const searchByArtistName = async (input, dispatcherMethod) => {
    try {
        const res = await axios.get(
            `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${input}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
        );
        if (res) {
            dispatcherMethod(res);
        }
    } catch (error) {
        console.log(error);
    }
};

export const getArtistInfoFromSearch = async (
    mbid,
    dispatcherMethod1,
    dispatcherMethod2,
    dispatcherMethod3
) => {
    const requestOne = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=${mbid}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    const requestTwo = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&mbid=${mbid}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    const requestThree = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=${mbid}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    const responses = await axios.all([requestOne, requestTwo, requestThree]);
    try {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
        console.log(responses);
        dispatcherMethod1(responseOne);
        dispatcherMethod2(responseTwo);
        dispatcherMethod3(responseThree);
    } catch (error) {
        console.log(error);
    }
};

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
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
        dispatcherMethod1(responseOne);
        dispatcherMethod2(responseTwo);
        dispatcherMethod3(responseThree);
    } catch (error) {
        console.log(error);
    }
};

export const getTrackFromSearch = async (
    mbid,
    dispatcherMethod1,
    dispatcherMethod2
) => {
    const requestOne = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_API_KEY}&mbid=${mbid}&format=json`
    );
    const requestTwo = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.getSimilar&api_key=${process.env.REACT_APP_API_KEY}&mbid=${mbid}&format=json`
    );
    const responses = await axios.all([requestOne, requestTwo]);
    try {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        dispatcherMethod1(responseOne);
        dispatcherMethod2(responseTwo);
    } catch (error) {
        console.log(error);
    }
};

export const getTrackFromSearchwithNameandArtist = async (
    track,
    artist,
    dispatcherMethod1,
    dispatcherMethod2
) => {
    const requestOne = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_API_KEY}&track=${track}&artist=${artist}&format=json`
    );
    const requestTwo = axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.getSimilar&api_key=${process.env.REACT_APP_API_KEY}&track=${track}&artist=${artist}&format=json`
    );
    const responses = await axios.all([requestOne, requestTwo]);
    try {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        dispatcherMethod1(responseOne);
        dispatcherMethod2(responseTwo);
    } catch (error) {
        console.log(error);
    }
};

export const searchTrackByNameAndArtist = async (
    trackName,
    trackArtist,
    dispatcherMethod
) => {
    const res = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.getSimilar&track=${trackName}&artist=${trackArtist}&autocorrect=1&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    try {
        dispatcherMethod(res);
    } catch (error) {
        console.log(error);
    }
};

export const getTagInfoFromName = async (
    tag,
    dispatcherMethod1,
    dispatcherMethod2,
    dispatcherMethod3,
    dispatcherMethod4
) => {
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
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
        const responseFour = responses[3];

        dispatcherMethod1(responseOne);
        dispatcherMethod2(responseTwo);
        dispatcherMethod3(responseThree);
        dispatcherMethod4(responseFour);
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

export const getGeoInfo = async (
    country,
    dispatcherMethod,
    dispatcherMethod2
) => {
    const res = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    const resTwo = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=geo.getTopArtists&country=${country}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
    );
    const responses = await axios.all([res, resTwo]);
    try {
        dispatcherMethod(responses[0]);
        dispatcherMethod2(responses[1]);
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
