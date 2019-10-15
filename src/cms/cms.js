import React from 'react';
import { SketchPicker } from 'react-color'
import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'


class ColorControl extends React.PureComponent {
  render() {
    return (
      <SketchPicker
        disableAlpha
        presetColors={[]}
        color={this.props.value}
        onChange={(color) => this.props.onChange(color.hex)}
      />
    )
  }
}

const ColorPreview = ({ value }) => {
  return (
    <div>
    <div style={{
      background: value,
      width: '100%',
      color: '#fefffb',
      borderRadius: 5,
      display: 'flex',
    }}
    >
      <h3 style={{ opacity: 0.8, width: '100%', textAlign: 'center' }}>Color</h3>
    </div>
    </div>
  );
}

CMS.registerWidget('color', ColorControl, ColorPreview);

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

// adding templates
// CMS.registerPreviewTemplate('index', IndexPagePreview)
