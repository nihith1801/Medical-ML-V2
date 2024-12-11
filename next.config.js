/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyCpeJfDo7Mv3Fo-tbVz2K9OW_igTOWs1OU",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "medical-ml-ea287.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "medical-ml-ea287",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "medical-ml-ea287.firebasestorage.app",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "685023716994",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:685023716994:web:4935b183efe64187ccf69b",
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-GNKQQTFBNJ",
  },
}

module.exports = nextConfig

