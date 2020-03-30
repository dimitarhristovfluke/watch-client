export type PageMode = "list" | "read" | "edit" | "new";

interface PageState {
  error: any;
  isLoaded: boolean;
}

export interface Record<T> extends PageState {
  item: T;
  mode: PageMode;
}

export interface List<T> extends PageState {
  items: T[];
  pageNumber: number;
  pageSize: number;
}
