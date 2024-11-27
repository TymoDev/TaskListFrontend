const Container = ({
  children,
  title,
}: {
  children: JSX.Element | JSX.Element[];
  title?: string;
}) => {
  return (
    <div className="bg-red-800 p-4 border border-red-900 shadow rounded-md">
      {title && <h2 className="text-xl pb-2 text-white">{title}</h2>}
      <div>{children}</div>
    </div>
  );
};

export default Container;
