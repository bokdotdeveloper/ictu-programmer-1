import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Chat With sAntI",
        1000,
        "Your AI Chat Assistant",
        2000,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
        padding: 20,
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
