import dotenv from "dotenv";

class Config{
  public NODE_ENV: string;
  public PORT: number;
  public CLIENT_ID: string;
  public CLIENT_SECRET: string;
  public DEFAULT_LOCALE: string;

  constructor() {
    dotenv.config();

    this.NODE_ENV = String(process.env.NODE_ENV) || "development";
    this.PORT = Number(process.env.PORT) || 3000;
    this.CLIENT_ID = String(process.env.CLIENT_ID) || "";
    this.CLIENT_SECRET = String(process.env.CLIENT_SECRET) || "";
    this.DEFAULT_LOCALE = String(process.env.DEFAULT_LOCALE) || "en_US";
  }
}

export = new Config();
