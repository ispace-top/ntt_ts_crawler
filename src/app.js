import express from 'express';
import {getShareList }from '../src/crawler.js';

const app = express();

// ...

let server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running at http://%s:%s', host, port);
});


let ids=[
    "b45d6b1849e08197c93cefed210fa6ed6f64046f4db09e00f430cb3a7a45446b",
    "f18027788c3b44dffede26bd5a654902cb3439d632830f6985d79fd4d650ef94",
    "99438faeeb32d697d17051929280240aec6522c36612bb7e1af30b46b541913d",
    "dc11d3d366c64bcc3de1fbb35ef6d28889598d770691794005aac7062b7e5d42",
    "0bf6577fcf4bffbff8d4a3619d55d22adf9d729932bb6adca6e928490b2c50ab",
    "808570cdd055d56175737f4767f81d837676db423f9f50fc0c6dab916f15e84f",
    "a810d8a3f29273981939938f7a8cc4d151131eb1d10263f0c47bdcc7fedb60f6",
    "406173ac5ce6bcf90c1f08b0cbcdff39212c70f98202c2f9ea8400a33894b45c",
    "a810d8a3f29273981939938f7a8cc4d151131eb1d10263f0c47bdcc7fedb60f6",
    "86141d51e477c1c67d3cc87af8efe489941968adfcb8fa385539f762007c035a",
    "cd9fa7fb3105c0d90ee95ae906f4608dd693c52feb2083cbfb3c6bfc958dec22"
]

app.get('/', function (req, res) {
    res.send('Hello World!');
    ids.forEach(id => {
        getShareList(id)
    });
    console.log(`已完成全部下载任务！`)
  });

  // 函数实现，参数单位 毫秒 ；
function wait(ms) {
    return new Promise(resolve =>setTimeout(() =>resolve(), ms));
};
