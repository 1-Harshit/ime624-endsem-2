'use client';
// Chakra imports
import {
  Portal,
  Box,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin';
import { SidebarContext } from 'contexts/SidebarContext';
import { PropsWithChildren, useEffect, useState } from 'react';
import {
  getActiveNavbar,
  getActiveNavbarText,
  getActiveRoute,
} from 'utils/navigation';

interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

// Custom Chakra theme
export default function AdminLayout(props: DashboardLayoutProps) {
  const { children, ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  // functions for changing the states from components
  const { onOpen } = useDisclosure();

  const bg = useColorModeValue('secondaryGray.300', 'navy.900');

  return (
    <Box h="100vh" w="100vw" bg={bg}>
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w='100%'
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={'DP Bank'}
                brandText={getActiveRoute([])}
                secondary={getActiveNavbar([])}
                message={getActiveNavbarText([])}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          <Box
            mx="auto"
            p={{ base: '20px', md: '30px' }}
            pe="20px"
            minH="100vh"
            pt="50px"
          >
            {children}
          </Box>
        </Box>
    </Box>
  );
}
