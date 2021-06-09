import React, { SetStateAction } from "react";

export interface UserPref {
  [name: string]: Array<string>;
}

export interface LayoutProps {
  children: React.ReactNode;
  filter: UserPref;
  setFilter: React.Dispatch<SetStateAction<UserPref>>;
}

export interface SearchBarProps {
  searchTerm: string;
  filter: UserPref;
  setFilter: React.Dispatch<SetStateAction<UserPref>>;
}

export interface DateSearchBarProps {
  dateRange: string;
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
  selected: number;
  setSelected: React.Dispatch<SetStateAction<number>>;
  articles: Array<{
    date: string;
    title: string;
    id: string;
    sentiment: string;
    publication: string;
  }>;
}
