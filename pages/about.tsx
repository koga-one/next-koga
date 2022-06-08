import {
  Categories,
  PageWrapper,
  PostGrid,
  PostWidget,
  Title,
} from "../components";

const About = () => {
  return (
    <PageWrapper title="Home">
      <div className="container mx-auto">
        <Title title="about" subtitle="hey, nice to meet you" />
        <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 lg:col-span-8"></div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky lg:top-8">
              <PostWidget />
              <div className="mb-2 lg:mb-8"></div>
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default About;
