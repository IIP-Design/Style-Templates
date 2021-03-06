import React from 'react';
import propTypes from 'prop-types';

import Background from '../_shared/components/Background/Background';
import BlockHeading from '../_shared/components/BlockHeading/BlockHeading';
import Button from '../_shared/components/Button/Button';
import CDPFeed from '../_shared/components/CDPFeed/CDPFeed';
import Normalizer from '../_shared/components/Normalizer/Normalizer';
import VideoEmbed from '../_shared/components/VideoEmbed/VideoEmbed';

import { getVideoUrl } from '../_shared/utils/video';
import { setLightClass } from '../_shared/utils/background-style';

import './Text.module.scss';

const Text = ( { block, id, primary } ) => {
  if ( block ) {
    const {
      articles,
      backgroundGradient,
      backgroundType,
      blockBackground,
      buttons,
      desc,
      files,
      fullWidth,
      subtitle,
      textColor,
      title,
      videos,
    } = block;

    return (
      <Normalizer fullWidth={ fullWidth }>
        <Background
          backgroundType={ backgroundType }
          blockBackground={ blockBackground }
          files={ files }
          gradient={ backgroundType === 'image' && backgroundGradient === 'dark' }
        >
          <div styleName="container">
            { title && (
              <BlockHeading
                primary={ primary }
                text={ title }
                style={ { color: textColor } }
                styleName="title"
              />
            ) }
            { subtitle && (
              <h3 className="gpalab-site-specific" style={ { color: textColor } } styleName="subtitle">
                { subtitle }
              </h3>
            ) }
            <div styleName="content">
              { desc && (
                <div
                  className={ setLightClass( textColor ) }
                  dangerouslySetInnerHTML={ { __html: desc } }
                  style={ { color: textColor } }
                  styleName="description"
                />
              ) }
            </div>
            { buttons && (
              <div styleName="button-container">
                { buttons.map( button => (
                  <Button
                    key={ button.id }
                    config={ button }
                  />
                ) ) }
              </div>
            ) }
            { videos && videos.map( video => (
              <div key={ video.id } styleName="video-container">
                <VideoEmbed
                  desc={ video.description }
                  title={ video.title || video.id }
                  url={ getVideoUrl( video ) }
                />
              </div>
            ) ) }
            { articles && <CDPFeed id={ id } items={ articles } /> }
          </div>
        </Background>
      </Normalizer>
    );
  }

  return null;
};

Text.propTypes = {
  block: propTypes.shape( {
    articles: propTypes.array,
    backgroundGradient: propTypes.string,
    backgroundType: propTypes.string,
    blockBackground: propTypes.string,
    buttons: propTypes.array,
    desc: propTypes.string,
    files: propTypes.array,
    fullWidth: propTypes.bool,
    subtitle: propTypes.string,
    textColor: propTypes.string,
    title: propTypes.string,
    videos: propTypes.array,
  } ),
  id: propTypes.string,
  primary: propTypes.bool,
};

export default Text;
