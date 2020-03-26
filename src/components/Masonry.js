import React from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const Masonry = ({ cols = 2, images, renderer, onClick }) => {
const columns = createColumns(images, cols);
const Image = renderer || PreviewCompatibleImage;

 return (
  <>
    <div className="grid">
      {columns.map((column, c) => (
        <div className="grid-col" key={c}>
          {column.map((image, i) => {
            const interactiveProps = renderer ? {} : {
              tabIndex: '0',
              'aria-label': "open gallery",
              role: 'button',
              onKeyPress: (e) => {
                if(onClick && e.key === 'Enter') {
                  onClick(image.index);
                }
              },
                onClick: () => {
                if (onClick) {
                  onClick(image.index);
                }
              },
            }
            return (
              <div key={i} className="grid-item" {...interactiveProps}>
                <Image imageInfo={image.item} />
              </div>
            );
        })}
        </div>
      ))}
    </div>
  </>
 );
};

const createColumns = (array = [], chunk = 2) => {
  const arrayColumns = [];
  for (let i = 0; i < chunk; i++) {
    arrayColumns.push([]);
  }
  array.forEach((item, i) => {
    arrayColumns[i % arrayColumns.length].push({ item, index: i})
  });

  return arrayColumns;
}

export default Masonry;