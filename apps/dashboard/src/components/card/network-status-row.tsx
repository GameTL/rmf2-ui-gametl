// Chakra imports
import { Badge, HStack, Icon, Table, Text, VStack } from '@chakra-ui/react';
// Assets
import { IoWifi } from 'react-icons/io5'; // Online icon
import { FiWifiOff } from 'react-icons/fi'; // Offline icon

export interface NetworkStatusRowProps {
  name: string;
  description: string;
  isOnline: boolean;
  endpointBase: string; // e.g. BrokerStatusConfig.BASE
  responseKey: string; // e.g. 'mongodb' -> renders data.mongodb.status
  statusPath?: string;
}

function parseEndpoint(base: string): { protocol: string; host: string } {
  try {
    const url = new URL(base);
    return {
      protocol: url.protocol.replace(':', '').toUpperCase(),
      host: url.host,
    };
  } catch {
    return { protocol: 'HTTP', host: base };
  }
}

export function NetworkStatusRow(props: NetworkStatusRowProps) {
  const {
    name,
    description,
    isOnline,
    endpointBase,
    // responseKey,
    statusPath = '/status',
  } = props;

  const StatusIcon = isOnline ? IoWifi : FiWifiOff;
  const iconColor = isOnline ? 'green.500' : 'red.500';
  const statusLabel = isOnline ? 'Online' : 'Offline';
  const statusColor = isOnline ? 'green.600' : 'red.600';
  const { protocol, host } = parseEndpoint(endpointBase);

  return (
    <Table.Row>
      <Table.Cell verticalAlign="middle">
        <HStack gap="3">
          <Icon as={StatusIcon} color={iconColor} boxSize="40px" aria-hidden />
          <Text fontSize="sm" fontWeight="medium" color={statusColor}>
            {statusLabel}
          </Text>
        </HStack>
      </Table.Cell>
      <Table.Cell verticalAlign="top">
        <Text fontWeight="semibold">{name}</Text>
      </Table.Cell>
      <Table.Cell verticalAlign="top">
        <VStack align="start" gap="1">
          <HStack gap="1" flexWrap="wrap">
            <Badge colorPalette="purple" size="sm" fontFamily="mono">
              {protocol}
            </Badge>
            <Text fontSize="xs" fontFamily="mono" color="fg.muted">
              {host + statusPath}
            </Text>
          </HStack>
          <Text fontSize="xs" fontFamily="mono" color="fg.subtle">
            ↳
          </Text>
        </VStack>
      </Table.Cell>
      <Table.Cell verticalAlign="top" color="fg.muted">
        {description}
      </Table.Cell>
    </Table.Row>
  );
}

export default NetworkStatusRow;
