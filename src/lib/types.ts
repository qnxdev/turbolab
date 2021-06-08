export interface LayoutProps {
  children: React.ReactNode;
}

export interface SearchBarProps {
  searchTerm: string;
}

export interface ArticleProps {
  date: string;
  sentiment: string;
  title: string;
  content: string;
  url: string;
  id: string;
  parent_classification: string;
  child_classification: string;
  publication: string;
}

export interface ArticleListProps {
  articles: Array<{
    date: string;
    title: string;
    id: string;
    publication: string;
  }>;
}
