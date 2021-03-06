import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';
import { checkForFile } from 'metabox/utils/helpers';

import './FileUploader.module.scss';

const FileUploader = ( { label, name, parentGroup, parentId } ) => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const { wp } = window;

  const addFileDispatch = file => {
    if ( parentGroup ) {
      dispatch( {
        type: 'file-add-nested',
        payload: { file, name, parentGroup, parentId },
      } );
    } else {
      dispatch( { type: 'file-add', payload: { file, name } } );
    }
  };

  const frameOptions = {
    title: label,
    button: {
      text: 'Use this file',
    },
    multiple: false,
  };

  const frame = wp ? wp.media( frameOptions ) : {};

  frame.on( 'select', () => {
    const { attributes } = frame
      .state()
      .get( 'selection' )
      .first();

    addFileDispatch( {
      alt: attributes.alt,
      name: attributes.filename,
      type: attributes.type,
      url: attributes.url,
    } );
  } );

  const openFrame = () => frame.open();

  const handleFile = e => {
    const file = e.target.files[0];

    addFileDispatch( file );
  };

  const handleFileRemoval = () => {
    if ( parentGroup ) {
      dispatch( {
        type: 'file-remove-nested',
        payload: { name, parentGroup, parentId },
      } );
    } else {
      dispatch( { type: 'file-remove', payload: { name } } );
    }
  };

  if ( formValues ) {
    const current = checkForFile( name, formValues, parentGroup, parentId );

    return (
      <label htmlFor="file-uploader" styleName="label">
        { label }
        { current && (
          <div styleName="existing-file">
            <p>
              <strong>Current file: </strong>
              { current.filename || 'Pending upload...' }
            </p>
            <button styleName="button" type="button" onClick={ () => handleFileRemoval() }>
              Remove This File
            </button>
          </div>
        ) }
        { !current && wp && (
          <div styleName="native-uploader">
            <button type="button" onClick={ openFrame }>Choose File</button>
            No file chosen
          </div>
        ) }
        { !current && !wp && <input name={ name } styleName="js-uploader" type="file" onChange={ e => handleFile( e ) } /> }
      </label>
    );
  }

  return null;
};

FileUploader.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  parentGroup: propTypes.string,
  parentId: propTypes.string,
};

FileUploader.defaultProps = {
  label: 'Upload a file:',
  parentGroup: null,
  parentId: null,
};

export default FileUploader;
