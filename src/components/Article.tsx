import { ArticleProps, ArticleListProps } from "../lib/types";
import { DateSearchBar } from "./SearchBars";

export const ArticleList = (props: ArticleListProps) => {
  return (
    <div className="article-list-container">
      <DateSearchBar searchTerm=""/>
      <div className="article-list">
      {props.articles.map((article) => (
        <div className="article-list-item">
          <div className="date">
            <p>{article.date}</p>
          </div>
          <h4>{article.title}</h4>
          <div className="publisher">
            <i></i>
            <p>{article.publication}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export const Article = (props: ArticleProps) => {
  return (
    <div className="article">
      <div className="article-head">
        <h1>{props.title}</h1>
      </div>
      <div className="detail">
        <div className="publisher">
          <img src="" alt="" />
          <p>{props.publication}</p>
        </div>
        <div className="date">
          <p>{props.date}</p>
        </div>
      </div>
      <div className="content">
        <p>{props.content}</p>
      </div>
    </div>
  );
};
