import { Configuration, OpenAIApi } from "openai";

let clientKey: string;
let client: OpenAIApi;

function useClient(): OpenAIApi {
  if (!client) {  
    const configuration = new Configuration({
      apiKey: clientKey,
    });
  
    const openai = new OpenAIApi(configuration);
    client = openai;
  }
  return client;
}

export function configureClient(apiKey: string) {
  clientKey = apiKey;
}

export async function promptOpenAi(prompt: string) {
  const client = useClient();
  const response = await client.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  if (response.status !== 200) {
    throw new Error("OpenAI API returned an error: " + response.statusText);
  }

  return response.data;
}
