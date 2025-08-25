// Content Island TypeScript interfaces - Generated from project structure

export interface Folder {
  id: string;
  language: "en";
  title: string;
  slug: string;
  items?: string[];
}

export interface Item {
  id: string;
  language: "en";
  title: string;
  slug: string;
  description?: string;
  content?: string;
}

export interface Root {
  id: string;
  language: "en";
  folders: string[];
}
