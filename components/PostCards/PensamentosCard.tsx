import { TCardProps } from "../";
import Image from "next/image";
import DefaultCard from "./DefaultCard";

const PensamentosCard = ({ className, post, children }: TCardProps) => {
  return (
    <DefaultCard className={className} post={post}>
      {children}
    </DefaultCard>
  );
};

export default PensamentosCard;
