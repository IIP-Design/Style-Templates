import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import { getFromCDP, parseFeedItemData } from '../../utils/cdp';

import './CDPFeed.module.scss';

const CDPFeedItem = ( { id, source } ) => {
  const [data, setData] = useState( null );

  useEffect( () => {
    const initalize = async () => {
      const response = await getFromCDP( id, source ).then( result => parseFeedItemData( result ) );

      setData( response );
    };

    initalize();
  }, [id] );

  if ( data ) {
    return (
      <div styleName="feed-item" key={ id } style={ { backgroundImage: `url('${data.image}')` } }>
        <a styleName="feed-item-link" href={ data.link }>
          <div>
            <p styleName="feed-item-title">{ data.title }</p>
          </div>
        </a>
      </div>
    );
  }

  return null;
};

CDPFeedItem.propTypes = {
  id: propTypes.string,
  source: propTypes.string
};

export default CDPFeedItem;
