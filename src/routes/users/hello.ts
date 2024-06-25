import { Request, Response } from "express";
import { GET } from "../../router";

export class ApiError {
    @GET("hello")
    async get(req: Request, res: Response) {
        res.send("hello!");
    }
}