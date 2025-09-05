import { TBreadcrumbs } from "./breadcrumbs";
import { PortableTextBlock } from "@portabletext/react";
import { TCategory } from "./category";

type TImage = {
  image: {
    asset: {
      url: string;
    }
  }
  altText: string
}

export type TArticleSeo = {
  title: string;
  description: string;
  keywords: string;
  image: TImage;
  ogType: string;
  twitterCard: string;
}

export type TArticlePreview = {
  title: string;
  date: string;
  slug: {
    current: string
  };
  category: TCategory[];
  coverImage: TImage
}

export type TArticle = {
  title: string;
  desc: string;
  date: string;
  contentRaw: PortableTextBlock[];
  category: TCategory[];
  slug: {
    current: string
  };
  breadcrumbs: TBreadcrumbs[]
}