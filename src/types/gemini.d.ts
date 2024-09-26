import { PublicationData } from "./publicationData";

export interface GenerateTextParams {
    questionPrompt:string,
    dataArticles:PublicationData[]
}

type ArrayUuid ={
    uuid:string
}
export interface GenerateTextResponse {
    message:string,
    articlesResponse:ArrayUuid[]
}