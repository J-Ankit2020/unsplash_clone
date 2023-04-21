import {
  Box,
  Button,
  Heading,
  Image,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types'; // ES6
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import { ImageState } from '../ImageContext';

function GalleryImage({ src, id, label }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInvalid, setIsInvalid] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { serverURL, setImageData } = ImageState();
  const toast = useToast();
  const handleDelete = async (password) => {
    try {
      const res = await fetch(`${serverURL}/images/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      const { success } = await res.json();
      if (!success) return setIsInvalid(true);
      setImageData((prev) => prev.filter((val) => val._id !== id));
      toast({
        title: 'Deleted Successfully',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      rounded={'xl'}
      shadow={'lg'}
      position={'relative'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={handleDelete}
        isInvalid={isInvalid}
      />
      {isHovered && (
        <Box
          position='absolute'
          bg={'rgba(0, 0, 0, 0.38)'}
          w='full'
          transition={'all 2s ease-in-out'}
          rounded={'xl'}
          h='full'
        >
          <Heading
            color='#FFFFFF'
            as='h1'
            size='lg'
            position='absolute'
            bottom={10}
            left={2}
            textAlign='start'
          >
            {label}
          </Heading>
          <Button
            right={4}
            fontWeight={'bold'}
            top={5}
            rounded={'xl'}
            size='md'
            bg={'transparent'}
            color='#EB5757'
            border='2px solid #EB5757'
            colorScheme='red'
            position='absolute'
            onClick={onOpen}
          >
            Delete
          </Button>
        </Box>
      )}
      <Image src={src} rounded={'xl'} />
    </Box>
  );
}

GalleryImage.propTypes = {
  src: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
};

export default GalleryImage;
