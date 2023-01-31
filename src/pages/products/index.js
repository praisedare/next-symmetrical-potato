import Link from "next/link"
import {useEffect, useState} from "react"
import { useRouter } from "next/router"

async function fetchFilteredProducts(category) {
	const queryString = category ? 'category='+category : ''
	const response = await fetch(`http://localhost:3399/products?${queryString}`)
	const products = await response.json()
	return products;
}

export default function ProductsPage({ products: initialProducts }) {
	const [filter, setFilter] = useState()
	const [isFirstFetch, setIsFirstFetch] = useState(true)
	const [products, setProducts] = useState(initialProducts)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (! filter && isFirstFetch)
			return

		setIsFirstFetch(false)

		async function fetchProducts() {
			setProducts(await fetchFilteredProducts(filter))

			router.push(`/${ router.pathname }?category=${ filter }`, null, {shallow: true})
		}

		fetchProducts()
	}, [filter])

	const filters = ['tools', 'shoes'];

	return <>
		<h1>Products</h1>

		<div>
			Filters: 
			<ul>{filters.map(filter => (
				<button onClick={() => setFilter(filter)}>
					{filter}
				</button>
			))}</ul>
		</div>

		{isLoading ? (
			<p>Loading...</p>
		) : (<ul>
			{products.map(product => (
				<li key={product.id}><Link href={`/products/${product.id}`}>
					{product.name} - ${product.price} [<i>{product.category}</i>]
				</Link></li>
			))}
		</ul>)}
	</>
}

export async function getServerSideProps({ query }) {
	const products = await fetchFilteredProducts(query.category)

	return {
		props: {
			products,
		},
	}
}

