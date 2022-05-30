import { GithubOutlined } from '@ant-design/icons';
import { getMemberGitHubLink, TeamMember } from '../../enumerations/OurTeam';
import { Typography } from 'antd';
import StyledTag from '../styled/StyledTag';

const { Link } = Typography;

function MemberTag({ gitHubProfile, name }: TeamMember) {
  return (
    <Link key={name} href={getMemberGitHubLink(gitHubProfile)} target="_blank">
      <StyledTag icon={<GithubOutlined />}>{name}</StyledTag>
    </Link>
  );
}

export default MemberTag;
