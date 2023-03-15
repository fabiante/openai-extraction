import * as fs from "fs/promises";
import pdf from "@cyber2024/pdf-parse-fixed";

export async function parsePdf(path: string) {
    return await pdf(await fs.readFile(path));
}
