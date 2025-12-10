"use client";
import { Circle } from "lucide-react";
import { ScrollView } from "./scroll-view";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

export default function ContentSection() {
  const { t } = useLanguage();

  const ourPrinciples = [
    {
      title: t("onTimeDelivery"),
      description: t("onTimeDeliveryDesc"),
    },
    {
      title: t("quality"),
      description: t("qualityDesc"),
    },
    {
      title: t("innovation"),
      description: t("innovationDesc"),
    },
    {
      title: t("continuousCommunication"),
      description: t("continuousCommunicationDesc"),
    },
  ];

  return (
    <section className="py-16 md:py-32" id="about">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <ScrollView>
            <h2 className="text-balance text-4xl font-medium lg:text-5xl">
              {t("aboutTitle")}
            </h2>
          </ScrollView>
          <ScrollView>
            <p>
              {t("aboutUsDesc")}
            </p>
          </ScrollView>
        </div>
        <ScrollView>
          <Image
            className="rounded-(--radius) grayscale-75 object-cover aspect-[16/9] w-full"
            src="/images/office2.jpg"
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
