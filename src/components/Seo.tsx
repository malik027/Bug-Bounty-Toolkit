import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Seo: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        {/* Basic Meta */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <title>Bug Bounty Toolkit - Curated Tools & Commands for Security Researchers</title>
        <meta
          name="description"
          content="Bug Bounty Toolkit is a curated toolkit for bug bounty hunters and security researchers, featuring tools, payloads, and commands."
        />
        <meta name="keywords" content="bug bounty, pentesting, hacking, security, tools, payloads" />
        <meta name="author" content="Malik027" />

        {/* Open Graph */}
        <meta property="og:title" content="Bug Bounty Toolkit - Curated Tools & Commands for Security Researchers" />
        <meta
          property="og:description"
          content="Bug Bounty Toolkit is a curated toolkit for bug bounty hunters and security researchers, featuring tools, payloads, and commands."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bugbountytoolkit.netlify.app/" />
        <meta property="og:image" content="https://bugbountytoolkit.netlify.app/logo-og.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Bug Bounty Toolkit - Curated Tools & Commands for Security Researchers"
        />
        <meta
          name="twitter:description"
          content="Bug Bounty Toolkit is a curated toolkit for bug bounty hunters and security researchers, featuring tools, payloads, and commands."
        />
        <meta name="twitter:image" content="https://bugbountytoolkit.netlify.app/logo-og.png" />
      </Helmet>
    </HelmetProvider>
  );
};

export default Seo;
