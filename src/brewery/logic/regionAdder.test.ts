import { RawBrewery } from "../schemas/RawBrewery.dto";
import { RegionAdder } from "./regionAdder";
const regionAdder = new RegionAdder();
const regions = {
  texas: "south",
};

describe("ReggionAdder class", () => {
  describe("addRegion()", () => {
    it("should add the correct region to the brewery", async () => {
      const breweries = [
        {
          id: 9094,
          obdb_id: "bnaf-llc-austin",
          name: "Bnaf, LLC",
          brewery_type: "planning",
          street: "street",
          address_2: "add 2",
          address_3: null,
          city: "Austin",
          state: "Texas",
          county_province: null,
          postal_code: "78727-7602",
          country: "United States",
          longitude: null,
          latitude: null,
          phone: "123456789",
          website_url: "test.com",
          updated_at: "2018-07-24T00:00:00.000Z",
          created_at: "2018-07-24T00:00:00.000Z",
        } as RawBrewery,
      ];
      const breweriesWithRegion = await regionAdder.addRegion(breweries);
      expect(breweriesWithRegion.length).toBe(1);
      expect(breweriesWithRegion[0].id).toBe(breweries[0].id);
      expect(breweriesWithRegion[0].region).toBe(
        regions[breweries[0].state.toLowerCase()]
      );
    });
    it("should not add a region with wrong state, should not modify other properties", async () => {
      const breweries = [
        {
          id: 9094,
          obdb_id: "bnaf-llc-austin",
          name: "Bnaf, LLC",
          brewery_type: "planning",
          street: "street",
          address_2: "add 2",
          address_3: null,
          city: "Austin",
          state: "wrong-state",
          county_province: null,
          postal_code: "78727-7602",
          country: "United States",
          longitude: null,
          latitude: null,
          phone: "123456789",
          website_url: "test.com",
          updated_at: "2018-07-24T00:00:00.000Z",
          created_at: "2018-07-24T00:00:00.000Z",
        } as RawBrewery,
      ];
      const breweriesWithRegion = await regionAdder.addRegion(breweries);
      expect(breweriesWithRegion.length).toBe(1);
      expect(breweriesWithRegion[0]).toStrictEqual(breweries[0]);
      expect(breweriesWithRegion[0].region).toBeUndefined();
    });
  });
});
