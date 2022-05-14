import { Footer } from 'antd/lib/layout/layout';
import styled from 'styled-components';
import OurTeam from '../../enumerations/OurTeam';
import MemberTag from './MemberTag';

function FooterApp() {
  return <StyledFooter>{OurTeam.map(MemberTag)}</StyledFooter>;
}

const StyledFooter = styled(Footer)`
  text-align: center;
`;

export default FooterApp;
