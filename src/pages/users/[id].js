export default function UsersDetailsPage({ user }) {
	return <>
		<h1>{user.name} [{user.id}]</h1>
		<p><i>{user.email}</i></p>
	</>;
};

export async function getStaticPaths() {
	const res = await fetch('https://jsonplaceholder.typicode.com/users');
	const users = await res.json();

	const userIds = users.map(user => ({params: {id: ''+user.id} }))

	return {
		paths: userIds,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { params } = context;
	const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
	const user = await res.json();

	return {
		props: { user }
	};
}

