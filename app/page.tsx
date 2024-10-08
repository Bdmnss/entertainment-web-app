import Slider from "@/components/Slider";
import MainContent from "@/components/MainContent";
import Search from "@/components/Search";

export default function Home() {
  return (
    <div
      className="bg-[#10141e] min-h-screen min-w-screen pt-7 pb-10 flex flex-col gap-[2.4rem] 
    px-[1.6rem] md:px-[2.5rem] xl:pl-[12rem]"
    >
      <Search />
      <Slider />
      <MainContent />
    </div>
  );
}
