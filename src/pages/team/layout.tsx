import { Outlet } from "react-router-dom";
import { Header } from "./header";

export function TeamLayout() {
  return (
    <div className='flex flex-col flex-1 -m-8 -mt-6 '>
      <Header/>
      <section className="p-2">
        <Outlet />
      </section>
    </div>
  );
};