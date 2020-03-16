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
          {column.map((image, i) => (
            <div className="grid-item" key={i} onClick={() => {
              if (onClick) {
                onClick(image.index);
              }
            }}>
              <Image imageInfo={image.item} key={i} />
            </div>
          ))}
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