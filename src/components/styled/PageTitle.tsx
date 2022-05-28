import { Tag } from 'antd';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface IProps {
  textLink?: string;
  text?: string;
  icon?: ReactNode;
}

function PageTitle({ textLink, text, icon }: IProps) {
  const { t } = useTranslation();
  return (
    <StyledTitleTag color="blue" icon={icon}>
      {textLink ? t(textLink) : text}
    </StyledTitleTag>
  );
}

const StyledTitleTag = styled(Tag)`
  width: calc(100% - 1rem);
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 2rem;
  text-align: center;
  padding: 1rem 0.5rem;
  margin: 0.5rem;

  & span {
    white-space: normal;
    line-height: 100%;
  }
`;

export default PageTitle;
