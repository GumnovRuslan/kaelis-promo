import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

// documents
import page from "./documents/page";
import blogCategory from "./documents/blogCategory";
import settings from "./documents/settings";
import redirect from "./documents/redirect";

// objects
import link from "./objects/link";
import listItem from "./objects/listItem";
import leftColumnItem from "./objects/leftColumnItem";
import rightColumnItem from "./objects/rightColumnItem";
import textTwoItem from "./objects/textTwoItem";
import linkInternal from "./objects/linkInternal";
import linkExternal from "./objects/linkExternal";
import contactItem from "./objects/contactItem";
import devItem from "./objects/devItem";
import ourTeamItem from "./objects/ourTeamItem";
import faqItem from "./objects/faqItem";
import textItemSteps from "./objects/textItemSteps";
import ourClientsItem from "./objects/ourClientsItem";
import reviewItem from "./objects/reviewItem";
import technologyStackItem from "./objects/technologyStackItem";
import technologiesItem from "./objects/technologiesItem";
import articlesItem from "./documents/articlesItem";
import socialIconItem from "./objects/socialIcons";
import columnLinksItem from "./objects/columnLinks";
import iconLink from "./objects/iconLink";
import textItem from "./objects/agreementTextItems";
import seo from "./objects/seo";
import columnGroup from "./objects/columnGroup";
import heroMainItem from "./objects/heroMainItem";
import ourClientsArray from "./objects/ourClientsArray";
import ourClientsSlider from "./objects/ourClientsSlider";
import technologyCategory from "./objects/technologyCategory";
import technologiesArray from "./objects/technologiesArray";
import locale from "./objects/locale";
import contentItem from "./objects/contentItem";
import blockTextItem from "./objects/blockTextItem";
import modalWindow from "./objects/modalWindow";
import cookies from "./objects/cookies";
import cookiesItem from "./objects/cookiesItem";
import heroProjectInfo from "./objects/heroProjectInfo";

// blocks

import imageWithAlt from "./blocks/imageWithAlt";


export default createSchema({
  name: "default",

  types: schemaTypes.concat([
    // documents
    page,
    blogCategory,
    articlesItem,
    locale,
    settings,
    redirect,

    // objects
    link,
    listItem,
    linkInternal,
    linkExternal,
    textTwoItem,
    leftColumnItem,
    rightColumnItem,
    contactItem,
    devItem,
    ourTeamItem,
    faqItem,
    textItemSteps,
    ourClientsItem,
    reviewItem,
    technologyStackItem,
    technologiesItem,
    socialIconItem,
    columnLinksItem,
    iconLink,
    textItem,
    seo,
    columnGroup,
    heroMainItem,
    ourClientsArray,
    ourClientsSlider,
    technologyCategory,
    technologiesArray,
    contentItem,
    modalWindow,
    blockTextItem,
    heroProjectInfo,
    cookies,
    cookiesItem,

    // blocks
    imageWithAlt,
  ]),
});
