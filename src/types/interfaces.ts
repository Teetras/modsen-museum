import { ReactNode } from "react";

export interface Artwork {
  id: number;
  image_id: string;
  title: string;
  artist_title: string;
  gallery_title: string;
  artist_display: string;
  dimensions: string;
  date_display: string;
  is_on_view: boolean;
  _score: number;
  credit_line: string;
  place_of_origin: string;
}
export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string | null;
}
export interface PaginationProps {
  pagination: Pagination;
  setPage: (page: number) => void;
}

export interface ResponseApi {
  data: Artwork[];
  pagination: Pagination;
}
export interface ErrorBoundaryProps {
  children: ReactNode;
}
export interface ErrorBoundaryState {
  hasError: boolean;
}
export interface TitleProps {
  text?: string;
  title?: string;
}
export interface ArtCardInfoProps {
  art: Artwork;
}
export interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
}
export interface SearchResultsProps {
  errorMsg: string;
  sortField: string;
  setSortField: (field: string) => void;
  filteredItems: Artwork[];
}
export interface PaginationButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  ariaCurrent?:
    | "true"
    | "false"
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
    | undefined;
}
