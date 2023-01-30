export default function ProductDetailsPage({ product, params }) {
	return <>
		<h1>Product {product.id} details</h1>
		<pre>{ JSON.stringify(params) }</pre>
	</>
}

export function getServerSideProps(context) {
	const product = {id: params.productId};

	return {
		props: {
			params: context.params,
			product,
		}
	}
}
