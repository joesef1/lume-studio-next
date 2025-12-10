import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <img
      className="h-10 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
      src="/ai-stack.png"
      alt="team member1"
      width="826"
    // height="1239"
    />
  );
};

export const LogoStroke = ({ className }: { className?: string }) => {
  return (
    <img
      className="h-10 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
      src="/ai-stack.png"
      alt="team member2"
      width="826"
    // height="1239"
    />
  );
};
