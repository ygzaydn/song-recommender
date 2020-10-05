import axios from 'axios'
import dotenv from 'dotenv'

export const searchByArtistName = async (input, dispatcherMethod) => {
    try {
      const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${input}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
      if (res) {
        dispatcherMethod(res);
      }
    } catch (error) {
      console.log(error)
    }
}

export const getArtistInfoFromSearch = async (mbid, dispatcherMethod1, dispatcherMethod2, dispatcherMethod3, stateMethod1) => {
   const requestOne = axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=${mbid}&api_key=${process.env.REACT_APP_API_KEY}&format=json`);
   const requestTwo = axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&mbid=${mbid}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
   const requestThree = axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=${mbid}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
   const responses = await axios.all([requestOne, requestTwo, requestThree])
   try {
      const responseOne = responses[0]
      const responseTwo = responses[1]
      const responseThree = responses[2]
      dispatcherMethod1(responseOne);
      dispatcherMethod2(responseTwo);
      dispatcherMethod3(responseThree);
      stateMethod1('ArtistInfo')
   } catch (error) {
      console.log(error)
   }
}

export const getArtistInfoFromName  = async (name, dispatcherMethod1, dispatcherMethod2, dispatcherMethod3, stateMethod1) => {
   const requestOne = axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json`);
   const requestTwo = axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
   const requestThree = axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
   const responses = await axios.all([requestOne, requestTwo, requestThree])
   try {
      const responseOne = responses[0]
      const responseTwo = responses[1]
      const responseThree = responses[2]
      dispatcherMethod1(responseOne);
      dispatcherMethod2(responseTwo);
      dispatcherMethod3(responseThree);
      stateMethod1('ArtistInfo')
   } catch (error) {
      console.log(error)
   }
}

export const getTrackFromSearch = async (mbid, dispatcherMethod1, dispatcherMethod2, stateMethod1) => {
   const requestOne = axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_API_KEY}&mbid=${mbid}&format=json`)
   const requestTwo = axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.getSimilar&api_key=${process.env.REACT_APP_API_KEY}&mbid=${mbid}&format=json`)
   const responses = await axios.all([requestOne, requestTwo])
   try {
      const responseOne = responses[0]
      const responseTwo = responses[1]
      dispatcherMethod1(responseOne);
      dispatcherMethod2(responseTwo);
      stateMethod1('TrackInfo')
   } catch (error) {
      console.log(error)
   }
}

export const getTrackFromSearchwithNameandArtist = async (track, artist, dispatcherMethod1, dispatcherMethod2, stateMethod1) => {
   const requestOne = axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_API_KEY}&track=${track}&artist=${artist}&format=json`)
   const requestTwo = axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.getSimilar&api_key=${process.env.REACT_APP_API_KEY}&track=${track}&artist=${artist}&format=json`)
   const responses = await axios.all([requestOne, requestTwo])
   try {
      const responseOne = responses[0]
      const responseTwo = responses[1]
      dispatcherMethod1(responseOne);
      dispatcherMethod2(responseTwo);
      stateMethod1('TrackInfo')
      console.log(responseOne);
      console.log(responseTwo)
   } catch (error) {
      console.log(error)
   }
}

export const searchTrackByNameAndArtist = async (trackName, trackArtist, dispatcherMethod) => {
   const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.getSimilar&track=${trackName}&artist=${trackArtist}&autocorrect=1&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
   try {
      dispatcherMethod(res);
   } catch (error) {
      console.log(error)
   }
}

export const getTagInfoFromName = async (tag, dispatcherMethod1, dispatcherMethod2, dispatcherMethod3, dispatcherMethod4, stateMethod) => {
   const requestOne = axios.get(`https://ws.audioscrobbler.com/2.0/?method=tag.getInfo&api_key=${process.env.REACT_APP_API_KEY}&tag=${tag}&format=json`)
   const requestTwo = axios.get(`https://ws.audioscrobbler.com/2.0/?method=tag.getTopAlbums&api_key=${process.env.REACT_APP_API_KEY}&tag=${tag}&format=json`)
   const requestThree = axios.get(`https://ws.audioscrobbler.com/2.0/?method=tag.getTopArtists&limit=4&api_key=${process.env.REACT_APP_API_KEY}&tag=${tag}&format=json`)
   const requestFour = axios.get(`https://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&api_key=${process.env.REACT_APP_API_KEY}&tag=${tag}&format=json`)
   const responses = await axios.all([requestOne, requestTwo, requestThree, requestFour])
   try {
      const responseOne = responses[0]
      const responseTwo = responses[1]
      const responseThree = responses[2]
      const responseFour = responses[3]

      dispatcherMethod1(responseOne);
      dispatcherMethod2(responseTwo);
      dispatcherMethod3(responseThree);
      dispatcherMethod4(responseFour);

      stateMethod('TagInfo')

   } catch (error) {
      console.log(error)
   }
}

export const getTopTags = async (dispatcherMethod, stateMethod) => {
   const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=${process.env.REACT_APP_API_KEY}&format=json`);
   try {
      dispatcherMethod(res);
      stateMethod('TagRecommend')
   } catch (err) {
      console.log(err);
   }
}

export const getGeoTopTracks = async (country, dispatcherMethod, stateMethod) => {
   const res = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
   try {
      dispatcherMethod(res)
      stateMethod('GeoTopTrack')
   } catch (err) {
      console.log(err)
   }
}

export const getGeoTopArtists = async (country, dispatcherMethod, stateMethod) => {
   const res = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.getTopArtists&country=${country}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
   try {
      dispatcherMethod(res)
      console.log(res)
      stateMethod('GeoTopArtist')
   } catch (err) {
      console.log(err)
   }
}