import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { DecodedUser } from "@/types/DecodedUser";

interface CustomRequest extends Request {
	user: string;
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = (req.headers.authorization ||
		req.headers.Authorization) as string | undefined;

	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const token = authHeader.split(" ")[1];

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
		if (err) {
			res.status(403);
			throw new Error("Forbidden.");
		}

		(req as CustomRequest).user = (decoded as DecodedUser).username;

		next();
	});
};
