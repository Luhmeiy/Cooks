import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const token = authHeader.split(" ")[1];

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
		if (err) {
			res.status(403);
			throw new Error("Forbidden.");
		}

		req.user = decoded.UserInfo.username;
		req.roles = decoded.UserInfo.roles;

		next();
	});
};
