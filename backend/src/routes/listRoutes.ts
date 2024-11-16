import { Router } from "express";
import {
	addToList,
	deleteFromList,
	updateList,
} from "@/controllers/listController";

export const router = Router();

router.route("/").post(addToList).patch(updateList);
router.route("/:userId/:ingredient").delete(deleteFromList);
