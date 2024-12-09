import { Github } from 'lucide-react'

const SocialMediaLinks = () => {
  return (
    <div className="flex space-x-4">
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-gray-700"
      >
        <Github className="h-6 w-6" />
      </a>
      {/* rest of social media links here */}
    </div>
  );
};

export default SocialMediaLinks;

