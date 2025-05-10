import { ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import { PageToHtmlTask } from "../task/PageToHtml";
import { ExtractTextFromElement } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";
export async function ExtractTextFromElementExecutor(environment:ExecutionEnvironment<typeof ExtractTextFromElement>):Promise<boolean>{
  try {
    
    const selector = environment.getInput("Selector")
    if(!selector){
      environment.log.error("selector is not provided");
      return false;
    }
    
    const html = environment.getInput("Html")
    if(!html){
      environment.log.error("Html is not provided");
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if(!element){
      environment.log.error("element is not provided");
      return false;
       }

       const extractedText=$.text(element);
       if(!extractedText){
        environment.log.error("Element has no text");
          return false;
       }
       
       environment.setOutput("Extracted text", extractedText);

    return true;
  } catch (error:any) {
    environment.log.error(error.message);
    return false;
  }
}