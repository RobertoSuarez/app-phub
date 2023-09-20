import {
  Box,
  Grid,
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
  Tag,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useParams } from 'react-router-dom';
import { db } from '../db/configdb';
import { doc, getDoc } from 'firebase/firestore';
import { Solution } from '../interfaces/Solutions';

let plots: any[] = [];
let traceClients: any[] = [];
let lineClientToServer: any[] = [];

export const Grafico = () => {
  const { id } = useParams();

  const { colorMode } = useColorMode();

  const [data, setData] = useState<Solution | null>(null);
  const [stateServers, setStateServers] = useState<any[]>();
  const [stateClients, setStateClients] = useState<any[]>();
  const [stateLines, setStateLines] = useState<any[]>();
  const [stateLayout, setStateLayout] = useState<Partial<Plotly.Layout>>({
    width: 900,
    height: 500,
    title: 'Gráfico del Algoritmo P-HUB',
    paper_bgcolor: '',
  });

  const bg = useColorModeValue('gray.50', 'gray.800');
  const color = useColorModeValue('black', 'white');
  const colorSecondary = useColorModeValue('gray.600', 'gray.200');
  const paperbg = useColorModeValue('#F7FAFC', '#1A202C');

  const drawGraph = (dataDoc: Solution) => {
    plots = [];
    traceClients = [];
    lineClientToServer = [];

    const colors = [
      'black',
      'purple',
      'green',
      'brown',
      'blue',
      'red',
      'orange',
      'gray',
      'pink',
      'yellow',
    ];

    dataDoc.servers.forEach((server, i) => {
      let color = colors[i];
      plots.push({
        x: [server.hub.point.x],
        y: [server.hub.point.y],
        type: 'scatter',
        name: `Server: ${server.hub.nodeNumber}`,
        mode: 'markers',
        marker: { color: color, size: 15 },
      });

      server.clients.forEach((client) => {
        traceClients.push({
          x: [client.hub.point.x],
          y: [client.hub.point.y],
          type: 'scatter',
          name: `Client ${client.hub.nodeNumber} for server ${server.hub.nodeNumber}`,
          line: { color: color, width: 1 },
          showlegend: false,
        });

        lineClientToServer.push({
          x: [server.hub.point.x, client.hub.point.x],
          y: [server.hub.point.y, client.hub.point.y],
          mode: 'lines',
          type: 'scatter',
          showlegend: false,
          line: {
            width: 0.5,
            color: color,
          },
        });
      });
    });

    setStateServers(plots);
    setStateClients(traceClients);
    setStateLines(lineClientToServer);
  };

  useEffect(() => {
    const getData = async () => {
      if (!id) {
        return;
      }
      const docRef = doc(db, 'resultados', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data() as Solution;
        setData(docData);
        drawGraph(docData);
      } else {
        console.log('No existe el documento');
      }
    };

    getData();
  }, [id]);

  useEffect(() => {
    if (!data) return;
  }, [data]);

  return (
    <Box display="flex" flexDirection="column">
      <Box
        marginX={16}
        marginBottom={4}
        py={4}
        px={8}
        shadow="base"
        rounded={'md'}
        background={bg} // Fondo con transparencia
        backdropFilter="blur(10px)" // Efecto de vidrio empañado
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {!data ? (
          <Stack>
            <Skeleton height="20px" width="900px"></Skeleton>
            <Skeleton height="20px" width="900px"></Skeleton>
          </Stack>
        ) : (
          <>
            <Box>
              <Text fontSize="2xl" fontWeight={'medium'} color={color}>
                Gráfico de la solución
              </Text>
              <Text color={colorSecondary}>Detalles del análisis</Text>
            </Box>
            <Box display={'flex'} gap={4}>
              <Tag colorScheme="blue" variant={'subtle'}>
                Iteraciones: {data?.iterations}
              </Tag>
              <Tag colorScheme="blue" variant={'subtle'}>
                Solución: {data?.solution.toFixed(2)}
              </Tag>
              <Tag colorScheme="blue" variant={'subtle'}>
                Tiempo: {data?.timeElapsed.toFixed(2)} seg
              </Tag>
            </Box>
          </>
        )}
      </Box>

      <Box
        flex={1}
        marginX={16}
        bg={bg}
        shadow="base"
        rounded="md"
        p={8}
        marginBottom={16}
      >
        <Box width="100%" display="flex" justifyContent="center">
          {stateServers && stateClients && stateLines ? (
            <Plot
              data={[...stateServers, ...stateClients, ...stateLines]}
              layout={stateLayout}
            />
          ) : (
            <Skeleton height="600px" width="900px"></Skeleton>
          )}
        </Box>
      </Box>
    </Box>
  );
};
