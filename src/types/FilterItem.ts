export interface FilterItem {
  label: string;
  id: string;
  subThemes: [
    {
      label: string;
      id: string;
    },
  ];
}
