import { RawBrewery } from "../schemas/RawBrewery.dto";
import { NullCleaner } from "./nullCleaner";
const nullCleaner = new NullCleaner();

describe("NullCleaner class", () => {
  describe("clean()", () => {
    it("should remove null properties", async () => {
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
      const cleanBreweries = await nullCleaner.clean(breweries);
      expect(cleanBreweries.length).toBe(1);
      expect(cleanBreweries[0].id).toBe(breweries[0].id);
      expect(cleanBreweries[0].address_3).toBeUndefined();
      expect(cleanBreweries[0].county_province).toBeUndefined();
      expect(cleanBreweries[0].longitude).toBeUndefined();
      expect(cleanBreweries[0].latitude).toBeUndefined();
    });
    it("should keep not null properties", async () => {
      const breweries = [
        {
          id: 9094,
          obdb_id: "bnaf-llc-austin",
          name: "Bnaf, LLC",
          brewery_type: "planning",
          street: "street",
          address_2: "add 2",
          address_3: "add 3",
          city: "Austin",
          state: "Texas",
          county_province: "province",
          postal_code: "78727-7602",
          country: "United States",
          longitude: "-105.2480158",
          latitude: "40.026439",
          phone: "123456789",
          website_url: "test.com",
          updated_at: "2018-07-24T00:00:00.000Z",
          created_at: "2018-07-24T00:00:00.000Z",
        } as RawBrewery,
      ];
      const cleanBreweries = await nullCleaner.clean(breweries);
      expect(cleanBreweries.length).toBe(1);
      expect(cleanBreweries[0]).toStrictEqual(breweries[0]);
    });
  });
});
