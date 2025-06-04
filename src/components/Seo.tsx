import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Seo: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Bug Bounty Toolkit - Curated Tools & Commands for Security Researchers</title>
        <meta name="description" content="A curated toolkit for bug bounty hunters and security researchers." />
        <meta name="keywords" content="bug bounty, pentesting, hacking, security, tools" />

        {/* Open Graph */}
        <meta property="og:title" content="Bug Bounty Toolkit" />
        <meta property="og:description" content="A curated toolkit for bug bounty hunters and security researchers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bugbountytoolkit.netlify.app/" />
        <meta property="og:image" content="https://bugbountytoolkit.netlify.app/logo-og.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bug Bounty Toolkit" />
        <meta name="twitter:description" content="A curated toolkit for bug bounty hunters and security researchers." />
        <meta name="twitter:image" content="https://bugbountytoolkit.netlify.app/logo-og.png" />
      </Helmet>
    </HelmetProvider>
  );
};

export default Seo;
