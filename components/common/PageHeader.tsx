interface PageHeaderProps {
  icon: string;
  title: string;
  tags: string[];
  description: string;
  iconBg: string;
}

export default function PageHeader({ icon, title, tags, description, iconBg }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}