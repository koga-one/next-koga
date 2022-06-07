import React, { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { getComments } from "../services";
import { comment } from "postcss";
import { TComment } from "./";

type Props = {
  slug: string;
};

const Comments = ({ slug }: Props) => {
  const [comments, setComments] = useState<TComment[]>([]);

  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result);
    });
  }, [slug]);

  return (
    <>
      {comment.length > 0 && (
        <div className="mt-2 rounded-lg py-8 px-4 shadow-lg dark:bg-kami dark:bg-opacity-5 lg:mt-8 lg:p-8">
          <h3 className="mb-8 text-center text-xl font-semibold lg:text-3xl">
            Comments
          </h3>
          <div className="grid gap-4">
            {comments.map((comment) => (
              <div
                key={comment.createdAt}
                className="rounded-lg border border-gure p-4 dark:border-0 dark:bg-katsu"
              >
                <p className="mb-4">
                  <span className="font-semibold">{comment.name}</span> on{" "}
                  {moment(comment.createdAt).format("MMM DD, YYYY")}
                </p>
                <p className="w-full whitespace-pre-line dark:text-kami">
                  {parse(comment.comment)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
