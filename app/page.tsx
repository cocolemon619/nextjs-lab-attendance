// app/page.tsx
import React from "react";
import Header from "@/components/elements/Header";
import { UserList } from "../components/elements/UserList";  // UserList コンポーネントをインポート
import { InputUserForm } from "@/components/elements/InputUserForm";
import InputStateBar from "../components/elements/InputStateBar";
import WelcomeMsg from "@/components/elements/WelcomeMsg";

const Page: React.FC = () => {
  return (
    <div className="bg-slate-300 min-h-screen">
      <Header />
      <main className="max-w-4xl flex flex-col gap-8 md:gap-16 pt-20 px-5 md:px-10 pb-36 mx-auto text-neutral">
        <WelcomeMsg />
        <InputStateBar />
        <UserList />
        <InputUserForm />
      </main >
    </div >
  );
};

export default Page;