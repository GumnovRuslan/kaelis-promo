import { MasterDetailIcon } from "@sanity/icons";

export default {
  preview: {
    select: {
      title: "title",
    },
  },

  name: "articlesItem",
  type: "document",
  title: "Articles item",
  icon: MasterDetailIcon,
  i18n: {
    fieldNames: {
      lang: "i18n_lang",
      baseReference: "i18n_base",
      references: "i18n_refs",
    },
  },

  fields: [
    {
      name: "i18n_lang",
      type: "string",
      hidden: true,
    },
    {
      name: "i18n_base",
      type: "reference",
      to: [{ type: "articlesItem" }],
      hidden: true,
    },
    {
      name: "i18n_refs",
      type: "array",
      hidden: true,
      of: [
        {
          type: "reference",
          to: [{ type: "articlesItem" }],
        },
      ],
    },
    {
      title: 'Breadcrumbs',
      name: 'breadcrumbs',
      type: 'array',
      of: [
        {
          name: 'link',
          type: 'link',
        },
      ],
    },
    {
      title: 'Date',
      name: 'date',
      type: 'date',
      options: {
        dateFormat: 'DD-MMM-YYYY',
      },
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      title: 'Description',
      name: 'desc',
      type: 'text',
    },
    {
      title: 'Cover image',
      name: 'coverImage',
      type: 'imageWithAlt',
    },
    {
      title: 'Author name',
      name: 'author',
      type: 'string',
    },
    {
      name: 'seo',
      type: 'seo',
    },
    {
      title: 'Category',
      name: 'category',
      type: 'string',
      initialValue: 'Latest',
      options: {
        list: [
          {title: 'Latest', value: 'Latest'},
          {title: 'Technologies', value: 'Technologies'},
          {title: 'UI/UX', value: 'UI/UX'},
          {title: 'Client guides', value: 'Client guides'},
        ],
      },
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
          },
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
            {title: 'H6', value: 'h6'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        },
        {
          type: 'image',
        },
      ],
    },
    {
      title: 'Socials',
      name: 'socials',
      type: 'array',
      of: [{type: 'socialIconsItem'}],
    },
  ],
};
