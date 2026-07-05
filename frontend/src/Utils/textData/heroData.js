export const coursematchHero = {
  left: {
    badge: {
      text: "AI-Powered Course Matching",
      showDot: true,
    },

    title: (
      <>
        Find your <br />
        <span className="intro__title-highlight">perfect</span> course.
      </>
    ),

    subtitle:
      "CourseMatch ranks every course you qualify for — instantly. See exactly where you stand, what you need to improve, and which doors are already open.",

    actions: [
      {
        text: "Get Started",
        variant: "primary",
        navigate: "/login",
      },
      {
        text: "How it works",
        variant: "ghost",
        scrollTo: "hiw-section",
      },
    ],

    pills: ["Requirements clarity", "Instant ranking", "Student-first"],
  },

  right: {
    image: {
      desktop: "/heroDesktop.png",
      mobile: "/heroPhone.png",
      alt: "CourseMatch platform preview",
    },

    steps: ["Subjects", "Career goals", "Matched courses"],
  },
};
