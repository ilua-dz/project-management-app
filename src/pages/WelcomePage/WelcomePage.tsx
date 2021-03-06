import { TeamOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import PageTitle from '../../components/styled/PageTitle';
import OurTeam from '../../enumerations/OurTeam';
import MemberAvatar from './MemberAvatar';

const { Title, Link, Text } = Typography;

function WelcomePage() {
  const { t } = useTranslation();
  return (
    <Container>
      <PageTitle textLink="application-title" icon={<TeamOutlined />} />
      <StyledText italic>{t('description1')}</StyledText>
      <StyledTitle level={2}>{t('our-team')}</StyledTitle>
      <AvatarsBlock>{OurTeam.map(MemberAvatar)}</AvatarsBlock>
      <StyledText>
        {t('description2.start-text')}
        <Link href="https://rs.school/react/" target="_blank">
          {t('description2.course-link')}
        </Link>
        {t('description2.middle-text')}
        <Link href="https://rs.school/index.html" target="_blank">
          {t('description2.school-link')}
        </Link>
      </StyledText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AvatarsBlock = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const StyledText = styled(Text)`
  text-align: center;
  padding: 0 2rem;
`;

const StyledTitle = styled(Title)`
  text-align: center;
`;

export default WelcomePage;
