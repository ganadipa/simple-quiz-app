import { auth } from "@/auth";
import { PastResults } from "./past-results";
import StartQuiz from "./start-quiz";

async function App() {
  const session = await auth();
  if (!session) {
    return null;
  }

  return (
    <main className="h-screen flex flex-col justify-center">
      <PastResults session={session} />
      <StartQuiz />
    </main>
  );
}

export default App;
