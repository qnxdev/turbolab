import { ArticleProps, ArticleListProps } from "../lib/types";
import { DateSearchBar } from "./SearchBars";
import "../styles/components/Article.css";
import { FormatDate } from "./Helpers";

export const ArticleList = (props: ArticleListProps) => {
  return (
    <div className="article-list-container">
      <DateSearchBar dateRange="" />
      <div className="article-list">
        {props.articles.map((article, index) => (
          <div
            onClick={() => props.setSelected(index)}
            className={`article-list-item clickable${
              props.selected === index ? " selected" : ""
            }`}
          >
            <div className="date">
              <p>{FormatDate(article.date)}</p>
            </div>
            <h4>{article.title}</h4>
            <div className="publisher">
              <span
                style={{
                  backgroundColor:
                    article.sentiment === "Postive"
                      ? "green"
                      : article.sentiment === "Neutral"
                      ? "grey"
                      : "red",
                }}
              ></span>
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
      <div className="detail df">
        <div className="publisher df">
          <img src="/icons/pub.png" alt="" width="25px" height="25px" />
          <p>{props.publication}</p>
        </div>
        <div className="date">
          <p>{FormatDate(props.date)}</p>
        </div>
      </div>
      <div className="content">
        <article>{props.content}</article>
      </div>
    </div>
  );
};
