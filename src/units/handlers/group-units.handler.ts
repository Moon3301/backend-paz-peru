import { GroupedUnits, Unit } from '../interfaces/unit.interface';

export function groupUnitsHandler(units: Unit[]): GroupedUnits {
  const grouped: GroupedUnits = {};

  for (const unit of units) {
    const { CantidadDormitorios, Tipologia } = unit;
    const { IdTipologia, NombreTipologia, UrlImagenTipologia } = Tipologia;

    if (!grouped[CantidadDormitorios]) {
      grouped[CantidadDormitorios] = {};
    }

    if (!grouped[CantidadDormitorios][IdTipologia]) {
      grouped[CantidadDormitorios][IdTipologia] = {
        NombreTipologia,
        UrlImagenTipologia,
        Unidades: [],
      };
    }

    grouped[CantidadDormitorios][IdTipologia].Unidades.push(unit);
  }

  return sortGroupedUnits(grouped);
}

function sortGroupedUnits(grouped: GroupedUnits): GroupedUnits {
  const sorted: GroupedUnits = {};

  // Sort by number of dormitorios ascending
  for (const key of Object.keys(grouped).map(Number).sort((a, b) => a - b)) {
    const tipologias = grouped[key];

    // Sort typologies alphabetically (natural case insensitive)
    const sortedEntries = Object.entries(tipologias).sort(([, a], [, b]) =>
      a.NombreTipologia.localeCompare(b.NombreTipologia, undefined, {
        sensitivity: 'base',
        numeric: true,
      }),
    );

    sorted[key] = Object.fromEntries(sortedEntries);
  }

  return sorted;
}
