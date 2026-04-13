export interface SperantClientResponse {
  data?: {
    attributes?: {
      id?: number;
    };
  };
}

export interface ClientPayload {
  project_id: string;
  document: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  observation: string;
  input_channel_id: number;
  source_id: string;
  interest_type_id: number;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

export interface LeadPayload {
  client_id: number;
  unit_id: string;
  type_id: string;
  template_id: number;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

export interface EmailPayload {
  toEmail: string;
  firstName: string;
  lastName: string;
  unidad: string;
  tipologia: string;
  proyecto: string;
}
