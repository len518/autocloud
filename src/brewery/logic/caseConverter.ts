import { RawBrewery } from "../schemas/RawBrewery.dto";
import { Brewery } from "../schemas/Brewery";
import { getKeys } from "../libs";
export class CaseConverter {
  async convert(breweries: RawBrewery[]): Promise<Brewery[]> {
    const convertedBreweries: Brewery[] = [];
    breweries.forEach((brewery) => {
      const convertedBrewery = {} as Brewery;
      for (const key of getKeys(brewery)) {
        const convertedProp = this.convertCase(key);
        convertedBrewery[convertedProp] = brewery[key];
      }
      convertedBreweries.push(convertedBrewery);
    });
    return convertedBreweries;
  }
  private convertCase(prop: string): string {
    return prop.replace(/_./g, this.replacer);
  }
  private replacer(match: string): string {
    return match.toUpperCase().replace("_", "");
  }
}
