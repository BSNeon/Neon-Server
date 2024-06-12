import { Request, Response } from "express";
import { GET } from "../../router";

export class ApiError {
    @GET("/error")
    async get(req: Request, res: Response) {
        return res.sendStatus(400);
    }
}