import React, {useState} from 'react';
import { connect } from 'react-redux'
import './App.css';
import 'fontsource-roboto';
import { Header } from './components/Header-Component/Header'
import { ConnectedMainPage } from './components/MainPage'
import TypedJS from './components/TypedJS-Component/TypedJS'
import { Footer } from './components/Footer-Component/Footer'
import { BreadcrumbsComponent } from './components/BreadcrumbsComponent'
import { mapDispatchToProps, mapStateToProps } from './store'


const App = ({onStateChange}) => {

  const [background, setBackground] = useState(true);
  const [mainpageClass, setMainpageClass] = useState('main-page main-page-animation')
  const [section, setSection] = useState('')
  
  const handleClick = (input, pageEvent) => (event) => {
    if(background) setMainpageClass('main-page main-page-animation main-page-animation-out')
    setTimeout(() => {
      setBackground(false)
    }, 900);
    document.querySelectorAll('#header').forEach(el => el.className='MuiTypography-root MuiLink-root MuiLink-underlineHover makeStyles-root-2')
    event.target.className = 'MuiTypography-root MuiLink-root makeStyles-root-2 makeStyles-underlineTypo-7'
    if(pageEvent) onStateChange('ArtistRecommend')
    setSection(input);
    event.preventDefault();
  }

  const endAnimation = () => {
    setMainpageClass('')
  }

  return ( 
    <div>
    <Header handleClick={handleClick} classTrigger={'fixed-header'}/>

      <div className={mainpageClass} onAnimationEnd={endAnimation}>
        <TypedJSConditional background={background} />
        { background
        ? <BreadcrumbsComponent handleClick={handleClick} classTrigger={section}/>
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


export const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App)
