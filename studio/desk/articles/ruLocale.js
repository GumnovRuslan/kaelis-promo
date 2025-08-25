import S from "@sanity/desk-tool/structure-builder";

export const ruLocale = S.listItem()
  .title("RU Articles")
  .child(
    S.documentTypeList("articlesItem")
      .filter('_type == "articlesItem" && i18n_lang == $baseLanguage')
      .params({ baseLanguage: `ru` }),
  );
