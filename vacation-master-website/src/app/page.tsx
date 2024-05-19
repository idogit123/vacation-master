import Link from "next/link";

export default function Home() {
  return <main>
    <h2>Welcome to Vacation Master</h2>
    <h3>New user? <Link href={'/signup'}>Signup!</Link></h3>
    <h3>Alredy have an account? <Link href={'/login'}>Login!</Link></h3>
  </main>
}
