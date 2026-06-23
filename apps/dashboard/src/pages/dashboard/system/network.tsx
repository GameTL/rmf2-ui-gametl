// Chakra imports
import { Box, Stack, Table } from '@chakra-ui/react';

// Custom components
import { NetworkStatusRow } from '@/components/card';
import { useState, useEffect } from 'react';
import { BrokerStatusConfig } from '@/clients';

export function Network() {
  const [servicesStatus, setServicesStatus] = useState({
    proxy: false,
    mongodb: false,
    redis: false,
    rabbitmq: false,
    postgres: false,
    it_connector: false,
    swagger: false,
    event_mgr: false,
    rmf_proxy: false,
    rmf_logger: false,
    test_logger_database: false,
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(BrokerStatusConfig.BASE + '/status', {
          method: 'GET',
          headers: {
            Accept: '*',
          },
        });
        const data = await response.json();
        setServicesStatus({
          proxy: data.data.redis.status,
          mongodb: data.data.mongodb.status,
          redis: data.data.redis.status,
          rabbitmq: data.data.rabbitmq.status,
          postgres: data.data.postgres.status,
          it_connector: data.data.it_connector.status,
          swagger: data.data.swagger.status,
          event_mgr: data.data.event_mgr.status,
          rmf_proxy: data.data.rmf_proxy.status,
          rmf_logger: data.data.rmf_logger.status,
          test_logger_database: data.data['test-logger-database'].status,
        });
      } catch (_error) {
        // console.error('Error fetching status:', error);

        setServicesStatus({
          proxy: false,
          mongodb: false,
          redis: false,
          rabbitmq: false,
          postgres: false,
          it_connector: false,
          swagger: false,
          event_mgr: false,
          rmf_proxy: false,
          rmf_logger: false,
          test_logger_database: false,
        });
      }
    };

    fetchStatus();
    const intervalId = setInterval(fetchStatus, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box>
      {/* Main Fields */}

      <Stack>
        <Table.ScrollArea maxW="full">
          <Table.Root
            size="sm"
            variant="outline"
            striped
            minW={{ base: '520px', md: 'full' }}
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader minW="124px">Status</Table.ColumnHeader>
                <Table.ColumnHeader minW="180px">Name</Table.ColumnHeader>
                <Table.ColumnHeader minW="240px">Endpoint</Table.ColumnHeader>
                <Table.ColumnHeader>Description</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <NetworkStatusRow
                name="Monitoring Service"
                description="Used for monitoring internal IOCS servicesr"
                isOnline={servicesStatus.mongodb}
                endpointBase={BrokerStatusConfig.BASE}
                responseKey="mongodb"
              />
              <NetworkStatusRow
                name="Proxy Service"
                description="Used for forwarding messages to databases, handling routing and message transformation."
                isOnline={servicesStatus.proxy}
                endpointBase={BrokerStatusConfig.BASE}
                responseKey="redis"
              />
              <NetworkStatusRow
                name="Logging Service"
                description="Service for storing data into database"
                isOnline={servicesStatus.rmf_logger}
                endpointBase={BrokerStatusConfig.BASE}
                responseKey="rmf_logger"
              />
              <NetworkStatusRow
                name="RabbitMQ Service"
                description="Service bus data broadcasting using exchange "
                isOnline={servicesStatus.rabbitmq}
                endpointBase={BrokerStatusConfig.BASE}
                responseKey="rabbitmq"
              />
              <NetworkStatusRow
                name="Postgres Service"
                description="Used for Data analytics, NGSI-LD Context broker, IT Connectors Configuration "
                isOnline={servicesStatus.postgres}
                endpointBase={BrokerStatusConfig.BASE}
                responseKey="postgres"
              />
              <NetworkStatusRow
                name="Data Model Repository Service"
                description="Internal storage for data model "
                isOnline={servicesStatus.redis}
                endpointBase={BrokerStatusConfig.BASE}
                responseKey="redis"
              />
              <NetworkStatusRow
                name="IT-Connector Service"
                description="IT data pipeline from external data source to context broker"
                isOnline={servicesStatus.it_connector}
                endpointBase={BrokerStatusConfig.BASE}
                responseKey="it_connector"
              />
              <NetworkStatusRow
                name="EventManager Service"
                description="Processes and managers system event triggers"
                isOnline={servicesStatus.event_mgr}
                endpointBase={BrokerStatusConfig.BASE}
                responseKey="event_mgr"
              />
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Stack>
    </Box>
  );
}

export default Network;
