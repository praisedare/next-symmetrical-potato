import Link from "next/link"
import {useEffect, useState} from "react"

export default function ProductsPage({ initialProducts }) {
	const [filter, setFilter] = useState()
	const [products, setProducts] = useState(initialProducts)
	const [error, setError] = useState()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const {data, error} = useSWR('filteredProducts', async () => {
			const response = await fetch(`http://localhost:3399/products?category=${filter}`)
			return await response.json()
		})

		if (error) {
			setError(error)
			return
		}

		if (!data) {
			setIsLoading(true)
			return
		}

		setProducts(data);
	}, [filter])

	return <>
		<h1>Products</h1>

		<div>
			Filter: <button onClick={setFilter('tools')}>Tools</button>
		</div>

		{isLoading ? (
			<p>Loading...</p>
		) : (<ul>
			{products.map(product => (
				<li key={product.id}><Link href={`/products/${product.id}`}>
					{product.name} - ${product.price}
				</Link></li>
			))}
		</ul>)}
	</>
}

export async function getServerSideProps() {
	const response = await fetch('http://localhost:3399/products')
	const products = await response.json()

	return {
		props: {
			products,
		},
	}
}

