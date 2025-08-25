import S from "@sanity/desk-tool/structure-builder";

export const ruLocale = S.listItem()
  .title("RU Blog categories")
  .child(
    S.documentTypeList("blogCategory")
      .filter('_type == "blogCategory" && i18n_lang == $baseLanguage')
      .params({ baseLanguage: `ru` }),
  );
