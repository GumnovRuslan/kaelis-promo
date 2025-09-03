import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/sanityImage";
import Image from "next/image";

export const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => { 
      try {
        return (
          <div datatype="image">
            <Image
              src={urlFor(value)?.url() || ''}
              alt={value.alt || "Image"}
              width={800}
              height={500}
            />
          </div>
        )
      } catch {
        return null
      }},
  },
  block: {
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    h6: ({ children }) => <h6>{children}</h6>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '';
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong>{children}</strong>
    ),
    code: ({ children }) => (
      <code 
        dangerouslySetInnerHTML={{ __html: String(children) }}
      />
    ),
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};