import "../db.js"
import Video from "../models/Video.js"
import routes from "../routes.js"

export const home = async (req, res) => { // await는 async 없이 쓸 수 없음. 
    try {
        const videos = await Video.find({}).sort({ _id: -1 }); // Database에 있는 모든 Video를 가져오도록 함
        res.render("home", { pageTitle: "Home", videos });
    } catch(e) {
        console.log(e);
        res.render("home", { pageTitle: "Home", videos : [] });
    }
}
export const search = async(req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
    let videos = [];
    try {
        videos = await Video.find({
            title: { $regex: searchingBy, $options: "i" }  // i 옵션은 인센서티블하다는 의미(대소문자 구분 x)
        });
    } catch (e) {
        console.log(e);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos });
 //   controller도 query에 접근하려면 method가 get이어야 함. get method가 url에 정보를 담아주니까.
 //   res.render("search", { pageTitle: "Search", searchingBy, videos }); // searchingBy : searchingBy 라고 기재하지 않아도 알아서 인식
}
    
/*export const videos = (req, res) =>
    res.render("videos", { pageTitle: "Videos" });*/
export const getUpload = (req, res) =>
    res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    // TODO : Upload and save video
    res.redirect(routes.videoDetail(newVideo.id));
};
/*export const videoDetail = (req, res) =>
    res.render("videoDetail", { pageTitle: "Video Detail" });*/

export const videoDetail = async(req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById( id );
        res.render("videoDetail", { pageTitle: video.title , video });

    } catch (e) {
        console.log(e);
        res.redirect(routes.home);
    }
};

export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const video = await Video.findById( id );
        console.log('video is', video.id);
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    } catch (e) {
        console.log('error ----');
        console.log(e);
        res.redirect(routes.home);
    }
}

export const postEditVideo = async(req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (e) {
        console.log(e);
        res.redirect(routes.home);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        await Video.findOneAndRemove({ _id: id });
    } catch (e) {
        console.log(e);
    }
    res.redirect(routes.home);
}