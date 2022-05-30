import { Input } from 'antd';
import styled from 'styled-components';
import Colors from '../../enumerations/Colors';

const InvisibleInput = styled(Input.TextArea).attrs({ autoSize: true })`
  border: 1px solid transparent;
  font-size: 1.1rem;
  font-weight: 600;
  width: 95%;
  background-color: transparent;
  padding: 0.1rem;

  &:hover {
    border: 1px solid ${Colors.primary};
  }
`;

export default InvisibleInput;
