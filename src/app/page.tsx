import { getData } from "@/libs/data";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";


type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { lang } = await searchParams;
  const data = await getData(lang as string | undefined);

  return {
    title: data.title,
  };
}

export default async function Home({ searchParams }: Props) {
  const { lang } = await searchParams;
  const data = await getData(lang as string | undefined);

  const instructors = data.sections.find((s) => s.type === "instructors")?.values ?? [];
  const layout = data.sections.find((s) => s.type === "features")?.values ?? [];
  const learnings = data.sections.find((s) => s.type === "pointers")?.values ?? [];
  const exclusive = data.sections.find((s) => s.type === "feature_explanations")?.values ?? [];
  const details = data.sections.find((s) => s.type === "about")?.values ?? [];

  const trailer = data.media.find((m) => m.resource_type === "video");

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
     {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4 text-lg font-bold text-black">
          <Image
            src="10mslogo-svg.svg"
            alt="10 Minute School Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />

          
          <Link
            href={`?lang=${lang === "en" ? "bn" : "en"}`}
            className="bg-[#0096DB] text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-500"
          >
            {lang === "en" ? "বাংলা" : "English"}
          </Link>
        </div>
      </div>

      {/* Left Column */}

      <div className="pt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
       
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 rounded-xl shadow">
            <h1 className="font-bold text-3xl mb-2">{data.title}</h1>
            <p className="bg-white p-4 rounded-xl shadow text-gray-800 text-justify"
            dangerouslySetInnerHTML={{ __html: data.description }}></p>
          </div>
          <div
            
          />

          {/* Instructors */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold text-lg mb-2 py-2 text-white bg-[#2A3494] text-center rounded-xl">Instructors</h2>
            {instructors.map((inst, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-black">{inst.name}</p>
                <div className="text-black" dangerouslySetInnerHTML={{ __html: inst.description }} />
              </div>
            ))}
          </div>

          {/* Layout */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold text-lg mb-2 py-2 text-white bg-[#2A3494] text-center rounded-xl">How the course is laid out</h2>
            {layout.map((item, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[#0096DB]">{item.title}</p>
                <p className="text-gray-600">{item.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Learnings */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold text-lg mb-2 py-2 text-white bg-[#2A3494] text-center rounded-xl">What you will learn</h2>
            <ul className="list-disc space-y-1 ml-5 text-gray-700">
              {learnings.map((l, i) => (
                <li key={i}>{l.text}</li>
              ))}
            </ul>
          </div>

          {/* Exclusive Features */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold text-lg mb-2 py-2 text-white bg-[#2A3494] text-center rounded-xl">Course Exclusive Feature</h2>
            {exclusive.map((f, i) => (
              <div key={i} className="mb-4">
                <p className="font-bold text-[#0096DB]">{f.title}</p>
                <ul className="list-disc ml-5 text-gray-600">
                  {f.checklist.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold text-lg mb-2 py-2 text-white bg-[#2A3494] text-center rounded-xl">Course Details</h2>
            {details.map((d, i) => (
              <div key={i} className="mb-4">
                <div dangerouslySetInnerHTML={{ __html: d.title }} className="text-[#0096DB] font-semibold" />
                <div dangerouslySetInnerHTML={{ __html: d.description }} className="text-gray-600 text-justify" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold text-lg mb-2 py-2 text-white bg-[#2A3494] text-center rounded-xl">Trailer</h2>
            {trailer ? (
              <iframe
                className="w-full aspect-video rounded-xl"
                src={`https://www.youtube.com/embed/${trailer.resource_value}`}
                title="Course Trailer"
                allowFullScreen
              />
            ) : (
              <p className="text-gray-600 text-center">No trailer available</p>
            )}
          </div>

          <a href="https://app.10minuteschool.com/checkout" target="_blank" rel="noopener noreferrer">
            <div className="bg-[#0096DB] p-4 text-white text-center font-bold rounded-xl hover:scale-105 transition-transform animate-bounce-slow mb-6">
              {data.cta_text?.name ?? "Enroll Now"}
            </div>
          </a>



          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold text-lg mb-2 py-2 text-white bg-[#2A3494] text-center rounded-xl">Check Lists</h2>
            {data.checklist.map((item, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <img src={item.icon} alt="icon" className="w-5 h-5 " />
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
