import Image from "next/image";

export default function Loading() {
  return (
    <div className=" h-screen w-full flex justify-center align-middle">
      <div className="my-auto">
        <div className="animate-spin w-[150px] h-[150px] relative">
          <Image
            src="/loading_person_2.png"
            alt="person"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <p className="mt-5">ローディング中です、、、、</p>
      </div>
    </div>
  );
}
