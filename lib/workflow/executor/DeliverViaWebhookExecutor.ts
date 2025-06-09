import { ExecutionEnvironment } from "@/types/executor";
import { FillInputTask } from "../task/FillInput";
import { waitFor } from "@/lib/helper/waitFor";
import { ClickElementTask } from "../task/ClickElement";
import { DeliverViaWebhookTask } from "../task/DeliverViaWebhook";

export async function DeliverViaWebhookExecutor(environment:ExecutionEnvironment<typeof DeliverViaWebhookTask>):Promise<boolean>{
  try {
    const targetUrl = environment.getInput("Target URL");
    if(!targetUrl){
      environment.log.error("Input=>targetUrl not defined");
      return false;
    }

     const body = environment.getInput("Body");
    if(!body){
      environment.log.error("Input=> body not defined");
      return false;
    }


    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const statusCode = response.status;
    if(statusCode !== 200){
      environment.log.error(`Response status: ${statusCode}`);
      return false;
    }

    const reponseBody = await response.json();
    environment.log.info(`Response body: ${JSON.stringify(reponseBody)}`);

    return true;
  } catch (error:any) {
    environment.log.error(error.message);
    return false;
  }
}