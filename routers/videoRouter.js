import express from "express";
import routes from "../routes.js"

import {
    videoDetail,
    search,
    getUpload,
    postUpload,
    getEditVideo,
    postEditVideo,
    deleteVideo
} from "../controllers/videoController.js";
import { uploadVideo } from "../middlewares.js";

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;



