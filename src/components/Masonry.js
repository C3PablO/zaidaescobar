import React from 'react'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const Masonry = ({ cols = 2, images, renderer }) => {
const columns = createColumns(images, images.length / cols);
const Image = renderer || PreviewCompatibleImage;
 return (
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
 );
};

const createColumns = (array = [], chunk = 2) => {
  let i;
  let j;
  let temparray;
  const arrays = [];
  for (i = 0, j = array.length; i < j; i += chunk) {
      temparray = array.slice(i,i+chunk);
      arrays.push(temparray);
  }
  return arrays;
}

export default Masonry;