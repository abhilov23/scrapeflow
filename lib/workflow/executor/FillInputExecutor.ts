import { ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import { FillInputTask } from "../task/FillInput";
import { waitFor } from "@/lib/helper/waitFor";

export async function FillInputExecutor(environment:ExecutionEnvironment<typeof FillInputTask>):Promise<boolean>{
  try {
    const selector = environment.getInput("Selector");
    if(!selector){
      environment.log.error("Missing input: Selector");
      return false;
    }

    const value = environment.getInput("value");
    if(!value){
      environment.log.error("Missing input: value");
      return false;
    }

    await environment.getPage()!.type(selector, value);
    await waitFor(3000);

    return true;
  } catch (error:any) {
    environment.log.error(error.message);
    return false;
  }
}