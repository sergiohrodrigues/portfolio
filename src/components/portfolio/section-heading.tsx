type Props = {
  title: string;
};

export function SectionHeading({ title }: Props) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
        {title}
      </h2>
      <div className="h-[3px] w-20 rounded-full bg-blue-500" />
    </div>
  );
}
