import { type Props as SEOProps } from "astro-seo";
type SEOOpenGraph = Required<SEOProps>["openGraph"];
type SEOOpenGraphOptional = Required<SEOOpenGraph>["optional"];
type SEOOpenGraphBasic = Required<SEOOpenGraph>["basic"];
type SEOTwitter = Required<SEOProps>["twitter"];
type GenerateSEOTagsProps = Pick<SEOProps, "title" | "description"> &
  Pick<SEOTwitter, "imageAlt" | "site"> &
  Pick<SEOOpenGraphBasic, "image"> &
  Pick<SEOOpenGraphOptional, "determiner" | "siteName">;

export const generateMetaTags = ({
  title,
  description,
  image,
  imageAlt,
  site,
  siteName,
  determiner,
}: Required<GenerateSEOTagsProps>): SEOProps => ({
  title,
  description,
  openGraph: {
    basic: {
      title,
      url: site,
      type: "website",
      image,
    },
    optional: {
      description,
      locale: "en_US",
      siteName,
      determiner,
    },
  },
  twitter: {
    title,
    card: "summary",
    description,
    creator: "@arkyasmal97",
    image,
    imageAlt,
    site,
  },
});
