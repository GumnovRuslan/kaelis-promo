import S from "@sanity/desk-tool/structure-builder";
import {pages} from "./desk/pages";
import {articles} from "./desk/articles";
import {blogCategory} from "./desk/blogCategory";
import {redirect} from "./desk/redirect";


export default () => {
  return S.list()
    .title("Content")
    .items([
      pages,
      S.divider(),
      blogCategory,
      articles,
      S.divider(),
      S.documentListItem().id("global-config").schemaType("settings").title("Settings"),
      redirect,
    ]);
};