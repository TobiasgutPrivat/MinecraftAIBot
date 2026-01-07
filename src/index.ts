import Bot from "./Bot";
import ask from "./AI/api";

ask("Hello").then((response: string) => console.log(response));
// const hugo = new Bot("Hugo");
