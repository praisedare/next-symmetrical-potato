import Link from "next/link"
import {useEffect, useState} from "react"
import useSWR from 'swr'
import {useForm} from 'react-hook-form'

export default function ProductsPage({ products: initialProducts }) {
    const {register, watch} = useForm()
    const filter = watch('filter')
    const [products, setProducts] = useState(initialProducts)
    const {data, error} = useSWR(
        () => {
            const url = 'http://localhost:3399/products'
            let f = !filter
                ? url
                : url + `?category=${filter}`
            return f
        },
        async (url) => {
            const response = await fetch(url)
            return await response.json()
        }
    )

    useEffect(() => {
        setProducts(data)
    }, [data])

	return <>
		<h1>Products</h1>

		<div>
            <label for="filter">Filtr</label>
            <select {...register(`filter`)}>
                <option value="">None</option>
                {'tools kids movies jewelery'.split` `.map(cat => (
                    <option value={cat} selected={filter == cat}>{cat}</option>
                ))}
            </select>
        <p>filter: {filter}</p>
		</div>

        {error ? (
            <p>Error</p>
        ) : !products ? (
			<p>Loading...</p>
        ) : (
            <ul>{
                products.map(product => (
				<li key={product.id}><Link href={`/products/${product.id}`}>
					{product.name} - ${product.price}
				</Link></li>
                ))}
            </ul>
        )}
	</>
}

export async function getServerSideProps() {
	const response = await fetch('http://localhost:3399/products')
	const products = await response.json()
    // console.log(products)

	return {
		props: {
			products,
		},
	}
}

