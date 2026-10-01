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
                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-ink-soft leading-relaxed">{description}</p>
    </div>
  );
}