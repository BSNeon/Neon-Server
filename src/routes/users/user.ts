import { GET } from "../../router";
import { Response, Request } from "express";

export class ApiError {
    @GET("public/user/:id")
    async get(req: Request, res: Response) {
        const user = req.params.id;

        
    }
}