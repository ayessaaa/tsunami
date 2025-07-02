import Card from "../components/Card";
import Letter from "../components/Letter";
import Logo from "../components/Logo";

function Home() {
  return (
    <>
      <div className="mt-30">
        <Logo height={"h-50"} />
        <p className="text-center text-white text-2xl -mt-10">
          listen to anonymous music recommendations!
        </p>
      </div>
      <div className="flex w-fit mx-auto gap-15 mt-15">
        <Card img="./imgs/drawings/bottle2.png" text="open a letter" imgsize="size-70" />
        <Card img="./imgs/drawings/letter2.png" text="write a letter" imgsize="size-70"/>
      </div>
      <Letter/>
    </>
  );
}

export default Home;
