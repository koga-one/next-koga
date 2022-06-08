type Props = {
  title?: string;
  subtitle?: string;
};

const Title = ({ title, subtitle }: Props) => {
  return (
    <div className="mb-2 flex min-h-[40vh] flex-col items-center justify-center gap-4 lg:mb-8 lg:gap-8">
      <h1 className="text-center text-6xl lg:text-9xl">
        {title ? (
          title
        ) : (
          <span>
            koga<span className="text-aka">.</span>one
          </span>
        )}
      </h1>
      <h2 className="text-xl text-aka dark:text-gure lg:text-4xl">
        {subtitle ? subtitle : <span>the moon is beautiful, isn't it?</span>}
      </h2>
    </div>
  );
};

export default Title;
