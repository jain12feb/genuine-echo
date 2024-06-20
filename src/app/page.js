import Footer from "@/components/Footer/Footer";
import SiteHeader from "@/components/Navbar/SiteHeader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="relative isolate px-6 pt-10 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl pt-16 sm:pt-24 lg:pt-28">
            {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{" "}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div> */}
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                All your genuine{" "}
                <span
                  // className="block w-full text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 lg:inline"
                  className="block animate-text-gradient leading-[1.1] bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] 
    bg-[200%_auto] bg-clip-text text-transparent"
                >
                  anonymous feedback
                </span>{" "}
                at a single place
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 subpixel-antialiased">
                Ever wished to hear what your peers truly think abouts you
                without the presure of indentity?{" "}
                <strong className="text-gray-700">Genuine Echo</strong> offers a
                safe space where you can receive anonymous messages from known
                voices throughout the huge internet.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {/* <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a> */}
                <Button
                  variant="shine"
                  size="lg"
                  asChild
                  // className="group relative h-10 bg-neutral-950 text-neutral-50  inline-flex items-center justify-center mb-2 border-2 border-black overflow-hidden rounded-md py-2 px-3 sm:w-auto sm:mb-0"
                >
                  <Link href="/signup">
                    <span className="absolute h-0 w-0 rounded-full bg-[#b2a8fd] transition-all duration-300 group-hover:h-56 group-hover:w-full"></span>
                    <span className="relative">Get Started</span>
                    <svg
                      className="relative w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </Button>
                {/* <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a> */}
              </div>
              {/* <p className="mt-6 text-lg leading-8 text-gray-600">
              Embrace the authenticity of candid feedback, heartfelt
              compliments, and thoughtful musings, all while preserving the
              mystery of the sender. Join Genuine Echo today and experience the
              magic of genuine connections, one anonymous message at a time.
            </p> */}
            </div>
          </div>
          {/* <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div> */}
        </div>
        {/* <Separator className="my-4" />
        <Footer /> */}
      </main>
    </>
  );
}
