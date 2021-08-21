import { RawBrewery } from "../schemas/RawBrewery.dto";
import * as regions from "../regions.json";
export class RegionAdder {
  async addRegion(breweries: RawBrewery[]): Promise<RawBrewery[]> {
    breweries.forEach((brewery) => {
        if(regions[brewery.state.toLowerCase()]){
            brewery.region = regions[brewery.state.toLowerCase()];    
        }
    });
    return breweries;
  }
}
