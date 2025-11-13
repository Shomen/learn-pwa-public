import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="block">
      <section className="flex flex-col md:flex-row items-center justify-evenly bg-stone-50">
        <div className="relative max-w-lg flex flex-col items-center text-center h-40 md:h-100 md:my0 my-8">
          <h1 className="text-5xl w:100 md:text-8xl font-bold mb-6">Welcome to LearnHub!</h1>
          <h2 className="text-lg w:100 md:text-3xl font-medium">
            Your gateway to mastering in technology.
          </h2>
        </div>
        <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
          <Image
            src="/nicolas-j-leclercq-SZ6Uc4chfCo-unsplash.webp"
            alt="Welcome Image"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
      </section>
      <section className="max-w-4xl mx-auto my-12 px-4 text-center">
        <h3 className="text-3xl font-semibold mb-4">Why LearnHub?</h3>
        <p className="text-lg">
          At LearnHub, we believe that learning should be accessible, engaging, and effective. Our platform offers a wide range of courses designed to help you acquire new skills and advance your career. Whether you're a beginner or an experienced professional, LearnHub has something for everyone.
        </p>
      </section>
      <section className="bg-lh-menu-background text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-4">Get Started Today!</h3>
          <p className="text-lg mb-6">
            Join thousands of learners who have transformed their careers with LearnHub. Sign up now and take the first step towards achieving your goals.
          </p>
          <Link href="/registration"> 
            <button className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition">
              Sign Up Now
            </button>
          </Link>
        </div>
      </section>
      <section className="max-w-4xl mx-auto my-12 px-4 text-center">
        <h3 className="text-3xl font-semibold mb-4">Explore Our Popular Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-2">Web Development Bootcamp</h4>
            <p className="text-gray-700 mb-4">
              Learn the fundamentals of web development, including HTML, CSS, JavaScript, and popular frameworks.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition">
              Learn More
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-2">Data Science with Python</h4>
            <p className="text-gray-700 mb-4">
              Dive into data analysis, visualization, and machine learning using Python and its powerful libraries.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition">
              Learn More
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-2">Digital Marketing Mastery</h4>
            <p className="text-gray-700 mb-4">
              Master the art of digital marketing, including SEO, social media, email marketing, and more.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition">
              Learn More
            </button>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-4">What Our Students Say</h3>
          <p className="text-lg italic">
            "LearnHub has completely transformed my career. The courses are well-structured and the instructors are top-notch!" - Sarah K.
          </p>
          <p className="text-lg italic mt-4">
            "I was able to switch careers thanks to LearnHub. The support from the community was incredible." - James L.
          </p>
        </div>
      </section>  
    </div>
  );
}
