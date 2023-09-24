import React from 'react';
import { Field, useField } from 'formik';

const FieldFileInput = ({ classes, formikProps, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  const [field, meta, helpers] = useField(rest);

  return (
    <Field name={rest.name}>
      {props => {
        const { field } = props;

        const getFileName = () => {
          if (props.field.value) {
            return field.value.name;
          }
          return '';
        };

        return (
          <div className={fileUploadContainer}>
            <label htmlFor='fileInput' className={labelClass}>
              Choose file
            </label>
            <span id='fileNameContainer' className={fileNameClass}>
              {getFileName()}
            </span>
            <input
              {...field}
              className={fileInput}
              id='fileInput'
              type='file'
              accept='.jpg, .png, .jpeg'
              value=''
              onChange={e => {
                const file = e.target.files[0];
                const imageType = /image.*/;
                if (!file.type.match(imageType)) {
                  e.target.value = '';
                  console.log('Incorrect file type');
                } else {
                  helpers.setValue(e.target.files[0]);
                }
              }}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default FieldFileInput;
