import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

function NotFound() {
  return (
    // <div className="my-12 flex justify-center items-center px-2 md:my-24 md:px-0">
    //   <div className="lg:flex lg:items-center lg:space-x-10">
    //     <img
    //       src="https://illustrations.popsy.co/white/resistance-band.svg"
    //       alt="question-mark"
    //       className="h-[300px] w-auto"
    //     />
    //     <div>
    //       <p className="mt-6 text-sm font-semibold text-black">404 error</p>
    //       <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
    //         We can&apos;t find that page
    //       </h1>
    //       <p className="mt-4 text-gray-500">
    //         Sorry, the page you are looking for doesn&apos;t exist or has been
    //         moved.
    //       </p>
    //       <div className="mt-6 flex items-center space-x-3">
    //         <Link
    //           href="/"
    //           className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    //         >
    //           <ArrowLeftIcon size={16} className="mr-2" />
    //           Go back
    //         </Link>
    //         <button
    //           type="button"
    //           className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    //         >
    //           Contact us
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-50 to-yellow-100"
      // style={{
      //   backgroundImage: `url("https://picsum.photos/id/${Math.floor(
      //     Math.random() * 300 + 1
      //   )}/200/300")`,
      // }}
    >
      <div className="max-w-2xl mx-auto text-center bg-opacity-90 p-8">
        <div className="text-9xl font-bold text-indigo-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 tracking-tight">
          The page you are looking for seems to have gone on a little adventure
          ride. Don&apos;t worry, we&apos;ll help you find your way back home.
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
