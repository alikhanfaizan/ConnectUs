import {
  Video,
  Clock,
  Bell,
  Smile,
  Users,
  CheckCircle,
  ThumbsUp,
  Heart,
  FileText,
} from "lucide-react";

const iconComponents = [
  Video,
  Clock,
  Bell,
  Smile,
  Users,
  CheckCircle,
  ThumbsUp,
  Heart,
  FileText,
];

const hoverAnimations = [
  "group-hover:animate-spin",
  "group-hover:animate-bounce",
  "group-hover:scale-125",
  "group-hover:rotate-6",
  "group-hover:-rotate-6",
  "group-hover:animate-ping",
  "group-hover:scale-110",
  "group-hover:animate-wiggle",
  "group-hover:translate-y-1",
];

// If you're using Tailwind, ensure this is in tailwind.config.js:
// animation: { wiggle: 'wiggle 0.4s ease-in-out' },
// keyframes: {
//   wiggle: { '0%, 100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
// }

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 pt-24 pb-12 px-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {iconComponents.map((Icon, i) => (
            <div
              key={i}
              className={`
                aspect-square rounded-2xl flex items-center justify-center
                bg-primary/10 text-primary/90 shadow-lg group
                transition-all duration-300
                ${i % 2 === 0 ? "animate-pulse" : ""}
              `}
            >
              <Icon
                className={`w-6 h-6 transition-all duration-300 ease-in-out ${hoverAnimations[i]}`}
              />
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
