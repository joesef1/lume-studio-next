export const SERVICES_LIST = [
  {
    name: "Artificial Intelligence Solutions",
    slug: "artificial-intelligence-solutions",
    tags: [
      "Machine Learning",
      "Predictive Analytics",
      "Integrated Solutions for Intelligent Automation (RPA)"
    ],
    img: "/images/ai-solutions.jpg",
    url: "/service-details/artificial-intelligence-solutions",
    description:
      "AI-powered insights for smarter decisions and future growth."
  },
  
  {
    name: "Application Development",
    slug: "application-development",
    tags: [
      "E-commerce Store Applications",
      "Booking Applications",
      "Educational Platform Applications"
    ],
    img: "/images/mobile-Application-Development.jpg",
    url: "/service-details/application-development",
    description:
      "Smart apps to optimize performance and increase engagement."
  },
  {
    name: "Website Development",
    slug: "website-development",
    tags: [
      "Professional and Corporate Websites",
      "Educational Platforms",
      "Online Stores"
    ],
    img: "/images/web.jpg",
    url: "/service-details/website-development",
    description:
      "Innovative website designs that boost credibility and enhance user experience."
  },
];

// Detailed services for the ServicesSection component
export const SERVICES_DETAILED = SERVICES_LIST.map((service, index) => ({
  id: index + 1,
  title: service.name,
  slug: service.slug,
  description: service.description,
  image: service.img,
  tags: service.tags,
  url: service.url,
  longDescription: `Our ${service.name} service combines cutting-edge technology with industry expertise to deliver exceptional results. We work closely with our clients to understand their unique needs and create tailored solutions that drive growth and innovation.`
}));
