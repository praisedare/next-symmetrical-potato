import { useRouter } from 'next/router';

export default function UsersDetailsPage({ user }) {
	const router = useRouter();

	if (router.isFallback) {
		return <>
			<h1>Loading...</h1>
			<p>Please while the page is being loaded.</p>
		</>;
	}

	return <>
		<h1>{user.name} [{user.id}]</h1>
		<p><i>{user.email}</i></p>
	</>;
};

export async function getStaticPaths() {
	const res = await fetch('https://jsonplaceholder.typicode.com/users');
	const users = await res.json();

	const userIds = users.slice(0, 3).map(user => ({params: {id: ''+user.id} }))

	return {
		paths: userIds,
		fallback: 'blocking',
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

