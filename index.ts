import express, { Application, Request, Response } from "express";
import breweriesRouter from "./src/brewery/routes";
import { BasicStrategy } from "passport-http";
import passport from "passport";

const app: Application = express();
const port = 3000;

passport.use(
  new BasicStrategy((username, password, done) => {
    if (username === "admin" && password === "admin") {
      return done(null, true);
    }
    return done(null, false);
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/breweries", breweriesRouter);
app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
