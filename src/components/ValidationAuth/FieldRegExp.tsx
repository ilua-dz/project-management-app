import { useTranslation } from 'react-i18next';

export function FieldRegExp() {
  const { t } = useTranslation();
  return [
    {
      required: true,
      message: t('messagesOfAuthForms.require')
    },
    {
      pattern: /^[а-яА-Я-A-Za-z0-9_]{3,}$/,
      message: t('messagesOfAuthForms.pattern')
    }
  ];
}
