import PageWrapper from "./PageWrapper";

const Loading = () => {
  return (
    <PageWrapper title="Loading">
      <div className="mb-2 flex min-h-[40vh] flex-col items-center justify-center gap-4 lg:mb-8 lg:gap-8">
        <h1 className="text-center text-6xl lg:text-9xl">
          <span>
            koga<span className="text-aka">...</span>one
          </span>
        </h1>
        <h2 className="text-xl text-aka dark:text-gure lg:text-4xl">
          loading the content!
        </h2>
      </div>
    </PageWrapper>
  );
};

export default Loading;
