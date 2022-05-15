import { Tag } from 'antd';
import styled from 'styled-components';
import Colors from '../../enumerations/Colors';

const StyledTag = styled(Tag)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: 0.5s;

  &:hover {
    transform: scale(1.05);
    color: ${Colors.primary};
    box-shadow: 0 0 0.1rem 0.1rem ${Colors.primaryOutline};
  }

  a {
    padding: 0.2rem !important;
    display: flex !important;
    align-items: center;
  }
`;

export default StyledTag;
