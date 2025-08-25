import S from "@sanity/desk-tool/structure-builder";
import { MasterDetailIcon } from "@sanity/icons";

import { ruLocale } from "./articles/ruLocale";
import { enLocale } from "./articles/enLocale";
import { ukLocale } from "./articles/ukLocale";

export const articles = S.listItem()
  .icon(MasterDetailIcon)
  .title("Articles")
  .child(S.list().title("Locales").items([enLocale, ukLocale, ruLocale]));
