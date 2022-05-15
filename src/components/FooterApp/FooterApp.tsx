import { Footer } from 'antd/lib/layout/layout';
import styled from 'styled-components';
import OurTeam from '../../enumerations/OurTeam';
import MemberTag from './MemberTag';
import { Tag, Typography } from 'antd';
import Colors from '../../enumerations/Colors';
import RSSsvg from './RSSsvg';
import StyledTag from '../styled/StyledTag';

const { Link } = Typography;

function FooterApp() {
  return (
    <StyledFooter>
      <MembersBlock>{OurTeam.map(MemberTag)}</MembersBlock>
      <Tag>2022</Tag>
      <StyledTag>
        <Link href="https://rs.school/react/" target="_blank">
          <RSSsvg />
        </Link>
      </StyledTag>
    </StyledFooter>
  );
}

const MembersBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 0.2rem;
`;

const StyledFooter = styled(Footer)`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.headerBG};
  border-top: ${Colors.primaryOutline} solid;
`;

export default FooterApp;
