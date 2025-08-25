import S from "@sanity/desk-tool/structure-builder";

export const ruLocale = S.listItem()
  .title("RU Pages")
  .child(
    S.documentTypeList("page")
      .filter('_type == "page" && i18n_lang == $baseLanguage')
      .params({ baseLanguage: `ru` }),
  );
