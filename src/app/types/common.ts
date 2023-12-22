export interface RequestParams {
  _page: number;
  filter?: string;
}

export interface DialogData {
  modalIcon: 'circle-alert' | 'circle-tick';
  text: string;
  enableCancel: boolean;
}
