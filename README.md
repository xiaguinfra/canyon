<div align="center">
  <img src="峡谷.png" alt="峡谷" width="120" height="120">

  <h1>峡谷</h1>
  
  <p>
    连接 Solana 与 BSC 智能代理的跨链基础设施
  </p>

  <p>
    <a href="https://github.com/xiaguinfra/backend/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/许可证-MIT-blue.svg" alt="许可证">
    </a>
    <a href="https://github.com/xiaguinfra/backend/stargazers">
      <img src="https://img.shields.io/github/stars/xiaguinfra/backend" alt="GitHub 星标">
    </a>
    <a href="https://github.com/xiaguinfra/backend/network/members">
      <img src="https://img.shields.io/github/forks/xiaguinfra/backend" alt="GitHub 分支">
    </a>
  </p>

  <h2>架构图</h2>
  <img src="信息图表.png" alt="架构图" width="800">

  <h2>目录结构</h2>

backend/
├── 合约/                    # 智能合约
├── 配置/                    # 配置文件
├── 源码/                    # 核心代码
└── 测试/                    # 测试文件

  <h2>技术栈</h2>

- Solana 程序 (Rust)
- BSC 智能合约 (Solidity)
- TypeScript
- ethers.js
- @solana/web3.js

  <h2>快速开始</h2>

环境要求:
- Node.js >= 16
- Rust >= 1.69
- Solana 命令行工具
- BSC 开发工具

安装:
git clone https://github.com/xiaguinfra/backend.git
cd backend
npm install

配置:
cp 配置/开发.json.example 配置/开发.json
cp 配置/生产.json.example 配置/生产.json

开发:
npm run dev

测试:
npm run test

部署:
npm run deploy

  <h2>链接</h2>
  
  <p>
    <a href="https://github.com/xiaguinfra">
      <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
    </a>
    <a href="https://x.com/xiaguinfra">
      <img src="https://img.shields.io/badge/推特-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="推特">
    </a>
  </p>

  <h2>许可证</h2>
  
  <p>本项目采用 MIT 许可证</p>
  
  <p>版权所有 © 2024 峡谷</p>
</div>