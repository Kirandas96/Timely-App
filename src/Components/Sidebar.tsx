import React, { ReactNode } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {BsFillClockFill,BsFillBagFill, BsBarChartFill, BsFillArrowUpSquareFill} from "react-icons/bs"
import {MdTask} from "react-icons/md"
import {ImUser} from "react-icons/im"
import {AiFillDollarCircle} from "react-icons/ai"
import { ReactText } from 'react';

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: '', icon: BsFillArrowUpSquareFill },
  { name: 'HOURS', icon: BsFillClockFill },
  { name: 'TASK', icon: MdTask },
  { name: 'PROJECTS', icon: BsFillBagFill },
  { name: 'PEOPLE', icon: ImUser },
  { name: 'REPORTS', icon: BsBarChartFill },
  { name: 'INVOICES', icon: AiFillDollarCircle },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Box ml={{ base: "full", md: 20 }} >
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 20 }}
      pos="absolute"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.name}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  link:string
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  console.log(link);
  
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        {...rest} direction="column" fontSize="12px" fontWeight="Bold" justifyContent="center">
        {icon && (
          <Icon
            fontSize="30"
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

