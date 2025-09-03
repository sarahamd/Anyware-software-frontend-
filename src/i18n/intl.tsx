import React from 'react';
import { IntlProvider } from 'react-intl';
import en from './locales/en.json';

type Props = { children: React.ReactNode, locale?: string };

export default function I18nProvider({ children, locale = 'en' }: Props) {
  const messages = { en };
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
}
