interface SeasonData {
  city:string;
  season:string;
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
}

interface AllSeasonData {
  springSeason: SeasonData
  summerSeason: SeasonData
  autumnSeason: SeasonData
  winterSeason: SeasonData
}
