import { ExecutionEnvironment } from "@/types/executor";
import { AddPropertyToJSONTask } from "../task/AddPropertyToJson";

export async function AddPropertyFromExecutorJson(environment:ExecutionEnvironment<typeof AddPropertyToJSONTask>):Promise<boolean>{
  try {
    const JSONdata = environment.getInput("JSON");
    if(!JSONdata){
      environment.log.error("Missing input: json");
    }

       const PropertyName = environment.getInput("Property name");
    if(!PropertyName){
      environment.log.error("Missing input: Property Name");
    }

    const propertyValue = environment.getInput("Property value");
    if(!PropertyName){
      environment.log.error("Missing input: Property Value");
    }



    const json = JSON.parse(JSONdata);
    json[propertyValue] = propertyValue;


    environment.setOutput("Updated JSON", json.Stringfy(json));    
    return true;
  } catch (error:any) {
    environment.log.error(error.message);
    return false;
  }
}