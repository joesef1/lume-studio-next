"use client";
import { CustomCursorElement } from "@/components/custom-cursor-element";
import { InView } from "@/components/motion-primitives/in-view";
import { ScrollView, ScrollViewStaggerWrapper } from "@/components/scroll-view";
import { Badge } from "@/components/ui/badge";
import { SERVICES_LIST } from "@/content/services";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { translateService } from "@/content/services-translations";

export default function ServicesSection2() {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 md:py-32" id="services">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <ScrollView>
            <h2 className="text-4xl font-medium lg:text-5xl">
              {t("servicesTitle")}
            </h2>
          </ScrollView>
          <ScrollView delay={0.2}>
            <p>
              {t("servicesDescription")}
            </p>
          </ScrollView>
        </div>
        <div className="mt-12 md:mt-24">
          <div className="space-y-10">
            {SERVICES_LIST.map((service) => (
              <CustomCursorElement
                key={service.name}
                cursor={
                  <div className="text-zinc-950 text-lg font-medium">
                    {t("view")}
                  </div>
                }
              >
                <Link href={service.url} className="block">
                  <div className="group overflow-hidden border-b py-10 cursor-pointer transition-colors duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                      <div className="self-end lg:col-span-2">
                        <div className="flex flex-col gap-8 ">
                          <div className="space-y-4">
                            <ScrollView>
                              <h3 className="text-title text-2xl font-medium group-hover:text-primary transition-colors duration-300">
                                {translateService(service.name, language)}
                              </h3>
                            </ScrollView>

                            <ScrollView stagger delay={0.04}>
                              <div>
                                {service.tags.map((tag, index) => (
                                  <div key={index} className="inline-block">
                                    <ScrollViewStaggerWrapper>
                                      <Badge
                                        className="mr-2 mb-2"
                                        variant="secondary"
                                      >
                                        {translateService(tag, language)}
                                      </Badge>
                                    </ScrollViewStaggerWrapper>
                                  </div>
                                ))}
                              </div>
                            </ScrollView>
                          </div>
                          <ScrollView delay={0.04}>
                            <p className="text-muted-foreground">
                              {translateService(service.description, language)}
                            </p>
                          </ScrollView>
                        </div>
                      </div>
                      <div className=" lg:col-span-3">
                        <InView
                          variants={{
                            hidden: {
                              opacity: 0,
                              y: 20,
                              filter: "blur(14px)",
                              scale: 0.5,
                              originX: 0,
                              originY: 0,
                            },
                            visible: {
                              opacity: 1,
                              scale: 1,
                              y: 0,
                              filter: "blur(0px)",
                              transition: {
                                delay: 0.01,
                                duration: 0.5,
                              },
                            },
                          }}
                          viewOptions={{
                            margin: "0px 0px -250px 0px",
                            once: true,
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <Image
                            src={service.img}
                            alt={service.name}
                            height="250"
                            width="640"
                            loading="lazy"
                            className="object-cover transition-all duration-500
                             aspect-[9/5] group-hover:scale-105"
                          />
                        </InView>
                      </div>
                    </div>
                  </div>
                </Link>
              </CustomCursorElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
