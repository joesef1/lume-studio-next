import { Circle, Cpu, Lock, Sparkles, Zap } from "lucide-react";
import { ScrollView } from "./scroll-view";
import Image from "next/image";

const ourPrinciples = [
  {
    title: "On-Time Delivery",
    description:
      "We ensure timely project delivery to help you achieve your goals as quickly as possible.",
  },
  {
    title: "Quality ",
    description:
      "We adhere to the highest quality standards to provide you with an exceptional experience that drives your project's success.",
  },

  {
    title: "Innovation",
    description:
      "We deliver creative and unique solutions tailored to your business needs, helping you stand out.",
  },
  {
    title: "Continuous Communication",
    description:
      "We provide comprehensive support and ongoing communication to ensure your complete satisfaction with our services.",
  },
];

export default function ContentSection() {
  return (
    <section className="py-16 md:py-32" id="about">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <ScrollView>
            <h2 className="text-balance text-4xl font-medium lg:text-5xl">
              About Us
            </h2>
          </ScrollView>
          <ScrollView>
            <p>
              At ai-stack, our applications aren’t just beautiful — they’re built to solve problems, engage users, and deliver results. Whether you’re beginning or improving, we’ve got you covered.
            </p>
          </ScrollView>
        </div>
        <ScrollView>
          <Image
            className="rounded-(--radius) grayscale-75 object-cover aspect-[16/9] w-full"
            src="/images/office.jpeg"
            alt="team image"
            height="480"
            width="720"
            loading="lazy"
          />
        </ScrollView>
        <ScrollView>
          <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
            {ourPrinciples.map((principle, index) => (
              <div className="space-y-3" key={index}>
                <div className="flex items-center gap-2">
                  <Circle className="size-4" />
                  <h3 className="text-sm font-medium">{principle.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollView>
      </div>
    </section>
  );
}
