import React,{useState,lazy,Suspense} from 'react'
// import smallImg from '@/assets/imgs/dog.jpg'
// import bigImg from '@/assets/imgs/壁纸.jpeg'
// import {Demo1,Demo2} from "@/components"
import "./app.css"
import "./app.less"
const LazyDemo =lazy(()=>import("./components/LazyDemo"))

export default function App() {
    // const [ count, setCounts ] = useState('')
    // const onChange = (e: any) => {
    //     setCounts(e.target.value)
    // }

    const [ show, setShow ] = useState(false)

    // 点击事件中动态引入css, 设置show为true
    const onClick = () => {
        import('./app.css')
        setShow(true)
    }

    return (
        <div>
            {/* <Demo1 /> */}
            <h2>webpack-react-ts</h2>

            {/* <img src={smallImg} alt="小于10kb的图片" />
            <img src={bigImg} alt="大于于10kb的图片" /> */}

            {/* 小图片背景容器 */}
            <div className='smallImg'></div> 
            {/* 大图片背景容器 */}
            <div className='bigImg'></div> 

            {/* <button onClick={onClick}>展示</button> */}
            {/* show为true时加载LazyDemo组件 */}
            {/* { show && <Suspense fallback={null}><LazyDemo /></Suspense> } */}
        </div>
    )
}
