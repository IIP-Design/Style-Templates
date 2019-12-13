import React from 'react';
import propTypes from 'prop-types';

import './FullWidthToggle.module.scss';

const FullWidthToggle = ( { callback, checked } ) => (
  <div>
    <label htmlFor="full-width-toggle" styleName="toggle-label">
      Make this block full-page width?
      <input
        checked={ checked }
        id="full-width-toggle"
        onChange={ () => callback() }
        styleName="toggle-checkbox"
        type="checkbox"
      />
    </label>
  </div>
);

FullWidthToggle.propTypes = {
  callback: propTypes.func,
  checked: propTypes.bool
};

export default FullWidthToggle;