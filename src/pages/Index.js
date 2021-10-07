import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import TextInput from "../components/common/Input";

function Index() {
  const [query, setQuery] = useState("");
  const history = useHistory();
  function handleSearch(e) {
    e.preventDefault();
    setQuery("");
    history.push("/search/" + encodeURIComponent(query));
  }
  return (
    <Fragment>
      <div className="mt-28">
        <div className="flex">
          <form onSubmit={handleSearch} className="mx-auto flex flex-col">
            <span className="text-center mx-auto text-xl text-gray-700 select-none">
              What are you looking for?
            </span>
            <TextInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Book Title"
            />
            <label className="px-5 text-gray-500 select-none">
              e.g.: 1984 or Animal Farm
            </label>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Index;
