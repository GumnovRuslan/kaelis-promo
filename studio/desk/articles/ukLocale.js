import S from "@sanity/desk-tool/structure-builder";

export const ukLocale = S.listItem()
  .title("UK Articles")
  .child(
    S.documentTypeList("articlesItem")
      .filter('_type == "articlesItem" && i18n_lang == $baseLanguage')
      .params({ baseLanguage: `uk` }),
  );
