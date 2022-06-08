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
          <h3 className="mb-8 text-center text-3xl font-semibold">Comments</h3>
          <div className="grid gap-4">
            {comments.map((comment) => (
              <div
                key={comment.createdAt}
                className="rounded-lg border border-gure p-2 dark:border-0 dark:bg-katsu lg:p-4"
              >
                <div className="mb-2 flex flex-row items-start gap-2">
                  <span className="rounded-lg bg-katsu px-4 text-sm font-semibold text-kami dark:bg-kami dark:text-katsu lg:text-base">
                    {comment.name}
                  </span>
                  <span className="rounded-lg bg-katsu px-4 text-sm font-semibold text-kami dark:bg-gure dark:text-katsu lg:text-base">
                    {moment(comment.createdAt).format("MMM DD, YYYY")}
                  </span>
                </div>
                <div className="whitespace-pre-line dark:text-kami">
                  <span className="font-fira font-semibold text-aka">
                    {"-> "}
                  </span>
                  <span>{parse(comment.comment)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
