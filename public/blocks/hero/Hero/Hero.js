import React from 'react';
import propTypes from 'prop-types';

import './Hero.module.scss';
import mockData from './mockdata';
import Button from '../../_shared/Button/Button';

const Hero = ( { id } ) => {
  // const { title } = window[`quotebox${id}`];
  const { title, subtitle, description, background, buttonText, link, style, arrow } = mockData;

  return (
    <div
      styleName="content-background"
      id="hero-content-background"
      style={ { backgroundImage: `url(${background})` } }
    >
      <div styleName="header">
        <h1 styleName="header-title">{ title }</h1>
        <h3 styleName="header-subtitle">{ subtitle }</h3>
        <div styleName="header-text">
          <div styleName="header-text-column">
            <p styleName="header-text-large">{ description }</p>
            { buttonText && link && (
              <Button link={ link } text={ buttonText } style={ style } arrow={ arrow } />
            ) }
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  id: propTypes.string
};

export default Hero;