export interface TeamMember {
  name: string;
  gitHubProfile: string;
}

export function getMemberGitHubLink(gitHubProfile: string) {
  return 'https://github.com/' + gitHubProfile;
}

const OurTeam: TeamMember[] = [
  {
    name: 'Ilya',
    gitHubProfile: 'ilua-dz'
  },
  {
    name: 'Halina',
    gitHubProfile: 'alchonokk'
  },
  {
    name: 'Bohdan',
    gitHubProfile: 'whispermind'
  }
];

export default OurTeam;
