import { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <div className="grid h-screen content-center justify-center">
      <div className="text-center">
        <span className="font-garamond text-9xl font-black text-aka">404</span>
        <br />
        <span>This page could not be found</span>
      </div>
    </div>
  );
};

export default NotFound;
