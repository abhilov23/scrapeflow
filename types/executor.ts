import { Browser } from "puppeteer";

export type Environment ={

    browser?:Browser;
    //phases with nodeid/taskId with key
    phases: Record<string, {
        inputs:Record<string, string>,
        outputs:Record<string, string>
       }>;
}