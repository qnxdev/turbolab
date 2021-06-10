import { LayoutProps } from "../lib/types";
import { SearchBar } from "./SearchBars";
import '../styles/components/Layout.css';

export const Layout = (props: LayoutProps) => {
  return (
    <div className="page">
      <div className="header df">
        <div className="logo clickable" onClick={()=>props.setFilter({})} title="Reset filters">
          <span>News</span>
          Reader
        </div>
        <div className="searchbar-container df">
          <SearchBar searchTerm={props.searchTerm} setSearchTerm={props.setSearchTerm} filter={props.filter} setFilter={props.setFilter}/>
        </div>
        <div className="account">
            <img src="/icons/account.png" alt="" width="35px" height="30px"/>
        </div>
      </div>
      <div className="main">{props.children}</div>
    </div>
  );
};
