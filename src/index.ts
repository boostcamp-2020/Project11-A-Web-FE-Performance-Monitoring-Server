import express from "express";
class App {
  public application: express.Application;
  constructor() {
    this.application = express();
  }
  test(params: string): string {
    return params + " world !";
  }
}

const app = new App();
console.log(app.test("hello"));
app.application.get("/", (req: express.Request, res: express.Response) => {
  res.send("start");
});
app.application.listen(4000, () => console.log("start"));
