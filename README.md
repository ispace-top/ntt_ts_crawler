## 牛听听资源下载器 🐮🔉

自动爬取并下载牛听听分享列表中的音频资源

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Node Version](https://img.shields.io/badge/node-%3E%3D14.x-green)

### 📌 项目概述

通过逆向分析牛听听见面API实现的自动化资源下载工具：
- ✅ 批量处理多个分享ID
- ✅ 自动创建分类文件夹
- ✅ HTTP断连自动重试
- ✅ 中文文件名智能格式化
- ⚡ Express驱动的高效服务端

### 🛠️ 环境要求

```bash
Node.js >= v14.x 
npm >= v6.x  
```

### 🔧 安装指南

1️⃣ Clone仓库：
```bash
git clone https://github.com/yourusername/nietingting-downloader.git && cd nietingting-downloader
```

2️⃣ 安装依赖：
```bash
npm install express superagent fs --save 
```

### ⚙️  配置说明 (重要！) 

修改 `src/crawler.js`:
```javascript
// Cookie需从浏览器实际登录获取！
let cookie = "YOUR_ACTUAL_COOKIE_HERE" // ←←←←←必须修改此处！！！
const config = {
    listUrl: "https://gateway.benewtech.cn/resources-app/cloud/web/share/albums/",
    mediaUrl: "https://gateway.benewtech.cn/resources-app/cloud/web/share/tracks/", 
    concurrencyLimit: process.env.CONCURRENCY ||5, //最大并行数控制   
}
```

### 🚀  运行方式 

启动服务：
```bash 
node app.js #默认监听3000端口  
```
触发全部ID抓取任务：
```
http://localhost:3000/
```

终端将显示实时进度：
```
成功下载 => 《英语启蒙/Baby_Shark.mp3》
已完成全部下载任务！
i=23;目录=经典儿歌精选...
```

### 📂  文件结构 

```
├── app.js            #主入口(Web服务器)
├── src/
│   └── crawler      #核心爬虫模块    
└─ downloads         #自动创建的存储目录       
    ├── English_Lessons  
    │   ├─ lesson1.mp3  
    └── Chinese_Poems...   
 ```  

 ### ❗注意事项
 
 - 💡 Cookie有效期约30天需定期更新  
 - 🔒请勿高频访问以防被Ban IP地址   
 - 🌐推荐配合Nginx反向代理提升稳定性
 - ❗本工程为学习使用，请勿用于其他用途。
 - ❗请注意下载文件版权所属，请勿侵权。
 
 ### 🤝参与贡献
 
欢迎提交PR优化下列方向👇🏻:
• TypeScript重构 ✨     
• GUI界面开发 🖥️      
• Docker容器支持 🐳    

--- 

📜 License：[MIT](LICENSE) © iSpace.top
