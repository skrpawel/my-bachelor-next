export default function Home() {
  return (
    <div>
      <div className="flex bg-runner bg-cover h-screen items-center justify-center font-bold md:p-24">
        <div className="text-center text-black 2xl:w-1/2">
          <h1 className="text-4xl md:text-6xl 2xl:text-8xl">
            WELCOME TO THE&nbsp;
            <span className="text-prime font-outline-0 ">
              {process.env.appName}
            </span>
          </h1>
          <h2 className="md:text-2xl text-white">
            YOUR ULTIMATE TRAINING COMPANION.
          </h2>
        </div>
      </div>
      <div className="flex h-screen items-center justify-center md:p-24">
        <div className="text-left text-black w-1/2">
          <h3 className="text-4xl md:text-6xl py-4 font-bold text-prime">
            Achieve Your Peak Performance
          </h3>
          <p className="text-xl">
            Our intuitive design make it easy to set goals and monitor your
            progress. Unleash your true potential with every workout.
          </p>
        </div>
      </div>
    </div>
  );
}
