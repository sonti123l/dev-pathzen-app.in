export const onHover = () => {
  const getWelcomeDiv = document.getElementById("hover-div");
  getWelcomeDiv?.addEventListener("mouseenter", () => {
    return "w-30 h-30 text-wrap text-white text-sm rotate-0";
  });

  getWelcomeDiv?.addEventListener("mouseleave", () => {
    return "w-15 h-15 visibility-hidden";
  });
};
