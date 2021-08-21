import { Brewery } from "../schemas/Brewery";
export class ByStatesAggregator {
  async group(breweries: Brewery[]): Promise<Map<string, Brewery[]>> {
    const breweryMap = new Map<string, Brewery[]>();
    breweries.forEach((brewery) => {
      let breweriesByState = breweryMap.get(brewery.state);
      if (breweriesByState) {
        breweriesByState.push(brewery);
      } else {
        breweriesByState = [brewery];
      }
      breweryMap.set(brewery.state, breweriesByState);
    });
    const sortedBreweryMap = new Map<string, Brewery[]>();
    breweryMap.forEach((brewery, state) => {
      sortedBreweryMap.set(state, this.sortByDate(brewery));
    });
    return sortedBreweryMap;
  }

  private sortByDate(breweries: Brewery[]): Brewery[] {
    breweries.sort((a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1;
    });
    return breweries;
  }
}
