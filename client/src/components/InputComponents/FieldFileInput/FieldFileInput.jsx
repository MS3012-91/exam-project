import React from 'react';
import { Field, useField } from 'formik';

const FieldFileInput = ({ classes, formikProps, isEditContest, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  const [field, meta, helpers] = useField(rest);

  return (
    <Field name={rest.name} >
      {(props) => {
        const { field } = props;
        const getFileName = () => {
          if (props.field.value) {
            const files = Array.isArray(props.field.value)
              ? props.field.value
              : [props.field.value];
            const fileNames = files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ));
            return <ul>{fileNames}</ul>;
          }
          return '';
        };
        if (isEditContest) {
          return (
            <div className={fileUploadContainer}>
              <label htmlFor="fileInput" className={labelClass}>
                Choose file
              </label>
              <span id="fileNameContainer" className={fileNameClass}>
                {getFileName()}
              </span>
              <input
                {...field}
                className={fileInput}
                id="fileInput"
                type="file"
                accept=".jpg, .png, .jpeg"
                value=""
                onChange={(e) => {
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
        }
        else {
          return (
            <div className={fileUploadContainer}>
              <label htmlFor="fileInput" className={labelClass}>
                Choose up to 3 files
              </label>
              <span id="fileNameContainer" className={fileNameClass}>
                {getFileName()}
              </span>
              <input
                {...field}
                className={fileInput}
                id="fileInput"
                type="file"
                accept=".jpg, .png, .jpeg"
                value=""
                multiple
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);
                  if (selectedFiles.length > 3) {
                    console.log(
                      'Too many files selected. Please select up to 3 files.'
                    );
                    e.target.value = '';
                    return;
                  }
                  const imageType = /image.*/;
                  const validFiles = selectedFiles.filter((file) =>
                    file.type.match(imageType)
                  );
                  if (validFiles.length === selectedFiles.length) {
                    helpers.setValue(validFiles);
                  } else {
                    console.log('Some selected files are not correct images');
                    return;
                  }
                }}
              />
            </div>
          );
        }      
          
       
      }}
    </Field>
  );
};

export default FieldFileInput;
