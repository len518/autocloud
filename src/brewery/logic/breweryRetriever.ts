import axios from "axios";
import { RawBrewery } from "../schemas/RawBrewery.dto";

export class BreweryRetriever {
  async getBreweries(): Promise<RawBrewery[]> {
    const res = await axios.get<RawBrewery[]>(
      "https://api.openbrewerydb.org/breweries"
    );
    return res.data;
  }
}
