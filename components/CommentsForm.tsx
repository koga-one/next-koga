import React, { useState, useEffect, createRef, RefObject } from "react";

import { submitComment } from "../services";

type Props = {
  slug: string;
};

const CommentsForm = ({ slug }: Props) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl: RefObject<HTMLTextAreaElement> = createRef();
  const nameEl: RefObject<HTMLInputElement> = createRef();
  const emailEl: RefObject<HTMLInputElement> = createRef();
  const storeDataEl: RefObject<HTMLInputElement> = createRef();
  let comment = "";

  useEffect(() => {
    const name: string | null = window.localStorage.getItem("name");
    const email: string | null = window.localStorage.getItem("email");

    if (typeof name === "string" && typeof email === "string") {
      nameEl.current!.value = name;
      emailEl.current!.value = email;
    }
  }, []);

  const handleCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentEl.current!;
    const { value: name } = nameEl.current!;
    const { value: email } = emailEl.current!;
    const { checked: storeData } = storeDataEl.current!;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      commentEl.current!.value = "";
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="mt-2 rounded-lg py-8 px-4 shadow-lg dark:bg-kami dark:bg-opacity-5 lg:mt-8 lg:p-8">
      <h3 className="mb-8 text-center text-3xl font-semibold">Leave a reply</h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentEl}
          className="w-full rounded-lg border border-katsu bg-kami p-4 outline-none placeholder:text-gure focus:ring-4 focus:ring-aka focus:ring-opacity-40 dark:border-gure dark:bg-opacity-5 dark:text-kami"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          ref={nameEl}
          type="text"
          className="w-full rounded-lg border border-katsu bg-kami p-4 outline-none placeholder:text-gure focus:ring-4 focus:ring-aka focus:ring-opacity-40 dark:border-gure dark:bg-opacity-5 dark:text-kami"
          placeholder="Name"
          name="name"
        />
        <input
          ref={emailEl}
          type="text"
          className="w-full rounded-lg border border-katsu bg-kami p-4 outline-none placeholder:text-gure focus:ring-4 focus:ring-aka focus:ring-opacity-40 dark:border-gure dark:bg-opacity-5 dark:text-kami"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="text-gray-500 ml-2 cursor-pointer"
            htmlFor="storeData"
          >
            Save my e-mail and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-aka">All fields are required</p>}
      <div className="mt-8 flex place-content-center">
        {!showSuccessMessage && (
          <button
            type="button"
            onClick={handleCommentSubmission}
            className="rounded-lg bg-katsu px-4 py-2 text-kami transition active:scale-90 active:bg-ki dark:bg-kami dark:text-katsu"
          >
            <p className="font-semibold">Post Comment</p>
          </button>
        )}
        {showSuccessMessage && (
          <div className="rounded-lg bg-midori px-4 py-2 text-katsu transition">
            <p className="font-semibold">Comment submitted for review!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
