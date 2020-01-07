import React from 'react';
import propTypes from 'prop-types';

import CDPFeed from 'blocks/_shared/components/CDPFeed/CDPFeed';
import Button from 'blocks/_shared/components/Button/Button';
import Normalizer from 'blocks/_shared/components/Normalizer/Normalizer';
import VideoEmbed from 'blocks/_shared/components/VideoEmbed/VideoEmbed';

import { backgroundStyle } from 'blocks/_shared/utils/background-style';
import './Text.module.scss';

const Text = ({ id }) => {
  const { assets } = window.gpalabTemplateFront;
  const { meta } = window[`gpalabText${id}`];

  if (meta) {
    const {
      articles,
      blockBackground,
      buttonArrow,
      buttonLink,
      buttonStyle,
      buttonText,
      desc,
      fullWidth,
      hasButton,
      subtitle,
      textColor,
      title,
      videoTitle,
      videoURL
    } = meta;

    const bg = backgroundStyle(blockBackground, assets);

    return (
      <Normalizer fullWidth={fullWidth}>
        <div style={bg} styleName="bg">
          <div styleName="container">
            {title && (
              <h2 style={{ color: textColor }} styleName="title">
                {title}
              </h2>
            )}
            {subtitle && (
              <h3 style={{ color: textColor }} styleName="subtitle">
                {subtitle}
              </h3>
            )}
            <div styleName="content">
              {desc && (
                <div style={{ color: textColor }} styleName="description">
                  {desc}
                </div>
              )}
            </div>
            {hasButton && (
              <Button arrow={buttonArrow} link={buttonLink} style={buttonStyle} text={buttonText} />
            )}
          </div>
          {videoURL && <VideoEmbed title={videoTitle} url={videoURL} />}
          {articles && <CDPFeed id={id} items={articles} />}
        </div>
      </Normalizer>
    );
  }

  return null;
};

Text.propTypes = {
  id: propTypes.string
};

export default Text;
