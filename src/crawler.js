import request from 'superagent';
// import download from "download";
// import http from 'https'; // or 'https' for https:// URLs
import fs from 'fs';
const { get } = request;
// import cheerio from 'cheerio';
//Cookie: connect.sid=s%3AJtiglgnPO1CznSPXX8wW42jOjYqAHNxv.Hjz5gxrFkZg8MtS4BrCZPByLWhaJ41avElj5xgAmniI

let cookie = "connect.sid=s%3AJtiglgnPO1CznSPXX8wW42jOjYqAHNxv.Hjz5gxrFkZg8MtS4BrCZPByLWhaJ41avElj5xgAmniI"
let listUrl = "https://gateway.benewtech.cn/resources-app/cloud/web/share/albums/";///tracks?offset=0&limit=30"
let mediaUrl = "https://gateway.benewtech.cn/resources-app/cloud/web/share/tracks/";
let offset = 0;
let limit = 120;

let header = {
    "cookie": cookie,
    "accept": "application/json, text/plain, */*",
    "accept-encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    'Accept-Encoding': '',
    'Accept-Language': 'en-US,en;q=0.8',
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
}


export function getShareList(id) {
    var path = listUrl + `${id}/tracks?offset=${offset}&limit=${limit}`;
    request.get(path).set(header)
        .end((err, res) => {
            if (err) {
                console.log(`获取分享列表失败！ - ${err}`)
            } else {
                if (res.body.data) {
                    var data = res.body.data;
                    getMediaArrayData(data.datas);
                    if (data.count > limit) {
                        offset = limit + 1;
                        limit = data.count - limit;
                        getShareList(id);
                    }
                } else {
                    console.log(`200-获取分享列表失败！ - ${JSON.stringify(res.body)};
                    }`)
                }
            }
        })
}

function getMediaArrayData(datas) {
    for (let i=0;i<datas.length;i++) {
        getMedia(datas[i]);
        console.log(`i = ${i}; 目录 = ${datas[i].sourceName}`)
        if (i >= (datas.length - 1)) {
           // console.log(`#### 目录 = ${datas[i].sourceName} = 下载完毕！####`)
        }
    }
}

function getMedia(media) {
    var path = mediaUrl + `${media.uid}`;
    request.get(path).set(header)
        .end((err, res) => {
            if (err) {
                console.log(`!!! 获取媒体文件《${media.name}》失败！ - ${err}`)
                wait(100).then(getMedia(media))
            } else {
                if (res.body.data) {
                    try {
                        downloadMedia(res.body.data, media.sourceName);
                    } catch { }
                } else {
                    console.log(`200-获取媒体文件失败！ - ${JSON.stringify(res.body)}`)

                }
            }
        })
}

function downloadMedia(media, sourceName) {
    sourceName = sourceName.trim().replace(/\s+/g, '_').replace('\/', '_');
    fs.mkdir(`./${sourceName}`, { recursive: true }, (err) => {
        if (err) {
            return console.error(err);
        }
    });
    var name = media.name.trim().replace(/\s+/g, '_').replace('\/', '_');
    // const file = fs.createWriteStream(`./${sourceName}/${name}.mp3`);
    download(media.link,`./${sourceName}/${name}.mp3`)
    // const request = http.get(media.link, function (response) {
    //     response.pipe(file);
    //     file.on("finish", () => {
    //         file.close();
    //         console.log(`成功下载 => 《${sourceName}/${name}》`);
    //     });
    // });
}

const download = (url, dest) => {
    const file = fs.createWriteStream(dest);
    const sendReq = request.get(url);
    // verify response code
    sendReq.on('response', (response) => {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }
        sendReq.pipe(file);
    });
    file.on('finish', () =>{
        console.log(`成功下载 => 《${sourceName}/${name}》`);
    } );
    sendReq.on('error', (err) => {
        fs.unlink(dest, () =>{
            console.log(`!!! 下载失败！ => 《${sourceName}/${name}》`);
        }); // delete the (partial) file and then return the error
    });
    file.on('error', (err) => { // Handle errors
        fs.unlink(dest, () =>{
            console.log(`!!! 下载失败！ => 《${sourceName}/${name}》`);

        }); // delete the (partial) file and then return the error
    });
};

// try {
//     download(media.link).pipe(fs.createWriteStream(`./${sourceName}/${name}.mp3`)).end(
//         console.log(`成功下载 => 《${sourceName}/${name}》`));
// } catch {
// }

// 函数实现，参数单位 毫秒 ；
function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
};
// let sourceId='cd9fa7fb3105c0d90ee95ae906f4608dd693c52feb2083cbfb3c6bfc958dec22';
// getShareList(sourceId);
