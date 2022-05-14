import { GithubOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Colors from '../../enumerations/Colors';
import { getMemberGitHubLink, TeamMember } from '../../enumerations/OurTeam';
import { Tag, Typography } from 'antd';

const { Link } = Typography;

function MemberTag(member: TeamMember) {
  return (
    <Link href={getMemberGitHubLink(member.gitHubProfile)} target="_blank">
      <StyledTag key={member.name} icon={<GithubOutlined />}>
        {member.name}
      </StyledTag>
    </Link>
  );
}

const StyledTag = styled(Tag)`
  font-size: 1rem;
  transition: 0.5s;

  &:hover {
    transform: scale(1.05);
    color: ${Colors.primary};
    box-shadow: 0 0 0.1rem 0.1rem ${Colors.primaryOutline};
  }
`;

export default MemberTag;
