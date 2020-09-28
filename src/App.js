import React, {useState} from 'react';
import { connect } from 'react-redux'
import './App.css';
import 'fontsource-roboto';
import { Header } from './components/Header'
import { ConnectedMainPage } from './components/MainPage'
import TypedJS from './components/TypedJS-Component/TypedJS'

const App = () => {

  const [background, setBackground] = useState(true);
  const [mainpageClass, setMainpageClass] = useState('main-page main-page-animation')
  let className =  background ? 'main-page main-page-animation' : '';

  const changeBackground = () => {
    setBackground(false);
  }
  const handleTransitionEnd = () => {
    setMainpageClass('main-page main-page-animation main-page-animation-out')
  }

  return ( 
  <div className={mainpageClass} onTransitionEnd={handleTransitionEnd}>
    <TypedJSConditional background={background}/>
    <Header handleClick={changeBackground} />
    <ConnectedMainPageConditional background={background} />
  </div>
  );
}

const ConnectedMainPageConditional = ({background}) => 
  !background 
  ? <ConnectedMainPage />
  : null


const TypedJSConditional = ({background}) => 
  background ?
      <TypedJS
        strings={[
          'TIME TO EXPLORE NEW SONGS',
          'USE THE MENU BELOW TO <br> BEGIN  YOUR JOURNEY...',
        ]}
    />
  : null;

const Background = ({background,onAnimationEnd}) => {
  if(background) {
  return (
    <div className="main-page main-page-animation asd" style={{position:'absolute'}} onTransitionEnd={onAnimationEnd}>
    </div>
  ) 
  } else return null;
}

export const ConnectedApp = connect()(App)


