import { ExecutionEnvironment } from "@/types/executor";
import { ExtractDataWithAITask } from "../task/ExtractDataWithAI";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import OpenAI from "openai";

export async function ExtractDataWithAIExecutor(environment:ExecutionEnvironment<typeof ExtractDataWithAITask>):Promise<boolean>{
  try {
    const Credentials = environment.getInput("Credentials");
    if(!Credentials){
      environment.log.error("Missing input: Credentials");
      return false;
    }


    const prompt = environment.getInput("Prompt");
    if(!prompt){
      environment.log.error("Missing input: Prompt");
      return false;
    }


    const content = environment.getInput("Content");
    if(!content){
      environment.log.error("Missing input: Content");
      return false;
    }

    
    //Get credentials from database
    const credential = await prisma.credential.findUnique({
      where: {
        id: Credentials
      }
    })

    if(!credential){
      environment.log.error("Credential not found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);
    if(!plainCredentialValue){
      environment.log.error("Failed to decrypt credential value");
      return false;
    }


   const openAI = new OpenAI({
    apiKey: plainCredentialValue,
  });
     
    const response = await openAI.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a webscraper helper that extracts data fron HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you want to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text" ,
        },
        {
          role: "user",
          content: content,
        },{
          role: "user",
          content: prompt
        }
      ],
      temperature: 1,
    });


    console.log("@@TOKENS_USED", response.usage?.prompt_tokens);
    console.log("@@TOKENS_USED", response.usage?.completion_tokens);
s




    return true;
  } catch (error:any) {
    environment.log.error(error.message);
    return false;
  }
}