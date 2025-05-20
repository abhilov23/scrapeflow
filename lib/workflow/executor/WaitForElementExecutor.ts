import { ExecutionEnvironment } from "@/types/executor";
import { waitFor } from "@/lib/helper/waitFor";
import { WaitForElementTask } from "../task/WaitForElement";

export async function WaitForElementExecutor(environment:ExecutionEnvironment<typeof WaitForElementTask>):Promise<boolean>{
  try {
    const selector = environment.getInput("Selector");
    if(!selector){
      environment.log.error("Missing input: Selector");
      return false;
    }

    const visibility = environment.getInput("Visibility");
    if(!visibility){
      environment.log.error("Missing input: Visibility");
      return false;
    }

    await environment.getPage()!.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    })
    
    environment.log.info(`Waited for element: ${selector} to be ${visibility}`);

    return true;
  } catch (error:any) {
    environment.log.error(error.message);
    return false;
  }
}