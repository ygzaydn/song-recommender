import React, { Component } from 'react';
import  * as Typed from 'typed.js'
import './TypedJS-style.css'
import 'fontsource-roboto';

export default class TypedJS extends Component {
    componentDidMount() {
      const { strings } = this.props;
      const options = {
        strings: strings,
        typeSpeed: 50,
        backSpeed: 45,
        loop: true,
      };
      this.typed = new Typed(this.el, options);
    }
  
    componentWillUnmount() {
      this.typed.destroy();
    }
  
    render() {
      return (
        <div className="wrap">
          <div className="type-wrap">
            <span className="word"
              style={{ whiteSpace: 'pre' }}
              ref={(el) => { this.el = el; }}
            />
          </div>
        </div>
      );
    }
  }
  