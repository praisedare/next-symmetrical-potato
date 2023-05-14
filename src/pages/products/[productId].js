export default function ProductDetailsPage({ product, params }) {
	return <>
		<h1>{product.name} <i>[{product.id}]</i></h1>
        <div class="flex space-between">
            <i>{product.category}</i>
            <span>${product.price}</span>
        </div>
        <p>{product.description}</p>
		<pre>params: { JSON.stringify(params) }</pre>
	</>
}

export async function getProduct(id) {
    return await (
        await fetch(`http://localhost:3399/products/${id}`)
    )
    .json()
}

export async function getServerSideProps(context) {
	const {params} = context
	const id = params.productId

    const product = await getProduct(id)

	return {
		props: {
			params: context.params,
			product,
		}
	}
}
