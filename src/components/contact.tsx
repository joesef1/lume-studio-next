"use client";
import { Mail, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ScrollView } from "./scroll-view";
import { useLanguage } from "@/contexts/language-context";
import { useState, useEffect } from "react";

interface ContactFormData {
  serviceId: number;
  name: string;
  eMail: string;
  phone: string;
  subject: string;
  message: string;
}

interface Service {
  id: number;
  serviceNameAR: string;
  serviceNameEN: string;
}

interface ContactApiResponse {
  succeeded: boolean;
  status: number;
  message: string;
  data: any;
  error: any;
}

// Type guard function to validate API response structure
function isValidContactApiResponse(obj: any): obj is ContactApiResponse {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.succeeded === 'boolean' &&
    typeof obj.status === 'number' &&
    typeof obj.message === 'string' &&
    obj.hasOwnProperty('data') &&
    obj.hasOwnProperty('error')
  );
}

export default function FeaturesSection() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [formData, setFormData] = useState<ContactFormData>({
    serviceId: 1,
    name: "",
    eMail: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://ai-stack.tryasp.net/api/ServiceType/GetServicesList"
        );
        const result = await response.json();

        if (result.succeeded && result.data) {
          setServices(result.data);
          // Set first service as default if available
          if (result.data.length > 0) {
            setFormData((prev) => ({ ...prev, serviceId: result.data[0].id }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setIsLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("https://demo.ai-stack.net/api/Contact/Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if response is valid JSON
      let responseData: any;
      try {
        responseData = await response.json();
      } catch (parseError) {
        throw new Error("Invalid response format: Unable to parse JSON");
      }

      // Validate response structure
      if (!isValidContactApiResponse(responseData)) {
        throw new Error("Invalid response format: Missing required fields");
      }

      // Type-safe response handling
      const validatedResponse: ContactApiResponse = responseData;

      if (validatedResponse.succeeded === true) {
        setSubmitStatus({
          type: "success",
          message:
            validatedResponse.message ||
            t("contactSuccessMessage") ||
            "Contact added successfully",
        });
        // Reset form
        setFormData({
          serviceId: services.length > 0 ? services[0].id : 1,
          name: "",
          eMail: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else if (validatedResponse.succeeded === false) {
        setSubmitStatus({
          type: "error",
          message:
            validatedResponse.message ||
            validatedResponse.error ||
            t("contactErrorMessage") ||
            "Something went wrong. Please try again.",
        });
      } else {
        // Handle unexpected succeeded value
        throw new Error("Invalid response: succeeded field must be boolean");
      }
    } catch (error) {
      let errorMessage: string;

      if (error instanceof Error) {
        // Handle specific validation errors
        if (error.message.startsWith("Invalid response")) {
          errorMessage = t("contactErrorMessage") || "Server response format error. Please try again.";
        } else {
          errorMessage = t("contactErrorMessage") || "Failed to send message. Please check your connection and try again.";
        }
      } else {
        errorMessage = t("contactErrorMessage") || "Failed to send message. Please check your connection and try again.";
      }

      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceId: parseInt(value),
    }));
  };

  return (
    <section className="py-16 md:py-32 bg-gray-50 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
          <div className="lg:col-span-2">
            <div className="md:pr-6 lg:pr-0">
              <ScrollView>
                <h2 className="text-4xl font-semibold lg:text-5xl">
                  {t("getInTouch")}
                </h2>
              </ScrollView>
              <ScrollView>
                <p className="mt-6">{t("contactFormDesc")}</p>
              </ScrollView>
            </div>
            <ScrollView delay={0.2}>
              <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3">
                <li>
                  <Link
                    href="mailto:info@ai-stack.net"
                    className="hover:text-accent-foreground"
                  >
                    <Mail className="size-5 mr-2 inline" />
                    <span>info@ai-stack.net</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="tel:+966501246756"
                    className="hover:text-accent-foreground"
                  >
                    <PhoneCall className="size-5 mr-2 inline" />
                    <span>+966 50 124 6756</span>
                  </Link>
                </li>
              </ul>
            </ScrollView>
          </div>
          <div className="lg:col-span-3">
            <ScrollView>
              <Card className="mx-auto mt-12 max-w-lg p-8 shadow-md sm:p-16 w-full">
                <div>
                  <h3 className="text-lg font-semibold">
                    {t("letsGetYouToTheRightPlace")}
                  </h3>
                  <p className="mt-4 text-sm">{t("reachOutDesc")}</p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="**:[&>label]:block mt-12 space-y-6 *:space-y-3"
                >
                  <div>
                    <Label htmlFor="serviceId">{t("selectService")}</Label>
                    <Select
                      value={formData.serviceId.toString()}
                      onValueChange={handleServiceChange}
                      disabled={isSubmitting || isLoadingServices}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("selectServicePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {language === "ar"
                              ? service.serviceNameAR
                              : service.serviceNameEN}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="name">{t("fullName")}</Label>
                    <Input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="eMail">{t("workEmail")}</Label>
                    <Input
                      type="email"
                      id="eMail"
                      value={formData.eMail}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <Input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder="+966 50 000 0000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">{t("subject")}</Label>
                    <Input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">{t("message")}</Label>
                    <Textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {submitStatus.type && (
                    <div
                      className={`p-4 rounded-md ${submitStatus.type === "success"
                        ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                        }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t("sending") || "Sending..." : t("submit")}
                  </Button>
                </form>
              </Card>
            </ScrollView>
          </div>
        </div>
      </div>
    </section>
  );
}
