import { Router } from "express";
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishVideos,
    tooglePublishStatus,
    updateVideo
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();
router.use(verifyJWT);

router
.route("/")
.get(getAllVideos)
.post(upload.fields([
    {
        name: "videoFile",
        maxCount: 1,
    },
    {
        name: "thumbnail",
        maxCount: 1
    },
]), publishVideos);


router
.route("/:videoId")
.get(getVideoById)
.delete(deleteVideo)
.patch(upload.single("thumbnail"), updateVideo);


router
.route("/toogle/publish/:videoId")
.patch(tooglePublishStatus);


export default router