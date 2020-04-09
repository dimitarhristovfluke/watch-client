export type PageMode = "list" | "read" | "edit" | "new";

export interface PageState {
  error: string;
  isLoaded: boolean;
}

export interface Record<T> extends PageState {
  item: T;
  mode: PageMode;
}

export interface ListData<T> {
  items: T[];
  pageNumber: number;
  totalRecords: number;
  totalPages: number;
}

export type OrderDestination = "asc" | "desc";
export type Filter = {
  field: string;
  op: string;
  value: string;
};
export interface List<T> extends PageState {
  data?: ListData<T>;
  filter?: Filter;
  orderBy?: {
    field: string;
    dest: OrderDestination;
  };
}

export type Column<T> = {
  name: string;
  fn?: (arg0: T) => JSX.Element;
  label: string;
};
