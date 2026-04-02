export interface CityConfig {
  name: string;
  slug: string;
  zip: string;
  peakSunHours: number;
  lat: number;
  description: string;
}

export const cities: CityConfig[] = [
  {
    name: "Houston",
    slug: "houston",
    zip: "77001",
    peakSunHours: 4.5,
    lat: 29.76,
    description: "Texas's largest city and a solar leader with strong buyback options.",
  },
  {
    name: "Dallas",
    slug: "dallas",
    zip: "75201",
    peakSunHours: 4.8,
    lat: 32.78,
    description: "A thriving metro where competitive electricity rates make solar a smart bet.",
  },
  {
    name: "Austin",
    slug: "austin",
    zip: "78701",
    peakSunHours: 4.9,
    lat: 30.27,
    description: "Austin's tech-forward culture and sun exposure drive fast solar adoption.",
  },
  {
    name: "San Antonio",
    slug: "san-antonio",
    zip: "78201",
    peakSunHours: 5.0,
    lat: 29.42,
    description: "Ample sunshine and rising electricity bills make San Antonio ideal for solar.",
  },
  {
    name: "Fort Worth",
    slug: "fort-worth",
    zip: "76101",
    peakSunHours: 4.8,
    lat: 32.75,
    description: "Fort Worth homeowners enjoy strong solar returns in North Texas's deregulated market.",
  },
  {
    name: "Corpus Christi",
    slug: "corpus-christi",
    zip: "78401",
    peakSunHours: 5.2,
    lat: 27.80,
    description: "One of the sunniest cities in Texas — excellent conditions for maximizing solar output.",
  },
  {
    name: "Plano",
    slug: "plano",
    zip: "75024",
    peakSunHours: 4.8,
    lat: 33.02,
    description: "Plano's suburban rooftops and competitive rates make solar an easy win.",
  },
  {
    name: "Lubbock",
    slug: "lubbock",
    zip: "79401",
    peakSunHours: 5.5,
    lat: 33.58,
    description: "West Texas sunshine gives Lubbock the highest peak sun hours in the state.",
  },
];

export function getCityBySlug(slug: string): CityConfig | undefined {
  return cities.find((c) => c.slug === slug);
}
