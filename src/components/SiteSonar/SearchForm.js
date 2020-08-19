import React, { useState } from "react";

import SearchBox from "./SearchBox.js";
import ResultBox from "./ResultBox";
import LastRunDiv from "./LastRunData.js";
import SearchQuery from "./SearchQuery.js";

const SearchForm = () => {
  const [Result, setSearchResult] = useState({
    GridSearch: "",
    ShowResult: false,
    SearchResults: {},
  });

  const [SearchEquation, setSearchEquation] = useState({
    value: "",
    hidden: true,
  });

  const [AllRuns, setAllRuns] = useState({ all_runs: "Loading" });
  const [SelectedRun, setSelectedRun] = useState({ selected_run: "Loading" });

  const handleRunSelection = (run_id) => {
    setSelectedRun(AllRuns[run_id]);
  };

  const storeSearchResults = (SearchResults) => {
    if (SearchResults["grid_search"] === true) {
      setSearchResult({
        GridSearch: true,
        ShowResult: true,
        SearchResults: SearchResults,
      });
    } else {
      setSearchResult({
        GridSearch: false,
        ShowResult: true,
        SearchResults: SearchResults,
      });
    }
  };

  const showSearchQuery = (SearchFormInput) => {
    const CharacterRegex = /([A-Z])/;
    var Equation = SearchFormInput.Equation;
    for (let letter of Equation) {
      if (CharacterRegex.test(letter)) {
        Equation = Equation.replace(
          letter,
          "(" +
            SearchFormInput.SearchFields[letter]["query_key"] +
            " : " +
            SearchFormInput.SearchFields[letter]["query_value"] +
            ")"
        );
      }
    }
    setSearchEquation({
      value: Equation,
      hidden: false,
    });
  };

  const handleRunChange = (data) => {
    const all_runs_array = {};
    for (const key in data.all_runs) {
      all_runs_array[data.all_runs[key].run_id] = data.all_runs[key];
    }
    setAllRuns(all_runs_array);
    setSelectedRun(data.selected_run);
  };

  return (
    <div>
      <LastRunDiv
        AllRuns={AllRuns}
        SelectedRun={SelectedRun}
        handleRunChange={handleRunChange}
        handleRunSelection={handleRunSelection}
      ></LastRunDiv>
      <SearchBox
        storeSearchResults={storeSearchResults}
        showSearchQuery={showSearchQuery}
        RunId={SelectedRun.run_id}
        style={{ margin: "10px" }}
      ></SearchBox>
      <SearchQuery
        equation={SearchEquation.value}
        hidden={SearchEquation.hidden}
      ></SearchQuery>
      <ResultBox
        searchData={Result.SearchResults}
        showResult={Result.ShowResult}
        GridSearch={Result.GridSearch}
      ></ResultBox>
    </div>
  );
};

export default SearchForm;
