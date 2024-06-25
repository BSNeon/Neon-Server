import db from "../../db";
import { GET, POST } from "../../router";
import { Request, Response } from "express";

// eslint-disable-next-line no-unused-vars
class UserAuthentication {
    @GET("auth/user/:id") // TODO: Add :id authentication to this function
    async get(req: Request, res: Response) {
        // eslint-disable-next-line curly
        if (!req.params) res.sendStatus(404);

        const user = await db("users")
            .select("*")
            .where("platform_id", req.params.id)
            .orderBy("date", "desc")
            .first();
        
        if (req.params.id !== user) {
            res.sendStatus(500);
        }
        
        res.json({user: user});
    }

    @POST("auth/user/:id")
    async post(req: Request, res: Response) {
        res.sendStatus(404);
    }
}