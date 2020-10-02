import axios from 'axios'
import dotenv from 'dotenv'

const url = 'https://ipapi.co/json/'

export const getGeoInfo = async () => {
   const res = await axios.get(url);
   try {
    return res;
   } catch (error) {
    console.log(error);
    return error;
   }
   
}

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

export const searchTrackByName = async (searchText, dispatcherMethod) => {
   const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchText}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
   try {
      dispatcherMethod(res);
   } catch (error) {
      console.log(error)
   }
}
