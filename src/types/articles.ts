import { TBreadcrumbs } from "./breadcrumbs";
import { PortableTextBlock } from "@portabletext/react";

export type TArticlePreview = {
  title: string;
  date: string;
  slug: {
    current: string
  };
  coverImage: {
    image: {
      asset: {
        url: string;
      }
    }
    altText: string
  }
}

export type TArticle = {
  title: string;
  desc: string;
  date: string;
  contentRaw: PortableTextBlock[];
  slug: {
    current: string
  };
  breadcrumbs: TBreadcrumbs[]
}