import { RawBrewery } from "../schemas/RawBrewery.dto";
import { CaseConverter } from "./caseConverter";
const caseConverter = new CaseConverter();

describe("CaseConverter class", () => {
  describe("convert()", () => {
    it("should convert snake_case to camelCase", async () => {
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
      const convertedBreweries = await caseConverter.convert(breweries);
      expect(convertedBreweries.length).toBe(1);
      expect(convertedBreweries[0].id).toBe(breweries[0].id);
      expect(convertedBreweries[0].address2).toBe(breweries[0].address_2);
      expect(convertedBreweries[0].address3).toBe(breweries[0].address_3);
      expect(convertedBreweries[0].countyProvince).toBe(breweries[0].county_province);
      expect(convertedBreweries[0].postalCode).toBe(breweries[0].postal_code);
      expect(convertedBreweries[0].websiteUrl).toBe(breweries[0].website_url);
      expect(convertedBreweries[0].createdAt).toBe(breweries[0].created_at);
      expect(convertedBreweries[0].updatedAt).toBe(breweries[0].updated_at);
    });
    it("should not modify other properties", async () => {
      const breweries = [
        {
          id: 9094,
          name: "Bnaf, LLC",
          street: "street",
          city: "Austin",
          state: "Texas",
          country: "United States",
          longitude: "-105.2480158",
          latitude: "40.026439",
          phone: "123456789",
        } as RawBrewery,
      ];
      
      const cleanBreweries = await caseConverter.convert(breweries);
      expect(cleanBreweries.length).toBe(1);
      expect(cleanBreweries[0]).toStrictEqual(breweries[0]);
    });
  });
});
