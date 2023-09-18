import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Button, HStack } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';

const textFontSizes = [16, 18, 24, 30];

function App(): JSX.Element {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  return (
    <Box
      w="100%"
      minH="100vh"
      backgroundColor="#8EC5FC"
      bgGradient="linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"
      display="flex"
      flexDirection="column"
      overflowY="auto"
    >
      <HStack paddingX={8} paddingY={4} justifyContent="end">
        <Button variant="ghost" as={Link} to="/">
          P-HUB
        </Button>
        <Button variant="ghost" as={Link} to="/history">
          Historial
        </Button>
      </HStack>

      <Box flex={1} display="flex" justifyContent="center" alignItems="start">
        <Outlet />
      </Box>
    </Box>
  );

  // background-color: #4158D0;
  // background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
  // background-color: #8EC5FC;
  // background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
}

export default App;
