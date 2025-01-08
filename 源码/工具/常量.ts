import * as fs from 'fs';
import * as path from 'path';

// 确定当前环境
const 环境 = process.env.NODE_ENV || 'development';

// 读取配置文件
const 配置文件路径 = path.join(
    __dirname, 
    '../../配置/', 
    环境 === 'production' ? '生产.json' : '开发.json'
);

// 解析配置
const 原始配置 = JSON.parse(
    fs.readFileSync(配置文件路径, 'utf8')
);

// 导出配置常量
export const 配置 = {
    网络: {
        BSC: {
            RPC: process.env.BSC_RPC || 原始配置.网络.BSC.RPC,
            链ID: 原始配置.网络.BSC.链ID,
            代理桥合约: process.env.BSC_CONTRACT || 原始配置.网络.BSC.代理桥合约
        },
        Solana: {
            RPC: process.env.SOLANA_RPC || 原始配置.网络.Solana.RPC,
            代理桥程序: process.env.SOLANA_PROGRAM || 原始配置.网络.Solana.代理桥程序
        }
    },
    代理配置: {
        最大并发: 原始配置.代理配置.最大并发,
        超时时间: 原始配置.代理配置.超时时间,
        重试次数: 原始配置.代理配置.重试次数
    },
    日志: {
        级别: 原始配置.日志.级别,
        保存路径: 原始配置.日志.保存路径
    }
} as const;

// 链相关常量
export const 链常量 = {
    BSC: {
        确认区块数: 5,
        最大燃气价格: '100000000000' // 100 Gwei
    },
    Solana: {
        确认数: 32,
        最大重试次数: 3
    }
} as const;

// 错误消息
export const 错误消息 = {
    配置加载失败: '无法加载配置文件',
    网络错误: '网络连接失败',
    交易失败: '交易执行失败',
    验证失败: '交易验证失败'
} as const; 