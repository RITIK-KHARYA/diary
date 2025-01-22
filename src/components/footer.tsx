import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Resources", href: "#resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "#help" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Privacy Policy", href: "#privacy" },
    ],
  },
];
const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
  >
    {children}
  </Link>
);
const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) => (
  <div className="flex flex-col gap-4">
    <h3 className="font-medium text-white">{title}</h3>
    <div className="flex flex-col gap-2">
      {links.map((link) => (
        <FooterLink key={link.name} href={link.href}>
          {link.name}
        </FooterLink>
      ))}
    </div>
  </div>
);
export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "w-full bg-gradient-to-b from-gray-900 to-black",
        "border-t border-gray-800",
        "py-16 px-4 sm:px-6 lg:px-8"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  src="/lovable-uploads/9ff04b02-f9a0-4af0-9364-1b49ca9c820f.png"
                  alt="Logo"
                  className="h-8 w-auto"
                />
              </motion.div>
              <span className="text-xl font-semibold text-white">Diary</span>
            </Link>
            <p className="text-gray-400 text-sm">
              A microblogging platform that allows you to write and share your
              thoughts and ideas with the world.
            </p>
          </div>

          {footerLinks.map((section) => (
            <FooterSection key={section.title} {...section} />
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Diary. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Twitter
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                LinkedIn
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                GitHub
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
