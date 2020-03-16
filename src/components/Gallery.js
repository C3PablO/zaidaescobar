import React from 'react'
import Lightbox from 'react-image-lightbox';


export default class Gallery extends React.PureComponent {
  static onImageLoadError(imageSrc, _srcType, errorEvent) {
    console.error(`Could not load image at ${imageSrc}`, errorEvent); // eslint-disable-line no-console
  }

  constructor(props) {
    super(props);

    this.state = {
      index: this.props.index || 0,
      isOpen: false,
    };

    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.moveNext = this.moveNext.bind(this);
    this.movePrev = this.movePrev.bind(this);
  }

  openLightbox(index = 0) {
    this.setState({ isOpen: true, index: index });
  }

  closeLightbox() {
    this.setState({ isOpen: false, index: undefined });
  }

  moveNext() {
    this.setState(prevState => ({
      index: (prevState.index + 1) % this.props.images.length,
    }));
  }

  movePrev() {
    this.setState(prevState => ({
      index: (prevState.index + this.props.images.length - 1) % this.props.images.length,
    }));
  }

  render() {
    const { images } = this.props;
    let lightbox;
    if (this.state.isOpen) {
      lightbox = (
        <Lightbox
          imagePadding={50}
          mainSrc={images[this.state.index]}
          nextSrc={images[(this.state.index + 1) % images.length]}
          prevSrc={
            images[(this.state.index + images.length - 1) % images.length]
          }
          onCloseRequest={this.closeLightbox}
          onMovePrevRequest={this.movePrev}
          onMoveNextRequest={this.moveNext}
          onImageLoadError={Gallery.onImageLoadError}
        />
      );
    }

    return lightbox || '';
  }
}
