import React, { Fragment, useEffect, useState, useContext } from "react";
import { Redirect, useParams } from "react-router";
import ReactTooltip from "react-tooltip";
import DOMPurify, { sanitize } from "dompurify";

import { FetchContext } from "../context/FetchContext";

import { getYearsPassed } from "../util/date";
import { publicFetch } from "../util/fetch";

import Button from "../components/common/Button";

function Book() {
  let { id } = useParams();

  const fetchContext = useContext(FetchContext);

  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const [review, setReview] = useState();
  const [reviewSubmissionLoading, setReviewSubmissionLoading] = useState();
  const [reviewSubmissionSuccess, setReviewSubmissionSuccess] = useState();
  const [reviewSubmissionError, setReviewSubmissionError] = useState();

  useEffect(() => {
    async function req() {
      try {
        setIsLoading(true);
        const { data: book_data } = await publicFetch.get(
          "search/one/" + encodeURIComponent(id)
        );
        const { data: reviews_data } = await publicFetch.get(
          "reviews/" + encodeURIComponent(id) + "/all"
        );
        setBook(book_data?.book);
        setReviews(reviews_data.reviews);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    req();
  }, []);

  function submitReview() {
    async function req() {
      try {
        setReviewSubmissionLoading(true);
        const { data } = await fetchContext.authAxios.post(
          "reviews/" + book.id + "/create",
          {
            text: review,
          }
        );

        setReviewSubmissionSuccess(data?.message);
        setReviewSubmissionError("");
        setTimeout(() => {}, 1500);
      } catch (error) {
        setReviewSubmissionLoading(false);
        // const { data } = error?.response;
        console.log(error);
        // setReviewSubmissionError(data?.message);
        setReviewSubmissionSuccess(null);
      }
    }
    req();
  }

  return (
    <Fragment>
      {!isLoading ? (
        <>
          {reviewSubmissionSuccess && (
            <Redirect to={window.location.pathname} />
          )}
          <div className="bg-gray-200 mx-24 rounded-sm shadow-md">
            <div className="flex">
              <div className="m-10">
                <img
                  width={200}
                  height={400}
                  src={book?.volumeInfo?.imageLinks?.thumbnail}
                  alt={book?.volumeInfo?.title}
                  className="rounded-md mx-5"
                />
              </div>
              <div className="m-10 relative">
                <h1 className="text-2xl">{book?.volumeInfo?.title}</h1>
                <h2 className="text-lg my-3">{book?.volumeInfo?.subtitle}</h2>
                <p
                  className="text-md my-3"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(book?.volumeInfo?.description),
                  }}
                ></p>
                <p
                  className="text-md my-3"
                  aria-label="European Format"
                  data-tip
                  data-for="publishment_date"
                >
                  Published on{" "}
                  <strong>
                    {new Date(
                      book?.volumeInfo?.publishedDate
                    ).toLocaleDateString("el-GR") || "None"}{" "}
                    ({getYearsPassed(book?.volumeInfo?.publishedDate)} years
                    ago)
                  </strong>
                </p>
                <ReactTooltip id="publishment_date" type="light" effect="float">
                  <span className="text-md">
                    Date is formatted in European format
                    <br />
                    American date:{" "}
                    {new Date(
                      book?.volumeInfo?.publishedDate
                    ).toLocaleDateString("en-US") || "None"}{" "}
                  </span>
                </ReactTooltip>
                <p className="text-md my-3">
                  Authored by{" "}
                  <strong>
                    {book?.volumeInfo?.authors?.join(", ") || "None"}
                  </strong>
                </p>
                <p className="text-md my-3">
                  Available formats:{" "}
                  <strong>
                    PDF: {book?.accessInfo?.pdf?.isAvailable ? "Yes" : "No"},
                    EPUB: {book?.accessInfo?.epub?.isAvailable ? "Yes" : "No"}
                  </strong>
                </p>
                <br />
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm bg-blue-600 text-white text-xl mx-auto shadow-md px-5 py-2 hover:bg-blue-700 hover:shadow-xl transition-all absolute bottom-0 left-0 select-none"
                  href={book?.volumeInfo?.previewLink}
                >
                  Read online
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="mx-96 bg-gray-200 rounded-md shadow-sm">
              <h1 className="text-2xl text-center font-medium p-4">
                Write your own review
              </h1>
              <div className="p-8">
                <textarea
                  onChange={(e) => setReview(e.target.value)}
                  value={review}
                  cols="30"
                  rows="3"
                  className="form-textarea mt-1 bg-gray-100 text-2xl rounded-md text-black block w-full"
                  placeholder={`My opinion about ${book?.volumeInfo?.title} is...`}
                ></textarea>
              </div>
              <div className="flex">
                <Button onClick={submitReview} className="mx-auto">
                  Submit
                </Button>
              </div>
            </div>
            {reviews?.length > 0 ? (
              reviews?.map((r) => {
                return (
                  <div className="mx-96 bg-gray-200 rounded-md shadow-sm">
                    <h1
                      className="text-2xl text-center font-semibold p-4"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(r.text, {
                          FORBID_TAGS: ["img", "style", "p"],
                        }),
                      }}
                    ></h1>
                    <h2 className="text-xl font-normal p-4">
                      <em>
                        {r.user.username},{" "}
                        {new Date(r.created_on).getFullYear()}
                      </em>
                    </h2>
                  </div>
                );
              })
            ) : (
              <h1 className="text-center text-2xl m-4">
                No reviews yet. Be the first to write one!
              </h1>
            )}
          </div>
        </>
      ) : (
        <div>Loading..</div>
      )}
    </Fragment>
  );
}

export default Book;
