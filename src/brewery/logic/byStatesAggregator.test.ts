import { Brewery } from "../schemas/Brewery";
import { ByStatesAggregator } from "./byStatesAggregator";
const byStatesAggregator = new ByStatesAggregator();

describe("ByStatesAggregator class", () => {
  describe("group()", () => {
    it("should group breweries by state", async () => {
      const breweries = [
        {
          id: 9094,
          city: "Austin",
          state: "Texas",
        },
        {
          id: 9095,
          city: "Austin",
          state: "Texas",
        },
        {
          id: 9096,
          city: "Baltimore",
          state: "Maryland",
        },
      ] as Brewery[];
      const breweriesByState = await byStatesAggregator.group(breweries);
      expect(breweriesByState.size).toBe(2);
      expect(breweriesByState.get("Texas")?.length).toBe(2);
      expect(breweriesByState.get("Maryland")?.length).toBe(1);
      const texasIds = breweries.map((el) => {
        return el.id;
      });
      const texas = breweriesByState.get("Texas") || [];
      texas.forEach((brw) => {
        expect(texasIds.includes(brw.id)).toBe(true);
      });
    });
    it("should sort each state by date", async () => {
      const breweries = [
        {
          id: 9094,
          city: "Austin",
          state: "Texas",
          createdAt: "2018-08-13T00:00:00.000Z",
        },
        {
          id: 9095,
          city: "Austin",
          state: "Texas",
          createdAt: "2018-08-12T00:00:00.000Z",
        },
      ] as Brewery[];
      const breweriesByState = await byStatesAggregator.group(breweries);
      expect(breweriesByState.size).toBe(1);
      const texas = breweriesByState.get("Texas") || [];
      expect(texas[0].createdAt).toBe(breweries[1].createdAt);
      expect(texas[1].createdAt).toBe(breweries[0].createdAt);
    });
  });
});
