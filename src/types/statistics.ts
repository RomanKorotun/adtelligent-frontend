export type Row = Record<string, any>;

export type Column = {
  key: string;
  label: string;
};

export type FilterItem = {
  name: string;
  value: string;
};

export type Filter = {
  id: string;
  name: string;
  filters: FilterItem[];
};

export type SavedViewSummary = {
  id: string;
  name: string;
};

export type SavedViewDetail = {
  id: string;
  name: string;
  filters: FilterItem[];
  createdAt: string;
};

export type SaveFilterInput = {
  name: string;
  filters: FilterItem[];
};
