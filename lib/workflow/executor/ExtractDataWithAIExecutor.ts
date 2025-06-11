import { ExecutionEnvironment } from "@/types/executor";
import { ExtractDataWithAITask } from "../task/ExtractDataWithAI";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";

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


    const mockExtractedData ={
       usernameSelector : "#password",
       passwordSelector : "#username",
       loginSelector: "body > div > form > input.btn.btn-primary"
    }
     
    environment.setOutput("Extracted Data", JSON.stringify(mockExtractedData));

    console.log("@@PLAIN CREDENTIAL", plainCredentialValue);


    return true;
  } catch (error:any) {
    environment.log.error(error.message);
    return false;
  }
}