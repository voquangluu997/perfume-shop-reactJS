import { useTranslation } from "react-i18next";

export const useLocale = (keyPrefix?: string) => {
  const { t } = useTranslation("translation", { keyPrefix });
  return t;
};
