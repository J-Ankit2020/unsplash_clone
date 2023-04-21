import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types'; // ES6
import { ImageState } from '../ImageContext';
import { useState } from 'react';

function ModalWrapper({ isOpen, onClose }) {
  const { serverURL, setImageData } = ImageState();
  const toast = useToast();
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    try {
      setIsLoading(true);
      const res = await fetch(`${serverURL}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ label, url }),
      });
      const data = await res.json();
      if (!data.success) {
        return setIsInvalid(true);
      }
      const { image } = data;
      setImageData((prev) => [image, ...prev]);
      toast({
        title: 'Image Added',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setLabel('');
      setUrl('');
      onClose();
      setIsLoading(false);
      isInvalid(false);
    } catch (error) {
      setIsLoading(false);
      setLabel('');
      setUrl('');
      onClose();
    }
  }
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new photo</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Text fontWeight='medium' mb='1rem' as='label' htmlFor='label'>
            Label
          </Text>
          <Input
            id='label'
            placeholder='Suspendisse elit massa'
            mb={2}
            value={label}
            onChange={(event) => setLabel(event.target.value)}
          />
          <Flex justifyContent={'space-between'} mb={-3}>
            <Text fontWeight='medium' mb='1rem' as='label' htmlFor='url'>
              URL
            </Text>
            {isInvalid && (
              <Text fontSize={'sm'} color='red.300'>
                Enter a Valid URL
              </Text>
            )}
          </Flex>
          <Input
            id='url'
            placeholder='https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r...'
            value={url}
            isInvalid={isInvalid}
            errorBorderColor='red.300'
            onChange={(event) => setUrl(event.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} variant='ghost'>
            Cancel
          </Button>
          <Button
            colorScheme='green'
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
ModalWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalWrapper;
