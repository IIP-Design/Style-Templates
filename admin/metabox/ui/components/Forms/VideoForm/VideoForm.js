import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ReactQuill from 'react-quill';

import RadioConditional from 'metabox/components/Forms/Toggles/RadioConditional';

import { AdminContext } from 'metabox/context/adminContext';
import { getModules } from 'metabox/utils/quill';
import {
  handleAddNested,
  handleChangeNested,
  handleRemoveNested,
} from 'metabox/utils/event-handlers';

import './VideoForm.module.scss';

const VideoForm = ( { parentGroup, parentId } ) => {
  const brightcove = window?.gpalabBlockAdmin?.brightcove;

  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const fields = [
    { name: 'description' }, { name: 'title' }, { name: 'url' },
  ];

  const bc = { label: 'Brightcove', name: 'source', value: 'brightcove' };
  const yt = { label: 'YouTube', name: 'source', value: 'youtube' };

  const videoSource = brightcove ? [bc, yt] : [yt];

  if ( formValues ) {
    let videos;

    if ( !parentGroup ) {
      videos = formValues.videos || [];
    } else {
      const group = formValues[parentGroup] || [];
      const current = group.filter( item => item.id === parentId )[0];

      videos = current.videos || [];
    }

    return (
      <div styleName="container">
        { videos.map( video => {
          const handleQuill = value => {
            if ( !parentGroup ) {
              dispatch( { type: 'group-input', payload: { group: 'videos', itemId: video.id, name: 'description', value } } );
            } else {
              dispatch( { type: 'group-input-nested', payload: { group: 'videos', itemId: video.id, name: 'description', parentGroup, parentId, value } } );
            }
          };

          return (
            <div key={ video.id } styleName="form">
              <strong styleName="title">Video Data:</strong>
              <RadioConditional
                checked={ video.source }
                group={ { id: video.id, name: 'videos' } }
                label="What is the video source?"
                options={ videoSource }
                parentGroup={ parentGroup }
                parentId={ parentId }
              />
              { video.source === 'youtube' && (
                <label htmlFor={ `video-url-${video.id}` } styleName="label">
                  Add video URL:
                  <input
                    data-itemid={ video.id }
                    id={ `video-url-${video.id}` }
                    name="url"
                    type="text"
                    value={ video.url || '' }
                    onChange={ e => handleChangeNested( e, dispatch, 'videos', parentGroup, parentId ) }
                  />
                </label>
              ) }
              { video.source === 'brightcove' && (
                <label htmlFor={ `video-brightcove-${video.id}` } styleName="label">
                  Add Brightcove ID:
                  <input
                    data-itemid={ video.id }
                    id={ `video-brightcove-${video.id}` }
                    name="brightcove"
                    type="text"
                    value={ video.brightcove || '' }
                    onChange={ e => handleChangeNested( e, dispatch, 'videos', parentGroup, parentId ) }
                  />
                </label>
              ) }
              <label htmlFor={ `video-title-${video.id}` } styleName="label">
                Add title:
                <input
                  data-itemid={ video.id }
                  id={ `video-title-${video.id}` }
                  name="title"
                  type="text"
                  value={ video.title || '' }
                  onChange={ e => handleChangeNested( e, dispatch, 'videos', parentGroup, parentId ) }
                />
              </label>
              <label htmlFor={ `video-desc-${video.id}` } styleName="label-stacked">
                Additional text:
                <ReactQuill
                  id={ `video-desc-${video.id}` }
                  modules={ getModules( ['align', 'lists'] ) }
                  theme="snow"
                  value={ video.description || '' }
                  onChange={ handleQuill }
                />
              </label>
              <button
                className="button-secondary"
                data-itemid={ video.id }
                styleName="button-remove"
                type="button"
                onClick={ e => handleRemoveNested( e, dispatch, 'videos', parentGroup, parentId ) }
              >
                Remove Video
              </button>
            </div>
          );
        } ) }
        <button
          className="button-secondary"
          style={ videos && videos.length > 0 ? { display: 'none' } : { display: 'block' } }
          styleName="button-add"
          type="button"
          onClick={ () => handleAddNested( dispatch, fields, 'videos', parentGroup, parentId ) }
        >
          Add Video
        </button>
      </div>
    );
  }

  return null;
};

VideoForm.propTypes = {
  parentGroup: propTypes.string,
  parentId: propTypes.string,
};

VideoForm.defaultProps = {
  parentGroup: null,
  parentId: null,
};

export default VideoForm;
