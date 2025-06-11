import { ExecutionEnvironment } from "@/types/executor";
import { FillInputTask } from "../task/FillInput";
import { waitFor } from "@/lib/helper/waitFor";
import { ClickElementTask } from "../task/ClickElement";
import { ReadPropertyFromJSONTask } from "../task/ReadPropertyFromJSON";

export async function ReadPropertyFromExecutorJson(environment:ExecutionEnvironment<typeof ReadPropertyFromJSONTask>):Promise<boolean>{
  try {
    const JSONdata = environment.getInput("JSON");
    if(!JSONdata){
      environment.log.error("Missing input: json");
    }

       const PropertyName = environment.getInput("Property name");
    if(!PropertyName){
      environment.log.error("Missing input: Property Name");
    }

    const json = JSON.parse(JSONdata);
    const propertyValue = json[PropertyName];
    if(propertyValue === undefined){
      environment.log.error(`Property ${PropertyName} not found in JSON data`);
      return false;
    }



    environment.setOutput("Property Value", propertyValue);    
    return true;
  } catch (error:any) {
    environment.log.error(error.message);
    return false;
  }
}