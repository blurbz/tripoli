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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-10">
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
                <div class="max-w-md mx-auto bg-gray-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                  <div class="sm:flex">
                    <div class="sm:flex-shrink-0">
                      <img className="h-48 w-full object-cover sm:h-full sm:w-48" src={
                        result?.volumeInfo?.imageLinks?.smallThumbnail ||
                        "https://via.placeholder.com/130x200"
                      }
                        alt={result.volumeInfo.title} />
                    </div>
                    <div class="p-8">
                      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{result.volumeInfo.title
                        .split(/\s+/)
                        .slice(0, 10)
                        .join(" ")}</div>
                      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{result.volumeInfo.subtitle}</a>
                      <p className="text-md mt-2 mb-8">
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
                      <Link
                        to={"/book/" + encodeURIComponent(result?.id)}
                        className="rounded-sm bg-blue-600 text-white text-xl mx-auto shadow-md px-5 py-2 hover:bg-blue-700 hover:shadow-xl transition-all "
                      >
                        Select
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <div className="flex m-24 items-center">
            <div className="">
              <RotateLoader loading={true} color={"#2563eb"} />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Search;
