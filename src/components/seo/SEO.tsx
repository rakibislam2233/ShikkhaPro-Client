import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  canonical?: string;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = "ShikkhaPro - AI-Powered Quiz Generator | Create Smart Quizzes Instantly",
  description = "Transform your learning with ShikkhaPro's AI-powered quiz generator. Create custom quizzes, track progress, and enhance your education with intelligent question generation.",
  keywords = "quiz generator, AI quiz, online quiz maker, educational platform, exam preparation, learning tool, ShikkhaPro, quiz creator, study tool",
  ogType = "website",
  canonical,
  noIndex = false,
}) => {
  const siteUrl = "https://shikkhapro.netlify.app";
  const fullTitle = title.includes("ShikkhaPro") ? title : `${title} | ShikkhaPro`;
  const canonicalUrl = canonical || `${siteUrl}${window.location.pathname}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="ShikkhaPro" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;
