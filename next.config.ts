import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
  remotePatterns :[
    {
      protocol : 'https',
      hostname : 'cdn.pixabav.com'
    },
     {
      protocol : 'https',
      hostname : 'cloud.appwrite.io'
    },
  ]
 }
};

export default nextConfig;
