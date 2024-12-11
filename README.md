# Medical ML: Advanced Medical Image Classification

## (still in beta)

Medical ML is a cutting-edge web application that leverages advanced machine learning models for precise medical image classification and early disease detection. Our platform offers state-of-the-art analysis for ultrasound, X-ray, and MRI scans, providing rapid and accurate insights to support medical professionals in their diagnostic process.

## Features

- **Ultrasound Analysis**: Breast Cancer Detection using advanced deep learning techniques.
- **X-Ray Analysis**: Bone Fracture Detection with high accuracy and rapid results.
- **MRI Analysis**: Brain Tumor Detection to support early diagnosis and treatment planning.
- **User Authentication**: Secure sign-up and login functionality, including Google Sign-In option.
- **Responsive Design**: Fully responsive web application that works seamlessly on desktop and mobile devices.
- **Dark Mode**: Built-in dark mode for comfortable viewing in low-light environments.

## Technologies Used

- Next.js 13 (App Router)
- React
- TypeScript
- Tailwind CSS
- Firebase (Authentication, Firestore, Storage)
- GSAP (for animations)
- Radix UI (for accessible component primitives)
- Lucide React (for icons)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account and project

### Installation

1. Clone the repository

2. Install dependencies:
   \`\`\`
   npm install
   # or
   yarn install
   \`\`\`

3. Set up environment variables:
   Create a \`.env.local\` file in the root directory and add your Firebase configuration:

   \`\`\`
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   \`\`\`

4. Run the development server:
   \`\`\`
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Sign up for an account or log in if you already have one.
2. Navigate to the desired analysis page (Ultrasound, X-Ray, or MRI).
3. Upload an image for analysis.
4. View the results and prediction from our ML model.

## Contributing

We welcome contributions to Medical ML! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch 
3. Make your changes
4. Commit your changes 
5. Push to the branch
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [GSAP](https://greensock.com/gsap/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)


