import React from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const Masonry = ({ cols = 2, images, renderer }) => {
const columns = createColumns(images, cols);
const Image = renderer || PreviewCompatibleImage;
 return (
  <>
    <div className="grid">
      {columns.map((column, c) => (
        <div className="grid-col" key={c}>
          {column.map((image, i) => (
            <div className="grid-item" key={i}>
              <Image imageInfo={image} key={i} />
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
    arrayColumns[i % arrayColumns.length].push(item)
  });

  return arrayColumns;
}

export default Masonry;