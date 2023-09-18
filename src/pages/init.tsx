/* eslint-disable react/react-in-jsx-scope */
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Stack,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { parseSync } from '@babel/core';
import { BASE_URL, BASE_URL_LOCAL } from '../utils/url';

type FormHubs = {
  hubs: number;
  cantidadServer: number;
  capacidadServer: number;
  iteraciones: number;
};

export default function Init(): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormHubs>();

  // console.log(watch('iteraciones'));

  const toast = useToast();

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const onSendData: SubmitHandler<FormHubs> = (data) => {
    if (!file) {
      toast({
        title: 'Archivo',
        description: 'Falta seleccionar un archivo',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });

      return;
    }
    console.log(data);
    const formData = new FormData();
    formData.append('file', file!);
    formData.append('iterations', data.iteraciones.toString());
    console.log(formData);

    setLoading(true);

    fetch(`${BASE_URL}/init-phub`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        toast({
          title: 'Solucción',
          description: `La solución es: ${json.id}`,
          status: 'success',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    if (!dragging) {
      setDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer?.files[0];
    setFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  return (
    <Box
      minW={500}
      backgroundColor="white"
      shadow="base"
      rounded="md"
      padding={8}
      marginBottom={16}
    >
      <Text fontSize="3xl" mb={8}>
        Algoritmo P-Hub
      </Text>

      <form onSubmit={handleSubmit(onSendData)}>
        <Input type="file" hidden id="inputfile" onChange={handleFileChange} />
        <Stack spacing={4}>
          <Box
            p={4}
            borderWidth={2}
            borderColor={dragging ? 'blue.400' : 'gray.300'}
            borderRadius="lg"
            textAlign="center"
            cursor="pointer"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => {
              console.log('click');
              document.getElementById('inputfile')?.click();
            }}
          >
            {dragging ? (
              <Text>¡Suelta el archivo aquí!</Text>
            ) : (
              <>
                <Text>Arrastra y suelta un archivo aquí</Text>
              </>
            )}
          </Box>
          <Box>
            {file && (
              <Tag size={'md'} variant={'subtle'} colorScheme={'blue'}>
                {file.name}
              </Tag>
            )}
          </Box>

          <Divider />

          <FormControl>
            <FormLabel>Iteraciones</FormLabel>
            <Input
              type="number"
              defaultValue={50}
              {...register('iteraciones')}
            />
            <FormHelperText>
              Número de iteraciones que realizara el algoritmo
            </FormHelperText>
          </FormControl>

          <Button
            size="lg"
            type="submit"
            variant={'solid'}
            colorScheme="blue"
            isLoading={loading}
          >
            INICIAR
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
