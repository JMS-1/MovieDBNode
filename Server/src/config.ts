import { existsSync, readFileSync } from "fs";
import { join } from "path";

export interface IConfiguration {
  db: string;
  defaultRoute: boolean;
  gqlPassword: string;
  gqlUser: string;
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

  return JSON.parse(raw.substr(raw.indexOf("{")));
}

export const Config = { ...loadConfig(""), ...loadConfig(".custom") };
