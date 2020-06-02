import {videos} from "../db.js"
import routes from "../routes.js"

export const home = (req, res) => res.render("home", { pageTitle: "Home", videos });

export const search = (req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
 //   controller�� query�� �����Ϸ��� method�� get�̾�� ��. get method�� url�� ������ ����ִϱ�.
    res.render("search", { pageTitle: "Search", searchingBy, videos }); // searchingBy : searchingBy ��� �������� �ʾƵ� �˾Ƽ� �ν�
}
    
/*export const videos = (req, res) =>
    res.render("videos", { pageTitle: "Videos" });*/
export const getUpload = (req, res) =>
    res.render("upload", { pageTitle: "Upload" });
export const postUpload = (req, res) => {
    const {
        body : { file, title, description }
    } = req;
    // TODO : Upload and save video
    res.redirect(routes.videoDetail(12345));
};
export const videoDetail = (req, res) =>
    res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
    res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
    res.render("deleteVideo", { pageTitle: "Delete Video" });