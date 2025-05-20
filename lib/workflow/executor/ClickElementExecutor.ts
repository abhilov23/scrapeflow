import { ExecutionEnvironment } from "@/types/executor";
import { FillInputTask } from "../task/FillInput";
import { waitFor } from "@/lib/helper/waitFor";
import { ClickElementTask } from "../task/ClickElement";

export async function ClickElementExecutor(environment:ExecutionEnvironment<typeof ClickElementTask>):Promise<boolean>{
  try {
    const selector = environment.getInput("Selector");
    if(!selector){
      environment.log.error("Missing input: Selector");
      return false;
    }

    await environment.getPage()!.click(selector);
    await waitFor(3000);

    return true;
  } catch (error:any) {
    environment.log.error(error.message);
    return false;
  }
}