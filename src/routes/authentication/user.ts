import { GET, POST } from "../../router";
import { Request, Response } from "express";

// eslint-disable-next-line no-unused-vars
class UserAuthentication {
    @GET("auth/user/:id") // TODO: Add :id authentication to this function
    async get(req: Request, res: Response) {
        // eslint-disable-next-line curly
        if (!req.params) res.sendStatus(404);

        if (req.params.id !== "76561199108042297") {
            res.sendStatus(500);
        }
        
        let user = [
            "Raine Aeternal",
            200
        ];
        
        res.json({user: user});
    }

    @POST("auth/user/:id")
    async post(req: Request, res: Response) {
        res.sendStatus(404);
    }
}