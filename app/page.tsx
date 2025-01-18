import Background from "@/components/background"
import { GetEmail } from "@/components/getEmail";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Background />
      <div className="text-center">
        <h1 className="text-8xl font-bold p-8 m-4 bg-clip-text text-transparent bg-hero-pattern" >
          Coming Soon
        </h1>
        <h3 className="max-w-[500px] p-4 mx-auto text-lg font-semibold">
          Compose, mix, and share your music effortlessly with our intuitive and powerful platform!
        </h3>
      </div>
      <GetEmail />
    </div>
  );
}
