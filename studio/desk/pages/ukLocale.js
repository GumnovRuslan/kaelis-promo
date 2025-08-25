import S from "@sanity/desk-tool/structure-builder";

export const ukLocale = S.listItem()
  .title("UK Pages")
  .child(
    S.documentTypeList("page")
      .filter('_type == "page" && i18n_lang == $baseLanguage')
      .params({ baseLanguage: `uk` }),
  );
