import { GenerateTextResponse } from "./gemini";

export interface ResponseFromBack{
    status:string,
    data:GenerateTextResponse
}