import { useState } from "react";
import { SearchBarProps, DateSearchBarProps } from "../lib/types";
import "../styles/components/Searchbars.css";

export const SearchBar = (props: SearchBarProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({ ...props.filter });
  const [selectedType, setSelectedType] = useState({ type: "", title: "" });
  const [OptionSearchTerm, setOptionSearchTerm] = useState("");

  const types = [
    { type: "category", title: "Category" },
    { type: "sentiment", title: "Sentiment" },
    { type: "source", title: "Source" },
  ];

  return (
    <div className="searchbar-wrapper df">
      <div className="searchbar df">
        <div className="searchbar-input df">
          <img src="/icons/search.png" alt="" width="20px" height="20px" />
          <input type="text" placeholder="Search here ..." />
          <img src="/icons/arrow.png" alt="" width="20px" height="20px" />
        </div>
        <button onClick={() => setShowAdvanced(true)}>Advanced Search</button>
      </div>
      {showAdvanced && (
        <div className="overlay">
          <div className="advanced">
            <div className="advanced-header df">
              <h4>Advanced Search</h4>
              <div className="close">
                <img
                  className="clickable"
                  onClick={() => setShowAdvanced(false)}
                  src="/icons/close.png"
                  alt=""
                  width="22px"
                  height="20px"
                />
              </div>
            </div>
            <div className="advanced-container">
              <div className="advanced-adder df">
                <button>Add New Filter</button>
              </div>
              <div className="advanced-selector df">
                <div className="type-selector">
                  <button
                    className="df"
                    onClick={() => setShowTypes(!showTypes)}
                  >
                    {selectedType.type === ""
                      ? "Select Filter"
                      : selectedType.title}
                    <img
                      src="/icons/arrow.png"
                      alt=""
                      width="20px"
                      height="20px"
                    />
                  </button>
                  {showTypes && (
                    <div className="types">
                      {types.map((type) => (
                        <p
                          className="clickable"
                          onClick={() => {
                            setSelectedType(type);
                            setShowTypes(false);
                          }}
                        >
                          {type.title}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <p>is</p>
                <div className="options-wrapper">
                  <div className="option-selector df">
                    <div className="options df">
                      {selectedType.type !== "" &&
                        advancedFilters[selectedType.type] &&
                        advancedFilters[selectedType.type].map((item) => (
                          <p className="df clickable">
                            {item}
                            <img
                              src="/icons/close.png"
                              alt=""
                              width="15px"
                              height="15px"
                            />
                          </p>
                        ))}
                      <input
                        type="text"
                        onChange={(e) => setOptionSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  {OptionSearchTerm !== "" && (
                    <div className="available">
                      <p
                        onClick={() => {
                          if (advancedFilters[selectedType.type].includes("")) {
                            setAdvancedFilters({
                              ...advancedFilters,

                              [selectedType.type]: [
                                ...advancedFilters[selectedType.type],
                                "",
                              ],
                            });
                          }
                        }}
                      >
                        {"sdf"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="advanced-footer df">
              <button onClick={() => setShowAdvanced(false)}>Cancel</button>
              <button onClick={() => props.setFilter({ ...advancedFilters })}>
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const DateSearchBar = (props: DateSearchBarProps) => {
  const [showDateOptions, setShowDateOptions] = useState(false);
  let date = new Date();
  let d = date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate();
  return (
    <div className="searchbar">
      <div className="searchbar-input df datesearch">
        <div onClick={() => setShowDateOptions(!showDateOptions)}>
          <div>Select Date Range</div>
          <img src="/icons/date.png" alt="" width="25px" height="25px" />
        </div>
        <div className="date-selector">
          From:{" "}
          <input
            type="date"
            onChange={(e) => console.log(e.target.value)}
            placeholder="From"
            title="From"
          />
          To:{" "}
          <input
            type="date"
            onChange={(e) => console.log(e.target.value)}
            placeholder="To"
            title="To"
          />
        </div>
      </div>
    </div>
  );
};
