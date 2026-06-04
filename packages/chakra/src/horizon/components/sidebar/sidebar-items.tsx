import { NavLink, useLocation } from 'react-router';
import type { AccordionRootProps } from '@chakra-ui/react';
import { Accordion, Box, Flex, HStack, Text } from '@chakra-ui/react';

import type { RoutesType } from '@/types';
import { routeMatchesLocation, routeSectionKey } from '@/utils/routes.utils';
import { useSidebarItems } from './use-sidebar';

interface SidebarItemProps {
  route: RoutesType;
  active: boolean;
  /** Section header inside accordion trigger — toggle only, never a link. */
  section?: boolean;
}

function SidebarItemLabel(props: { route: RoutesType; active: boolean }) {
  const { route, active } = props;

  const activeColor = { base: 'gray.700', _dark: 'white' };
  const activeIcon = { base: 'brand.500', _dark: 'white' };
  const textColor = { base: 'secondaryGray.500', _dark: 'secondaryGray.600' };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      w="100%"
      py="4px"
      px="6px"
      mx="-6px"
      borderRadius="md"
      transitionProperty="background-color"
      transitionDuration="0.15s"
      transitionTimingFunction="ease"
      _hover={{
        bg: { base: 'blackAlpha.50', _dark: 'whiteAlpha.100' },
      }}
    >
      <Box color={active ? activeIcon : textColor} me="18px">
        {route.icon ? route.icon : <Box width="20px" height="20px" />}
      </Box>
      <Text
        me="auto"
        color={active ? activeColor : textColor}
        fontWeight={active ? 'bold' : 'normal'}
      >
        {route.name}
      </Text>
    </Flex>
  );
}

function SidebarItem(props: SidebarItemProps) {
  const { route, active, section } = props;
  const brandColor = { base: 'brand.500', _dark: 'brand.400' };

  const label = <SidebarItemLabel route={route} active={active} />;

  return (
    <HStack w="100%" gap={active ? '22px' : '26px'} py="5px" ps="10px">
      {section ? (
        <Box flex="1" minW={0} w="100%" cursor="pointer">
          {label}
        </Box>
      ) : route.path ? (
        <NavLink style={{ width: '100%' }} to={route.path}>
          {label}
        </NavLink>
      ) : (
        <Box flex="1" minW={0} w="100%">
          {label}
        </Box>
      )}
      {section && <Accordion.ItemIndicator cursor="pointer" />}
      <Box
        h="36px"
        w="4px"
        bg={active ? brandColor : 'transparent'}
        borderRadius="5px"
      />
    </HStack>
  );
}

export interface SidebarItemsProps extends AccordionRootProps {}

export function SidebarItems(props: SidebarItemsProps) {
  const location = useLocation();
  const { routes } = useSidebarItems();

  const { ...rest } = props;

  const activeRoute = (route: RoutesType) =>
    routeMatchesLocation(route, location.pathname);

  const sectionKeys = (items: RoutesType[]) =>
    items.filter((r) => r.children?.length).map(routeSectionKey);

  return (
    <Accordion.Root multiple defaultValue={sectionKeys(routes)} {...rest}>
      {routes.map((route) =>
        route.children?.length ? (
          <Accordion.Item
            key={routeSectionKey(route)}
            value={routeSectionKey(route)}
            borderBottomWidth="0px"
          >
            <Accordion.ItemTrigger
              py="0px"
              fontSize="inherit"
              cursor="pointer"
              _hover={{ bg: 'transparent' }}
            >
              <SidebarItem route={route} section active={activeRoute(route)} />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody py="0px" ms="20px">
                {route.children.map((child) => (
                  <SidebarItem
                    key={child.path ?? child.name}
                    route={child}
                    active={activeRoute(child)}
                  />
                ))}
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ) : (
          <SidebarItem
            key={route.path ?? route.name}
            route={route}
            active={activeRoute(route)}
          />
        ),
      )}
    </Accordion.Root>
  );
}

export default SidebarItems;
