import { ReactElement } from "react";

type Props = {
  title: string;
  children: ReactElement[] | ReactElement;
};

const Widget = ({ title, children }: Props) => {
  return (
    <div className="rounded-xl p-8 shadow-lg dark:bg-kami dark:bg-opacity-5">
      <h3 className="text-center text-3xl">{title}</h3>
      <div className="mt-8 flex flex-wrap">{children}</div>
    </div>
  );
};

export default Widget;
