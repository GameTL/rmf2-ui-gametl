import { Icon } from '@chakra-ui/react';
import { MdOutlineTask, MdHome, MdMap } from 'react-icons/md';
import { FaNetworkWired } from 'react-icons/fa';
import { SiUnrealengine } from 'react-icons/si';
import { GrSystem, GrSchedules } from 'react-icons/gr';

import type { RoutesType } from '@rmf2-ui/chakra';

export const routes: RoutesType[] = [
  {
    name: 'Home',
    path: '/home',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'System',
    path: '/system',
    icon: <Icon as={GrSystem} width="20px" height="20px" color="inherit" />,
    children: [
      {
        name: 'Network',
        path: '/system/network',
        icon: (
          <Icon
            as={FaNetworkWired}
            width="20px"
            height="30px"
            color="inherit"
          />
        ),
      },
      {
        name: 'Simulation',
        icon: (
          <Icon
            as={SiUnrealengine}
            width="20px"
            height="30px"
            color="inherit"
          />
        ),
        path: '/system/simulation',
      },
      {
        name: 'Map',
        path: '/system/map',
        icon: (
          <Icon as={MdMap} width="20px" height="30px" color="inherit" />
        ),
      },
    ],
  },
  {
    name: 'Operation',
    path: '/operation',
    icon: (
      <Icon as={MdOutlineTask} width="20px" height="30px" color="inherit" />
    ),
    children: [
      {
        name: 'Schedule',
        path: '/operation/schedule',
        icon: (
          <Icon as={GrSchedules} width="20px" height="30px" color="inherit" />
        ),
      },
    ],
  },
];

export default routes;
