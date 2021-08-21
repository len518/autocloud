import { Request, Response, Router } from "express";
import passport from "passport";
import { BreweryRetriever } from "./logic/breweryRetriever";
import { NullCleaner } from "./logic/nullCleaner";
import { CaseConverter } from "./logic/caseConverter";
import { ByStatesAggregator } from "./logic/byStatesAggregator";
import { RegionAdder } from "./logic/regionAdder";
const breweriesRouter = Router();
const breweryRetriever = new BreweryRetriever();
const nullCleaner = new NullCleaner();
const caseConverter = new CaseConverter();
const byStatesAggregator = new ByStatesAggregator();
const regionAdder = new RegionAdder();

breweriesRouter.get(
  "/",
  passport.authenticate("basic", { session: false }),
  async (req: Request, res: Response) => {
    let breweries = await breweryRetriever.getBreweries();
    breweries = await nullCleaner.clean(breweries);
    breweries = await regionAdder.addRegion(breweries);

    const cleanBreweries = await caseConverter.convert(breweries);
    const groupedBreweries = await byStatesAggregator.group(cleanBreweries);
    res.send(Array.from(groupedBreweries.entries()));
  }
);

export default breweriesRouter;
