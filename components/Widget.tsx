import { ReactElement } from "react";

type Props = {
  title: string;
  children: ReactElement[] | ReactElement;
};

const Widget = ({ title, children }: Props) => {
  return (
    <div className="rounded-xl px-4 py-8 shadow-lg dark:bg-kami dark:bg-opacity-5 lg:p-8">
      <h3 className="text-center text-3xl">{title}</h3>
      <div className="mt-8 flex flex-wrap">{children}</div>
    </div>
  );
};

export default Widget;
