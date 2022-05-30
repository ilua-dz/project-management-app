import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

function LangSwitch() {
  const { i18n } = useTranslation();

  function changeLanguage(isLangEN: boolean) {
    if (isLangEN) {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
  }

  return (
    <StyledSwitch
      checkedChildren="EN"
      unCheckedChildren="RU"
      defaultChecked
      onChange={changeLanguage}
    />
  );
}

const StyledSwitch = styled(Switch)`
  background: #1890ff;
  margin: 0 0.5rem;
`;

export default LangSwitch;
