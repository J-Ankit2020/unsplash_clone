import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // ES6
const Image = createContext({
  ImageData: [],
  serverURL: 'https://unsplash-n7zv.onrender.com/api/v1',
  searchText: '',
});
function ImageContextProvider({ children }) {
  const serverURL = 'https://unsplash-n7zv.onrender.com/api/v1';
  const [ImageData, setImageData] = useState([]);
  const [searchText, setSearchText] = useState('');
  return (
    <Image.Provider
      value={{ ImageData, setImageData, serverURL, searchText, setSearchText }}
    >
      {children}
    </Image.Provider>
  );
}

export const ImageState = () => useContext(Image);

ImageContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ImageContextProvider;
