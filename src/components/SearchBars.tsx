import { useEffect, useState } from "react";
import {
  SearchBarProps,
  DateSearchBarProps,
  Category,
  Sentiment,
  Source,
} from "../lib/types";
import "../styles/components/Searchbars.css";
import { SubFetcher, VerifyDate } from "./Helpers";
import { Loader } from "./Loader";

export const SearchBar = (props: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(props.searchTerm);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({ ...props.filter });
  const [selectedType, setSelectedType] = useState({ type: "", title: "" });
  const [OptionSearchTerm, setOptionSearchTerm] = useState("");
  const [categories, setCategories] = useState([] as Array<Category>);
  const [categoryList, setCategoryList] = useState([] as Array<Category>);
  const [sources, setSources] = useState({} as { sources: Array<Source> });
  const [sourceList, setSourceList] = useState([] as Array<Source>);
  const [loading, setLoading] = useState(false);

  let sentimentList: Array<Sentiment> = ["Positive", "Neutral", "Negative"];

  const types = [
    { type: "category", title: "Category" },
    { type: "sentiment", title: "Sentiment" },
    { type: "source", title: "Source" },
  ];

  useEffect(() => {
    const GetResult = async () => {
      if (selectedType.type === "category") {
        setLoading(true)
        setCategories(await SubFetcher(selectedType.type));
      } else {
        setLoading(true)
        setSources(await SubFetcher(selectedType.type));
      }
    };

    if (
      (selectedType.type === "category" && categories.length === 0) ||
      (selectedType.type === "source" && !sources.sources)
    ) {
      GetResult().then(()=>setLoading(false));
    }

    if (selectedType.type === "category" && categories.length !== 0) {
      if (OptionSearchTerm === "") {
        setCategoryList(categories);
      } else {
        const results =
          categories.filter &&
          categories.filter((category) => {
            if (
              category.category
                .toLowerCase()
                .includes(OptionSearchTerm.toLowerCase())
            )
              return category;
          });
        setCategoryList(results);
      }
    }

    if (
      selectedType.type === "source" &&
      sources.sources &&
      sources.sources.length !== 0
    ) {
      if (OptionSearchTerm === "") {
        setSourceList(sources.sources);
      } else {
        const results =
          sources.sources.filter &&
          sources.sources.filter((source) => {
            if (
              source.name.toLowerCase().includes(OptionSearchTerm.toLowerCase())
            )
              return source;
          });
        setSourceList(results);
      }
    }
  }, [OptionSearchTerm, categories, sources, selectedType]);

  useEffect(() => {
    if (searchTerm === "" && searchTerm !== props.searchTerm) {
      setSearchTerm(props.searchTerm);
    }
  }, [props.searchTerm, searchTerm]);

  useEffect(() => {
    if (
      (!advancedFilters.sentiment && props.filter.sentiment) ||
      (!advancedFilters.category && props.filter.category) ||
      (!advancedFilters.source && props.filter.source)
    ) {
      setAdvancedFilters(props.filter);
    }
  }, [props.filter, advancedFilters]);

  return (
    <div className="searchbar-wrapper df">
      <div className="searchbar df">
        <div className="searchbar-input df">
          <img src="/icons/search.png" alt="" width="20px" height="20px" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                props.setSearchTerm(searchTerm);
              }
            }}
            placeholder="Search here ..."
          />
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
                <button
                  onClick={() => {
                    setSelectedType({ type: "", title: "" });
                    setOptionSearchTerm("");
                  }}
                >
                  Add New Filter
                </button>
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
                      {types.map((type, index) => (
                        <p
                          key={index}
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
                        advancedFilters[selectedType.type].map(
                          (item, index) => (
                            <p
                              className="df clickable"
                              onClick={() =>
                                setAdvancedFilters({
                                  ...advancedFilters,
                                  [selectedType.type]: [
                                    ...advancedFilters[selectedType.type].slice(
                                      0,
                                      index
                                    ),
                                    ...advancedFilters[selectedType.type].slice(
                                      index + 1,
                                      advancedFilters[selectedType.type].length
                                    ),
                                  ],
                                })
                              }
                              key={index}
                            >
                              {item.name}
                              <img
                                src="/icons/close.png"
                                alt=""
                                width="15px"
                                height="15px"
                              />
                            </p>
                          )
                        )}
                      <input
                        type="text"
                        value={OptionSearchTerm}
                        onChange={(e) => setOptionSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  {OptionSearchTerm !== "" && (
                    <div className="available">
                      {loading && <div className="loading-wrapper df">
                        <Loader />
                      </div> }
                      {selectedType.type === "category" &&
                        categoryList.map((category) => (
                          <p
                            key={category.iptc_code}
                            onClick={() => {
                              if (
                                !advancedFilters[selectedType.type] ||
                                (advancedFilters[selectedType.type] &&
                                  !advancedFilters[selectedType.type].find(
                                    (i) =>
                                      i.id === category.iptc_code &&
                                      i.name === category.category
                                  ))
                              ) {
                                setAdvancedFilters({
                                  ...advancedFilters,
                                  [selectedType.type]: advancedFilters[
                                    selectedType.type
                                  ]
                                    ? [
                                        ...advancedFilters[selectedType.type],
                                        {
                                          id: category.iptc_code,
                                          name: category.category,
                                        },
                                      ]
                                    : [
                                        {
                                          id: category.iptc_code,
                                          name: category.category,
                                        },
                                      ],
                                });
                              }
                              setOptionSearchTerm("");
                            }}
                          >
                            {category.category}
                          </p>
                        ))}
                      {selectedType.type === "source" &&
                        sourceList.map((source) => (
                          <p
                            key={source.id}
                            onClick={() => {
                              if (
                                !advancedFilters[selectedType.type] ||
                                (advancedFilters[selectedType.type] &&
                                  !advancedFilters[selectedType.type].find(
                                    (i) =>
                                      i.id === JSON.stringify(source.id) &&
                                      i.name === source.name
                                  ))
                              ) {
                                setAdvancedFilters({
                                  ...advancedFilters,
                                  [selectedType.type]: advancedFilters[
                                    selectedType.type
                                  ]
                                    ? [
                                        ...advancedFilters[selectedType.type],
                                        {
                                          id: JSON.stringify(source.id),
                                          name: source.name,
                                        },
                                      ]
                                    : [
                                        {
                                          id: JSON.stringify(source.id),
                                          name: source.name,
                                        },
                                      ],
                                });
                              }
                              setOptionSearchTerm("");
                            }}
                          >
                            {source.name}
                          </p>
                        ))}
                      {selectedType.type === "sentiment" &&
                        sentimentList.map((sentiment) => (
                          <p
                            key={sentiment}
                            onClick={() => {
                              setAdvancedFilters({
                                ...advancedFilters,
                                [selectedType.type]: [
                                  {
                                    id: sentiment,
                                    name: sentiment,
                                  },
                                ],
                              });
                              setOptionSearchTerm("");
                            }}
                          >
                            {sentiment}
                          </p>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="advanced-footer df">
              <button onClick={() => setShowAdvanced(false)}>Cancel</button>
              <button
                onClick={() => {
                  props.setFilter({ ...advancedFilters });
                  setShowAdvanced(false);
                }}
              >
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

  return (
    <div className="searchbar">
      <div className="searchbar-input df datesearch">
        <div className="dateinput-container">
          <div
            className="dateinput-wrapper df"
            onClick={() => setShowDateOptions(!showDateOptions)}
          >
            <div>
              {props.dateRange.from && props.dateRange.to
                ? `${props.dateRange.from} to ${props.dateRange.to}`
                : "Select Date Range"}{" "}
            </div>
            <img src="/icons/date.png" alt="" width="25px" height="25px" />
          </div>
          {showDateOptions && (
            <div className="date-selector df">
              <div>
                From:{" "}
                <input
                  type="date"
                  value={props.dateRange.from || ""}
                  onChange={(e) => {
                    if (props.dateRange.to) {
                      if (VerifyDate(e.target.value, props.dateRange.to)) {
                        props.setDateRange({
                          from: e.target.value,
                          to: props.dateRange.to,
                        });
                      }
                    } else {
                      props.setDateRange({
                        from: e.target.value,
                        to: props.dateRange.to,
                      });
                    }
                  }}
                  placeholder="From"
                  title="From"
                />
              </div>
              <div>
                To:{" "}
                <input
                  type="date"
                  value={props.dateRange.to || ""}
                  onChange={(e) => {
                    if (props.dateRange.from) {
                      if (VerifyDate(props.dateRange.from, e.target.value)) {
                        props.setDateRange({
                          from: props.dateRange.from,
                          to: e.target.value,
                        });
                      }
                    } else {
                      props.setDateRange({
                        from: props.dateRange.from,
                        to: e.target.value,
                      });
                    }
                    setShowDateOptions(false);
                  }}
                  placeholder="To"
                  title="To"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
