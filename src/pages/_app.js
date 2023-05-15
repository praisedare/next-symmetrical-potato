import '../css/tailwind.css'
export default function App({Component, pageProps}) {
    return <div style={{border: '1px solid red'}}>
        <Component {...pageProps}/>
    </div>
}

