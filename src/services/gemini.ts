import { GenerateTextParams } from "../types/gemini";
import { ResponseFromBack } from "../types/response";

export class geminiServices {
    static  getResponse= async(generateTextParams:GenerateTextParams):Promise<ResponseFromBack> =>{
        const {dataArticles,questionPrompt}=generateTextParams
        // console.log('llego hacia la solicutd',dataArticles,questionPrompt)
        const body = {
            dataArticles,questionPrompt
        }
        console.log(body)
        const response = await fetch("http://localhost:3000/llm",{
            method:"POST",
            headers:{
                  "Content-type": "application/json",
            },
            body:JSON.stringify(body)
        })
        const result = await response.json()
        return result
    }
}