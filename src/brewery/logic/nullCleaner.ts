import { RawBrewery } from "../schemas/RawBrewery.dto";
import { getKeys } from "../libs";
export class NullCleaner {
  async clean(breweries: RawBrewery[]): Promise<RawBrewery[]> {
    breweries.forEach((brewery) => {
      for (const key of getKeys(brewery)) {
        if (brewery[key] == null) {
          delete brewery[key];
        }
      }
    });
    return breweries;
  }
}
