import fs from "fs/promises";
import path from "path";
import Config from "./config";
import { configureClient, promptOpenAi } from "./openai-demo";
import { parsePdf } from "./pdf";

const baseDir = "E:/Git/openai-extraction/data/"

async function main() {
    configureOpenAi();

    const paths = await fs.readdir(baseDir);
    const files = paths.map(p => path.join(baseDir, p));
    Promise.all(files.map(processFile))
}

async function processFile(file: string) {
    const baseFile = path.basename(file);
    console.log(`Processing file: ${baseFile}`);

    const pdf = await parsePdf(file);
    const text = pdf.text;
    const prompt = `Fasse mir das folgende Dokument in 2 Sätzen zusammen: \n${text}`;
    const answer = await promptOpenAi(prompt);

    answer.choices.forEach(ch => {
        const text = ch.text?.trim();
        console.log(`"${baseFile}": ${text}\n`);
    })
}

function configureOpenAi() {
    // setup openai clients
    const config = Config;
    configureClient(config.apiKey);
}

main();
