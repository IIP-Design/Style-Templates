import React from 'react';
import propTypes from 'prop-types';

import CDPFeedItem from './CDPFeedItem';

import './CDPFeed.module.scss';

const CDPFeed = ( { id, items } ) => {
  let feedType = '';
  if ( items.length === 1 ) {
    feedType = 'single';
  }

  if ( items.length === 3 ) {
    feedType = 'three';
  }

  const getSource = alias => {
    switch ( alias ) {
      case 'share':
        return 'share.america.gov';
      case 'yali':
        return 'yali.america.gov';
      case 'ylai':
        return 'ylai.america.gov';
      default:
        return null;
    }
  };

  return (
    <div styleName={ `cdp-feed ${feedType}` } id={ `cdp-feed-${id}` }>
      { items.map( item => (
        <CDPFeedItem id={ item.postId } key={ item.postId } source={ getSource( item.source ) } />
      ) ) }
    </div>
  );
};

CDPFeed.propTypes = {
  id: propTypes.string,
  items: propTypes.array
};

export default CDPFeed;
