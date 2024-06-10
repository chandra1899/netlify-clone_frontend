"use client"
import { DeployForm, Header, PrevDeploys } from "@/components";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return 
    if (!session) signIn() 
  }, [session, status])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null 
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header session = {session} />
      <DeployForm/>
      <PrevDeploys/>
    </main>
  );
}
