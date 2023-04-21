import Gallery from './components/Gallery';
import NavBar from './components/NavBar';
import { chakra, useDisclosure } from '@chakra-ui/react';
import Modal from './components/ModalWrapper';
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <chakra.div className='App' padding={4} margin={2}>
      <Modal onClose={onClose} isOpen={isOpen} />
      <NavBar onOpen={onOpen} />
      <Gallery />
    </chakra.div>
  );
}

export default App;
