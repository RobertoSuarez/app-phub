/* eslint-disable react/react-in-jsx-scope */
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { parseSync } from '@babel/core';

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

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onSendData: SubmitHandler<FormHubs> = (data) => {
    if (!file) {
      alert('Falta el archivo');
      return;
    }
    console.log(data);
    const formData = new FormData();
    formData.append('file', file!);
    formData.append('iteraciones', data.iteraciones.toString());
    console.log(formData);

    const BASE_URL = 'https://salty-oasis-54156-ad73c8afce2a.herokuapp.com';

    fetch(`${BASE_URL}/init-phub`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert(json.solution);
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

          {file && <Text>{file.name}</Text>}

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

          <Button size="lg" color={'blue'} type="submit">
            Iniciar Ejecución
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
