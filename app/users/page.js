import Link from "next/link";

async function getUsers() {
  const res = await fetch("http://localhost:3000/api/users");
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
}

export default async function Users() {
  const data = await getUsers();

  const allUsers = data.data;

  return (
    <main>
      <ul className="flex flex-col space-y-4">
        {allUsers?.map((user, i) => (
          <li key={i} className="font-bold text-2xl">
            <Link href={`/users/${user._id}`}>{user.fullName}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
