import dotenv from "dotenv";

export abstract class Config{
    public static NODE_ENV: string = this.GetEnv<string>("NODE_ENV");
    public static PORT: number = this.GetEnv<number>("PORT");
    public static URL: string = this.GetEnv<string>("URL");
    public static CLIENT_ID: string = this.GetEnv<string>("CLIENT_ID");
    public static CLIENT_SECRET: string = this.GetEnv<string>("CLIENT_SECRET");
    public static DEFAULT_LOCALE: string = this.GetEnv<string>("DEFAULT_LOCALE");
    public static DEFAULT_REGION: string = this.GetEnv<string>("DEFAULT_REGION");

    private static GetEnv<T>(key: string): T
    {
        try
        {
            dotenv.config();
            let value = <unknown>process.env[key];
            return <T>value;
        }
        catch(exception: any)
        {
            console.error(exception);
            throw "oops";
        }
    }
}
