import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types'; // ES6
import { useState } from 'react';

function DeleteModal({ isOpen, onClose, onDelete, isInvalid }) {
  const [password, setPassword] = useState('');
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Text fontWeight='medium' mb='1rem' as='label' htmlFor='label'>
            Password
          </Text>
          <Input
            id='label'
            placeholder='******************'
            mb={2}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            isInvalid={isInvalid}
            errorBorderColor='red.300'
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} variant='ghost'>
            Cancel
          </Button>
          <Button colorScheme='red' onClick={() => onDelete(password)}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool.isRequired,
};

export default DeleteModal;
