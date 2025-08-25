import S from "@sanity/desk-tool/structure-builder";
import { DocumentIcon } from "@sanity/icons";

import { ruLocale } from "./pages/ruLocale";
import { enLocale } from "./pages/enLocale";
import { ukLocale } from "./pages/ukLocale";

export const pages = S.listItem()
  .title("Pages")
  .icon(DocumentIcon)
  .child(S.list().title("Locales").items([enLocale, ukLocale, ruLocale]));
