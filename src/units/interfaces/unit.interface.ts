export interface Tipologia {
  IdTipologia: number;
  NombreTipologia: string;
  UrlImagenTipologia: string;
}

export interface Unit {
  IdUnidad: number;
  NombreUnidad: string;
  CantidadDormitorios: number;
  Tipologia: Tipologia;
  [key: string]: unknown;
}

export interface GroupedTipologia {
  NombreTipologia: string;
  UrlImagenTipologia: string;
  Unidades: Unit[];
}

export interface GroupedByDormitorios {
  [tipologiaId: number]: GroupedTipologia;
}

export interface GroupedUnits {
  [dormitorios: number]: GroupedByDormitorios;
}
