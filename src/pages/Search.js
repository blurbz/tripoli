import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

import RotateLoader from "react-spinners/RotateLoader";
import { getYearsPassed } from "../util/date";
import { publicFetch } from "../util/fetch";

function Search() {
  let { query } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    async function req() {
      try {
        setIsLoading(true);
        const { data } = await publicFetch.get(
          "search/" + encodeURIComponent(query)
        );
        setResults(data?.books);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    req();
  }, []);

  return (
    <Fragment>
      <h1 className="text-3xl text-center">
        Results for <em>{query}</em>
      </h1>
      <div className="p-24">
        {!isLoading ? (
          results
            .sort((a, b) =>
              a?.volumeInfo.hasOwnProperty("subtitle")
                ? -1
                : b?.volumeInfo.hasOwnProperty("subtitle")
                ? 1
                : 0
            )
            .sort((a, b) =>
              a?.volumeInfo.hasOwnProperty("description")
                ? -1
                : b?.volumeInfo.hasOwnProperty("description")
                ? 1
                : 0
            )
            .map((result) => {
              return (
                <div className="m-4 bg-gray-200 rounded-md p-4">
                  <div className="flex gap-8">
                    <div className="flex-shrink-0">
                      <img
                        src={
                          result?.volumeInfo?.imageLinks?.smallThumbnail ||
                          "https://via.placeholder.com/130x200"
                        }
                        alt={result.volumeInfo.title}
                        width="130"
                        height="200"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="relative">
                      <h1 className="text-3xl mb-2">
                        {result.volumeInfo.title
                          .split(/\s+/)
                          .slice(0, 10)
                          .join(" ")}
                      </h1>
                      <h3 className="py-2">{result.volumeInfo.subtitle}</h3>
                      <p className="text-md mb-5">
                        {/* Author */}
                        Author:{" "}
                        <strong>
                          {result?.volumeInfo?.authors?.join() || "None"}
                        </strong>
                        <br />
                        {/* Publishment Date */}
                        Published on:{" "}
                        <strong>
                          {result?.volumeInfo?.publishedDate || "None"} (
                          {getYearsPassed(result?.volumeInfo?.publishedDate)}{" "}
                          years ago)
                        </strong>
                        <br />
                        {/* Description */}
                        Description:{" "}
                        <strong>
                          {result?.volumeInfo?.description?.slice(0, 300) ||
                            "None"}
                          ...
                        </strong>
                        <br />
                      </p>
                      <br />
                      <Link
                        to={"/book/" + encodeURIComponent(result?.id)}
                        className="rounded-sm bg-blue-600 text-white text-xl mx-auto shadow-md px-5 py-2 hover:bg-blue-700 hover:shadow-xl transition-all absolute bottom-0 left-0"
                      >
                        Select
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <div className="flex m-24">
            <div className="mx-auto">
              <RotateLoader loading={true} color={"#2563eb"} />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Search;
