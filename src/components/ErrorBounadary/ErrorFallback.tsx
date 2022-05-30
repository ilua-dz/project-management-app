import { Button, Typography } from 'antd';
import styled from 'styled-components';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

const { Title, Text } = Typography;
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Container role="alert">
      <Title level={5}>Something went wrong:</Title>
      <Text>{error.message}</Text>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export { ErrorFallback };
