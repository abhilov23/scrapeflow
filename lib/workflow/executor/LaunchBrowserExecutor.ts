import { waitFor } from "@/lib/helper/waitFor";
import { Environment } from "@/types/executor";
import puppeteer from "puppeteer";

export async function LaunchBrowserExecutor(environment:any):Promise<boolean>{
  try {
    console.log("@@env", JSON.stringify(environment, null, 4))
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