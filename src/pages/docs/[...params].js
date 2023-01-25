import {useRouter} from "next/router"

export default function DocsPage() {
	const router = useRouter();
	return <>
		<h1>Docs Page</h1>
		Params: <pre>{JSON.stringify(router.query.params)}</pre>
	</>
}

