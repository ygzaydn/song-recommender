import React, {useState} from 'react';
import { connect } from 'react-redux'
import './App.css';
import 'fontsource-roboto';
import { Header } from './components/Header-Component/Header'
import { ConnectedMainPage } from './components/MainPage'
import TypedJS from './components/TypedJS-Component/TypedJS'
import { Footer } from './components/Footer-Component/Footer'
import { BreadcrumbsComponent } from './components/BreadcrumbsComponent'

const App = () => {

  const [background, setBackground] = useState(true);
  const [mainpageClass, setMainpageClass] = useState('main-page main-page-animation')
  const [section, setSection] = useState('')
  
  const changeBackground = (input) => (event) => {
    if(background) setMainpageClass('main-page main-page-animation main-page-animation-out')
    setTimeout(() => {
      setBackground(false)
    }, 900);
    document.querySelectorAll('#header').forEach(el => el.className='MuiTypography-root MuiLink-root MuiLink-underlineHover makeStyles-root-2')
    event.target.className = 'MuiTypography-root MuiLink-root makeStyles-root-2 MuiLink-underlineAlways'
    setSection(input);
    event.preventDefault();
  }

  const endAnimation = () => {
    setMainpageClass('')
  }


  return ( 
    <div>
    <Header handleClick={changeBackground} classTrigger={'fixed-header' }/>
      <div className={mainpageClass} style={{width: 'auto', }}onAnimationEnd={endAnimation}>
        <TypedJSConditional background={background} />
        { background
        ? <BreadcrumbsComponent handleClick={changeBackground} classTrigger={section}/>
        : null}
        <ConnectedMainPageConditional section={section} background={background} />
      </div>
    <Footer />
  </div>
  );
}

const ConnectedMainPageConditional = ({background, section}) => 
  !background 
  ? <ConnectedMainPage section={section}/>
  : null

const TypedJSConditional = ({background}) => 
  background ?
      <TypedJS
        strings={[
          'TIME TO EXPLORE NEW SONGS',
          'USE THE MENU BELOW TO <br> BEGIN YOUR JOURNEY...',
        ]}
    />
  : null;


export const ConnectedApp = connect()(App)


