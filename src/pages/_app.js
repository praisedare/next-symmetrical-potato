import '../css/tailwind.css'
export default function App({Component, pageProps}) {
    return <div style={{border: ''}}>
        <Component {...pageProps}/>
    </div>
}

