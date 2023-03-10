const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const idDev = process.env.NODE_ENV === "development"
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)

module.exports = {
    entry:path.join(__dirname,"../src/index.tsx"),//入口文件

    //打包文件出口
    output:{
        filename:"static/js/[name].[chunkhash:8].js",//每个输出的js文件的名称
        path:path.join(__dirname,"../dist"),//打包结果输出的路径
        clean:true,//webapck5内置的，webpack4中需要配置clean-webpack-plugin来删除之前的dist
        publicPath:"/"//打包后文件的公共前缀路径
    },

    module:{
        rules:[
            {
                test:/.(ts|tsx)$/,
                include:path.resolve(__dirname,"../src"),
                use:[
                    "thread-loader",
                    "babel-loader"
                ]
            },
            // {
            //     test:/.(ts|tsx)$/,//匹配ts、tsx文件
            //     use:{
            //         loader:"babel-loader",
            //         options:{
            //             //预设执行顺序由右往左，所以这里是先处理ts再处理jsx
            //             presets:[
            //                 "@babel/preset-react",
            //                 "@babel/preset-typescript"
            //             ]
            //         }
            //     },
            //     include:path.resolve(__dirname,"../src")
            // },
            {
                test:/.css$/,
                include:path.resolve(__dirname,"../src"),
                use:[
                    idDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test:/.less$/,
                include:path.resolve(__dirname,"../src"),
                use:[
                    idDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test:/.(png|jpe?g|gif|svg)/,
                type:"asset",
                parser:{
                    dataUrlCondition:{
                        maxSize:10 * 1024,
                    }
                },
                generator:{
                    filename:"static/images/[name].[contenthash:8][ext]"
                }
            },
            {
                test:/.(woff2?|ttf|eot)$/,
                type:"asset",
                parser:{
                    dataUrlCondition:10 * 1024
                },
                generator:{
                    filename:"static/font/[name].[contenthash:8][ext]"
                }
            },
            {
                test:/.(map4|map3|webm|wav|flac|aac|ogg)$/,
                type:"asset",
                parser:{
                    dataUrlCondition:10 * 1024
                },
                generator:{
                    filename:"static/media/[name].[contenthash:8][ext]"
                }
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"../public/index.html"),//模板用定义root节点的模板
            inject:true//自动注入静态资源
        }),

        new webpack.DefinePlugin({
            "process.env.BASE_ENV":JSON.stringify(process.env.BASE_ENV)
        }),

        new ReactRefreshWebpackPlugin()
    ],

    resolve:{
        extensions:[".js",".tsx",".ts"],
        alias:{
            "@":path.join(__dirname,"../src")
        },
        modules:[path.resolve(__dirname,"../node_modules")]
    },

    cache:{
        type:"filesystem"
    }
}