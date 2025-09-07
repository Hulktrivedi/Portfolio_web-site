"use client"
// components/project-card.tsx

type ProjectCardProps = {
  title: string;
  description: string;
  image?: string;      // optional (since not every project might have one)
  imageAlt?: string;   // optional
  status?: "wip" | "completed"; // restricts to two values
};

export default function ProjectCard({
  title,
  description,
  image,
  imageAlt,
  status = "wip", // default value
}: ProjectCardProps) {
  return (
    <div className="bg-neutral-900 rounded-2xl p-4 shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
      {/* Project Image */}
      {image && (
        <div className="w-full h-40 flex items-center justify-center mb-3 bg-neutral-800 rounded-xl overflow-hidden">
          <img
            src={image}
            alt={imageAlt || title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}

      {/* Project Info */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </div>

      {/* Status + Button */}
      <div className="mt-4 flex items-center justify-between">
        {status === "wip" ? (
          <span className="text-xs font-medium px-2 py-1 bg-yellow-700/40 text-yellow-300 rounded-md">
            Work in Progress
          </span>
        ) : (
          <span className="text-xs font-medium px-2 py-1 bg-green-700/40 text-green-300 rounded-md">
            Completed
          </span>
        )}
        <button className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-gray-200 transition-colors">
          Details
        </button>
      </div>
    </div>
  );
}
