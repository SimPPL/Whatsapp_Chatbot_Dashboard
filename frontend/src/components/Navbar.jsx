import {
  Box,
  Flex,
  Spacer,
  // IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
// import { MdMenu } from "react-icons/md";
// import logo from '../assets/sakhilogo.png';

const Navbar = () => {
  const displayLogo = useBreakpointValue({ base: false, md: true });
  // const [showMenu, setShowMenu] = useState(false);

  // const handleMenuToggle = () => {
  //   setShowMenu(!showMenu);
  // };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="white"
      color="white"
      position={'sticky'}
      boxShadow={'2px 1px 10px black'}
    >
      <Flex align="center" mr={5}>
          {/* <Image
            // boxSize="40px"
            // objectFit="contain"
            src={logo}
            alt="Company Logo"
            height={10}
            w={100}
          /> */}
        <Box fontSize="2xl" fontStyle={'italic'} color={'black'} fontWeight="bold" ml={displayLogo ? 2 : 0}>
          Spreeha
        </Box>
      </Flex>

      <Spacer />
    </Flex>
  );
};

export default Navbar;
