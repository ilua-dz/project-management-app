import { Avatar, Popover } from 'antd';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Title, Link, Text } = Typography;

const GitHubUrl = 'https://github.com/';

interface TeamMember {
  name: string;
  gitHubProfile: string;
}

const ourTeam: TeamMember[] = [
  {
    name: 'Ilya',
    gitHubProfile: 'ilua-dz',
  },
  {
    name: 'Halina',
    gitHubProfile: 'alchonokk',
  },
  {
    name: 'Bohdan',
    gitHubProfile: 'whispermind',
  },
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
`;

const AvatarsBlock = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const StyledText = styled(Text)`
  text-align: center;
`;

const StyledTitle = styled(Title)`
  text-align: center;
`;

const WelcomePage = () => {
  const getAvatar = (member: TeamMember) => {
    const gitHubLink = GitHubUrl + member.gitHubProfile;
    return (
      <Popover
        key={member.name}
        content={
          <Link href={gitHubLink} target="_blank">
            {member.name}
          </Link>
        }
      >
        <Avatar size={64} src={gitHubLink + '.png'} />
      </Popover>
    );
  };

  return (
    <Container>
      <StyledTitle>Project Management App</StyledTitle>
      <StyledText italic>
        This is aimed to facilitate the workflow of a team collaborating on the
        same project. The software allows to assign and reassign tasks, easily
        track the deadlines to meet them for sure and control the whole process
        from the central managing location.
      </StyledText>
      <StyledTitle level={2}>Our Team</StyledTitle>
      <AvatarsBlock>{ourTeam.map(getAvatar)}</AvatarsBlock>
      <StyledText>
        This app was developed in the course
        <Link href="https://rs.school/react/" target="_blank">
          <span> "React Development Course" </span>
        </Link>
        at
        <Link href="https://rs.school/index.html" target="_blank">
          <span> The Rolling Scopes School </span>
        </Link>
      </StyledText>
    </Container>
  );
};

export { WelcomePage };
