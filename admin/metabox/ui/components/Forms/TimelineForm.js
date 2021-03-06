import React, { Fragment, useContext } from 'react';

import TabbedForm from 'metabox/components/Forms/TabbedForm/TabbedForm';
import FullWidthToggle from 'metabox/components/Forms/Toggles/FullWidthToggle';
import { AdminContext } from 'metabox/context/adminContext';
import { handleChange } from 'metabox/utils/event-handlers';

const TimelineForm = () => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const tabFields = [
    { label: 'Add Event Title:', name: 'subtitle', tabTitle: true, type: 'text' },
    { label: 'Add event background image:', name: 'backgroundImage', type: 'file' },
    { label: 'Add Event Year:', name: 'year', type: 'text' },
    { label: 'Add Event Text (Short description of event):', name: 'text', type: 'text' },
  ];

  return (
    <Fragment>
      <label htmlFor="events-title">
        Add Block Title:
        <input
          id="events-title"
          name="title"
          type="text"
          value={ formValues.title || '' }
          onChange={ e => handleChange( e, dispatch ) }
        />
      </label>
      <TabbedForm fields={ tabFields } group="timeline" label="Event" maxTabs={ 5 } />
      <FullWidthToggle checked={ formValues.fullWidth } />
    </Fragment>
  );
};

export default TimelineForm;
