import S from "@sanity/desk-tool/structure-builder";
import { MasterDetailIcon } from "@sanity/icons";

import { ruLocale } from "./blogCategory/ruLocale";
import { enLocale } from "./blogCategory/enLocale";
import { ukLocale } from "./blogCategory/ukLocale";

export const blogCategory = S.listItem()
  .icon(MasterDetailIcon)
  .title("Blog categories")
  .child(S.list().title("Locales").items([enLocale, ukLocale, ruLocale]));
