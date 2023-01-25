import Link from "next/link";

export const getStaticProps = async () => {
	const res = await fetch('https://jsonplaceholder.typicode.com/users');
	const users = await res.json();

	return {
		props: { users },
	};
};

export default function Users({ users }) {
	return <>
		<h1>Users</h1>
		<ul>
			{users.map(user => (
				<li key={user.id}>
					<Link href={`/users/${user.id}`}>{user.name}</Link>
				</li>
			))}
		</ul>
	</>;
}
