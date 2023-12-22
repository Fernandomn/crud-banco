export interface RequestParams {
  _page: number;
  filter?: string;
  tableHeaders?: TableHeader[];
}

export interface DialogData {
  modalIcon: 'circle-alert' | 'circle-tick';
  text: string;
  enableCancel: boolean;
}

export interface TableHeader {
  name: string;
  key: string;
  sort?: undefined | 'asc' | 'desc';
}
