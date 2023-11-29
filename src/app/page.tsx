import * as schema from "../../drizzle/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(
  "postgresql://prisma:prisma@localhost:5432/demo_prisma_drizzle?search_path=public"
);
const db = drizzle(queryClient, { schema });

export default async function Home() {
  const result = await db.query.author.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Authors</h1>
      <div className="flex flex-col items-center justify-center space-y-4">
        {result.map((author) => (
          <div key={author.id}>
            <h2 className="text-2xl font-bold">{author.name}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
