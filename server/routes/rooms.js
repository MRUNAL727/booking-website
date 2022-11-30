import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
// router.post("/:hotelid", verifyAdmin, createRoom);
router.post("/:hotelid", createRoom);


//UPDATE
router.put("/availability/:id", updateRoomAvailability);

// router.put("/:id", verifyAdmin, updateRoom);
router.put("/:id", updateRoom);


//DELETE
// router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
router.delete("/:id/:hotelid", deleteRoom);


//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);

export default router;