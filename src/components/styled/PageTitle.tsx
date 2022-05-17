import { Tag } from 'antd';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface IProps {
  textLink: string;
  icon?: ReactNode;
}

function PageTitle({ textLink, icon }: IProps) {
  const { t } = useTranslation();
  return (
    <StyledTitleTag color="blue" icon={icon}>
      {t(textLink)}
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
