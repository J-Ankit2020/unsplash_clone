import Masonry from 'react-masonry-css';
import '../index.css';
import { Box } from '@chakra-ui/react';
import GalleryImage from './GalleryImage';
import { useEffect } from 'react';
import { ImageState } from '../ImageContext';

function Layout() {
  const { ImageData, setImageData, searchText, serverURL } = ImageState();
  useEffect(() => {
    fetch(`${serverURL}/images/all`)
      .then((res) => res.json())
      .then((data) => setImageData(data.images));
  }, []);

  const images = ImageData.filter((image) =>
    image.label.toLowerCase().includes(searchText)
  );

  return (
    <Box mt={5}>
      <Masonry
        breakpointCols={3}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {images.map((image) => (
          <GalleryImage
            src={image?.url}
            key={image?._id}
            id={image?._id}
            label={image?.label}
          />
        ))}
      </Masonry>
    </Box>
  );
}

export default Layout;
