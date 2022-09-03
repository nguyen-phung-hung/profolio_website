import Head from "next/head";
import IntroSection from "../components/custom/landing_page/IntroSection";
import DefaultLayout from "../components/layouts/default";

HomePage.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default function HomePage() {
  // const mainRef = useRef();

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   const mySplitText = new SplitText(mainRef.current, {
  //     type: "words,chars",
  //   });
  //   ScrollTrigger.create({
  //     trigger: mainRef.current,
  //     start: "top bottom",
  //     // end: "+=100",
  //     scrub: true,
  //     onUpdate: (self) => {
  //       console.log(self.getVelocity());
  //       if (self.direction === 1) {
  //         // TweenMax.staggerFrom(
  //         //   mySplitText.chars,
  //         //   1,
  //         //   {
  //         //     opacity: 0,
  //         //     y: 50,
  //         //     ease: Back.easeOut,
  //         //   },
  //         //   0.02
  //         // );
  //         gsap.fromTo(
  //           mySplitText.chars,
  //           {
  //             y: self.getVelocity() * 0.02,
  //             duration: 1,
  //             stagger: 0.03,
  //             ease: Back.easeOut,
  //           },
  //           {
  //             y: 0,
  //             duration: 1,
  //             stagger: 0.03,
  //             ease: Power2.easeOut,
  //           }
  //         );
  //       } else {
  //         gsap.fromTo(
  //           mySplitText.chars,
  //           {
  //             y: -self.getVelocity() * 0.02,

  //             duration: 1,
  //             stagger: 0.03,
  //             ease: Power2.easeOut,
  //           },
  //           {
  //             y: 0,
  //             duration: 1,
  //             stagger: 0.03,
  //             ease: Power2.easeOut,
  //           }
  //         );
  //       }
  //     },
  //   });
  // }, []);

  return (
    <>
      <Head>
        <title>Nguyen Phung Hung</title>
        <meta name="description" content="Nguyen Phung Hung profolio website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <IntroSection />
    </>
  );
}
