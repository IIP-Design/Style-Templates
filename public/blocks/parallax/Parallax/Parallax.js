import React from 'react';
import propTypes from 'prop-types';

import Background from 'blocks/_shared/components/Background/Background';
import Button from 'blocks/_shared/components/Button/Button';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';

import './Parallax.module.scss';

const Parallax = ( { id } ) => {
  const { meta } = window[`gpalabParallax${id}`];

  if ( meta ) {
    const {
      buttonArrow,
      buttonBorder,
      buttonColor,
      buttonLink,
      buttonText,
      desc,
      files,
      fullWidth,
      hasButton,
      subtitle,
      title,
    } = meta;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <Background
          backgroundType="image"
          files={ files }
          gradient
          styles={ { backgroundAttachment: 'fixed' } }
        >
          <div styleName="fixed">
            <div styleName="content">
              { title && <h2 className="gpalab-site-specific" styleName="title">{ title }</h2> }
              { subtitle && <h3 className="gpalab-site-specific" styleName="subtitle">{ subtitle }</h3> }
              { desc && <div className="light" dangerouslySetInnerHTML={ { __html: desc } } styleName="text" /> }
              { hasButton && (
                <Button
                  arrow={ buttonArrow }
                  border={ buttonBorder }
                  color={ buttonColor }
                  link={ buttonLink }
                  text={ buttonText }
                />
              ) }
            </div>
          </div>
        </Background>
      </Normalizer>
    );
  }

  return null;
};

Parallax.propTypes = {
  id: propTypes.string,
};

export default Parallax;
