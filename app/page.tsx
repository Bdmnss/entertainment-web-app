import Slider from "@/components/Slider";
import HomeContent from "@/components/HomeContent";
import HomeSearch from "@/components/HomeSearch";

export default function Home() {
  return (
    <div className="bg-[#10141e] pt-7 pb-10 flex flex-col gap-[2.4rem] px-[1.6rem]">
      <HomeSearch />
      <Slider />
      <HomeContent />
    </div>
  );
}
