import { LayoutProps } from "../lib/types";
import { SearchBar } from "./SearchBars";

export const Layout = (props: LayoutProps) => {
  return (
    <div className="page">
      <div className="header">
        <div className="logo">
          <span>News</span>
          Reader
        </div>
        <div className="searchbar-wrapper">
          <SearchBar searchTerm=""/>
        </div>
        <div className="account">
            <img src="" alt="" />
        </div>
      </div>
      <div className="main">{props.children}</div>
    </div>
  );
};
