import dotenv from "dotenv";

class Config{
  public NODE_ENV: string;
  public PORT: number;
  public URL: string;
  public CLIENT_ID: string;
  public CLIENT_SECRET: string;
  public DEFAULT_LOCALE: string;
  public DEFAULT_REGION: string;

  constructor() {
    dotenv.config();

    this.NODE_ENV = String(process.env.NODE_ENV) || "development";
    this.PORT = Number(process.env.PORT) || 3000;
    this.URL = String(process.env.URL) || `http://localhost:${this.PORT}`;
    this.CLIENT_ID = String(process.env.CLIENT_ID) || "";
    this.CLIENT_SECRET = String(process.env.CLIENT_SECRET) || "";
    this.DEFAULT_LOCALE = String(process.env.DEFAULT_LOCALE) || "en_US";
    this.DEFAULT_REGION = String(process.env.DEFAULT_REGION) || "eu";
  }
}

export = new Config();
