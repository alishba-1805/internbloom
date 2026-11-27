interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="border-b border-line bg-white">
      <div className="container-page py-10 md:py-14">
        <h1 className="font-display text-3xl text-forest md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted">{description}</p>
      </div>
    </div>
  );
}
