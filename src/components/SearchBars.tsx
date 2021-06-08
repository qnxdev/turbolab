import { SearchBarProps } from "../lib/types";

export const SearchBar = (props: SearchBarProps) => {
  return (
    <div className="searchbar-wrapper">
      <div className="searchbar">
        <div className="searchbar-input">
          <i></i>
          <input type="text" placeholder="Search here" />
          <i></i>
        </div>
        <button>Advanced Search</button>
      </div>
      <div className="overlay">
        <div className="advanced">
          <div className="advanced-header">
            <p>Advanced Search</p>
            <div className="close">
              <i></i>
            </div>
          </div>
          <div className="advanced-container">
            <div className="advanced-adder">
              <button>Add New Filter</button>
            </div>
            <div className="advanced-selector">
              <div className="type-selector">
                <button>Select Filter</button>
                <div className="types">
                  <p>Category</p>
                  <p>Sentiment</p>
                  <p>Source</p>
                </div>
              </div>
              <p>is</p>
              <div className="option-selector">
                <div className="options">
                  <p>blah<i></i></p>
                  <input type="text" />
                </div>
              </div>
              
            </div>
          </div>
       <div className="advanced-footer">
         <button>Cancel</button>
         <button>Show Results</button>
       </div>
        </div>
      </div>
    </div>
  );
};

export const DateSearchBar = (props: SearchBarProps) => {
  return (
    <div className="searchbar">
      <div className="searchbar-input">
        <input type="text" placeholder="Select Date Range" />
        <i></i>
      </div>
      <button>Advanced Search</button>
    </div>
  );
};
