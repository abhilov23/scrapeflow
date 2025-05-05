import { waitFor } from "@/lib/helper/waitFor";
import { Environment } from "@/types/executor";
import puppeteer from "puppeteer";
import { ExecutionEnvironment } from "@/types/executor";

export async function LaunchBrowserExecutor(environment:ExecutionEnvironment):Promise<boolean>{
  try {
    const websiteUrl = environment.getInput("Website Url");
    console.log("@@WEBSITE_URL:",websiteUrl)
    const browser = await puppeteer.launch({
        headless:false //for testing
    })
    await waitFor(3000)
    await browser.close();  
    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
}