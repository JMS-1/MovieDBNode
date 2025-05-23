import { existsSync, readFileSync } from "fs";
import { join } from "path";

export interface IConfiguration {
  db: string;
  defaultRoute: boolean;
  password: string;
  port: number;
  user: string;
}

function loadConfig(name: string): IConfiguration {
  const defPath = join(__dirname, `../config${name}.json`);

  if (!existsSync(defPath)) {
    return undefined as unknown as IConfiguration;
  }

  const raw = readFileSync(defPath).toString();

  return JSON.parse(raw.substring(raw.indexOf("{")));
}

export const Config = { ...loadConfig(""), ...loadConfig(".custom") };
