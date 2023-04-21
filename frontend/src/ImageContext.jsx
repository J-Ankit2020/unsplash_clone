import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // ES6
const Image = createContext({
  ImageData: [],
  serverURL: 'http://localhost:5000/api/v1',
  searchText: '',
});
function ImageContextProvider({ children }) {
  const serverURL = 'http://localhost:5000/api/v1';
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
