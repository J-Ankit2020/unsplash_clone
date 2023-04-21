import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import PropTypes from 'prop-types'; // ES6
import { SearchIcon } from '@chakra-ui/icons';
import logo from '../assets/logo.svg';
import { ImageState } from '../ImageContext';
function NavBar({ onOpen }) {
  const { searchText, setSearchText } = ImageState();
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <HStack spacing={2}>
        <img src={logo} alt='logo' />
        <InputGroup variant='outline'>
          <InputLeftElement
            pointerEvents='none'
            // eslint-disable-next-line react/no-children-prop
            children={<SearchIcon color={'#BDBDBD'} />}
          />
          <Input
            type='tel'
            placeholder='Search by Name'
            rounded='xl'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </InputGroup>
      </HStack>
      <Button
        colorScheme='green'
        variant={'solid'}
        size='md'
        shadow='lg'
        paddingY={6}
        onClick={onOpen}
      >
        Add a photo
      </Button>
    </Flex>
  );
}

NavBar.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

export default NavBar;
