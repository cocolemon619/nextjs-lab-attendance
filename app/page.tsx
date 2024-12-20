// app/page.tsx
import React from "react";
import Header from "@/components/elements/Header";
import { UserList } from "../components/elements/UserList";  // UserList コンポーネントをインポート
import { InputUserForm } from "../components/elements/InputUserForm";
import InputStateBar from "../components/elements/InputStateBar";

const Page: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="bg-teal-100 w-screen h-screen flex items-center justify-center">
        <div className="">
          <div className="bg-white rounded-lg phone-3 p-10">
            <UserList />
            <InputUserForm />
          </div>
          <div className="bg-white artboard rounded-lg artboard-horizontal phone-3 my-24">
            <InputStateBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;