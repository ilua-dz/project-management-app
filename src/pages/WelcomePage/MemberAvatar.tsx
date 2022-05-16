import { Popover, Avatar } from 'antd';
import { Typography } from 'antd';
import { TeamMember, getMemberGitHubLink } from '../../enumerations/OurTeam';

const { Link } = Typography;

function MemberAvatar({ gitHubProfile, name }: TeamMember) {
  const gitHubLink = getMemberGitHubLink(gitHubProfile);
  const imageUrl = gitHubLink + '.png';

  return (
    <Popover
      key={name}
      content={
        <Link href={gitHubLink} target="_blank">
          {name}
        </Link>
      }>
      <Avatar size={64} src={imageUrl} />
    </Popover>
  );
}

export default MemberAvatar;
