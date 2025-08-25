import S from "@sanity/desk-tool/structure-builder";

export const ukLocale = S.listItem()
  .title("UK Blog categories")
  .child(
    S.documentTypeList("blogCategory")
      .filter('_type == "blogCategory" && i18n_lang == $baseLanguage')
      .params({ baseLanguage: `uk` }),
  );
