import { GithubOutlined } from '@ant-design/icons';
import { getMemberGitHubLink, TeamMember } from '../../enumerations/OurTeam';
import { Typography } from 'antd';
import StyledTag from '../styled/StyledTag';

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

export default MemberTag;
