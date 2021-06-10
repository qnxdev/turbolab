import React, { SetStateAction } from "react";

export type Sentiment = "Positive" | "Neutral" | "Negative";

export interface Filters {
  [name: string]: Array<{ id: string; name: string }>;
}

export interface UserPref {
  searchTerm: string;
  filter?: Filters;
  dateRange?: DateRange;
}
export interface Category {
  category: string;
  iptc_code: string;
  sub_categories?: Array<{
    iptc_code: string;
    category: string;
  }>;
}

export interface Source {
  id: number;
  name: string;
  domain: string;
}
export interface ArticleData {
  result: { count: number; data: Array<ArticleProps>; nextUrl: string };
  error?: string;
}

export interface LayoutProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  children: React.ReactNode;
  filter: Filters;
  setFilter: (value: Filters) => void;
}

export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filter: Filters;
  setFilter: (value: Filters) => void;
}

export interface DateSearchBarProps {
  dateRange: DateRange;
  setDateRange: (values: DateRange) => void;
}

export interface DateRange {
  from?: string;
  to?: string;
}

export interface ArticleProps {
  date: string;
  sentiment: Sentiment;
  title: string;
  content: string;
  url: string;
  id: string;
  parent_classification: string;
  child_classification: string;
  publication: string;
}

export interface ArticleListProps {
  selected: number;
  setSelected: React.Dispatch<SetStateAction<number>>;
  dateRange: DateRange;
  setDateRange: (values: DateRange) => void;
  nextPage: () => void;
  articles: Array<{
    date: string;
    title: string;
    id: string;
    sentiment: Sentiment;
    publication: string;
  }>;
}
