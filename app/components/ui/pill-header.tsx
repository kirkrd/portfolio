export const PillHeader = ({
  title,
}: {
  title: string;
}) => {
  return (
    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
      {title}
    </h3>
  );
};
