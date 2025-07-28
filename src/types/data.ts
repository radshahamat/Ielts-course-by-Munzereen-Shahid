export interface ResponseModel {
  code: number,
  data: Data,
  error: string[],
  message: string,
  payload: [],
  status_code: 200,
}

export interface Data {
  slug: string
  id: number
  title: string
  description: string
  media: Medium[]
  checklist: Checklist[]
  seo: string[]
  cta_text: { name: string, value: string }
  sections: Section[]
}

export interface Medium {
  name: string;
  resource_type: string;
  resource_value: string;
  thumbnail_url: string;
}

export interface Checklist {
  id: number;
  color: string;
  icon: string;
  list_page_visibility: string;
  text: string;
}

export interface Section {
  type: string;
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: SectionValue[];
}

export interface SectionValue {
  checklist: string[];
  subtitle: string;
  title: string;
  description: string | TrustedHTML;
  name: string;
  background_color: string,
  background_img: string,
  checklist_text_color: string,
  end_at: Date,
  id: string,
  start_at: Date,
  template: string,
  text: string,
}