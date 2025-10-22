// src/app/privacy-policy/page.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

// --- Hero Section (Privacy Policy Page) ---
const PrivacyPolicyHeroSection = ({ pageKey }: { pageKey: string }) => (
    <section key={pageKey} className="relative pt-48 pb-32 flex items-center justify-center text-white bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900 to-slate-900"></div>
        <div className="relative z-10 text-center container mx-auto px-6">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200"
            >
                Privacy Policy
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300"
            >
                Effective Date: June 30, 2025
            </motion.p>
        </div>
    </section>
);

// --- Privacy Policy Content Section ---
const PrivacyPolicyContentSection = () => (
    <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="py-20 bg-slate-800 text-white"
    >
        <div className="container mx-auto px-6 max-w-3xl prose prose-invert prose-lg prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300">
            <h2>1. Introduction</h2>
            <p>Welcome to JCAI Consulting. We are committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy outlines our commitment to your privacy, explaining what information we collect, how we use and protect it, and your rights regarding your personal data.</p>
            <p>This policy applies to data collected through our website (`www.jcai-consulting.com`), our products, including the JCAI Personal AI Assistant, and our bespoke AI and automation consulting services. Our core values of Partnership and Client Success guide our approach to data, ensuring we align our efforts directly with your growth and security.</p>
            
            <h2>2. Information We Collect</h2>
            <p>We collect information to provide and improve our services. The type of information we collect depends on how you interact with us.</p>
            
            <h3>a) Information You Provide Directly:</h3>
            <ul>
                <li><strong>Personal Identification & Contact Information:</strong> When you fill out a contact form, book a consultation, or subscribe to the JCAI Personal AI Assistant, you may provide us with your name, email address, phone number, and company name.</li>
                <li><strong>Payment Information:</strong> For subscription services, we use third-party payment processors. We do not store your full credit card or financial details on our servers. We only receive confirmation of payment.</li>
                <li><strong>Client & Project Data:</strong> When engaging our consulting services, we may process data related to your business operations to build your custom solution. This data is handled under strict confidentiality as per our client agreement.</li>
                <li><strong>JCAI Personal AI Assistant Content:</strong> To provide the service, the assistant processes content you provide, such as email text, document contents, and calendar events, to perform tasks like summarization, generation, and scheduling.</li>
            </ul>

            <h3>b) Information We Collect Automatically:</h3>
            <ul>
                <li><strong>Usage Data:</strong> We may collect information about how you access and use our website and services. This includes your IP address, browser type, browser version, the pages you visit, the time and date of your visit, and time spent on those pages.</li>
                <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
                <li><strong>To Provide and Maintain Our Services:</strong> To deliver the functionalities of the JCAI Personal AI Assistant and build, implement, and support our custom AI solutions.</li>
                <li><strong>To Process Transactions:</strong> To process subscription payments and manage your account.</li>
                <li><strong>To Communicate With You:</strong> To respond to your inquiries, send you service-related updates, provide training and tutorials, and share marketing communications that you can opt-out of at any time.</li>
                <li><strong>To Improve Our Services:</strong> To understand how our users interact with our products and website, allowing us to enhance user experience, fix bugs, and update our services with the newest AI technology to ensure the best outcomes.</li>
                <li><strong>For Security and Legal Compliance:</strong> To protect against fraud, monitor for security threats, and comply with applicable legal obligations.</li>
            </ul>

            <h2>4. How We Share and Disclose Information</h2>
            <p>Your privacy is paramount. We do not sell your personal data. We may share your information only in the following limited circumstances:</p>
            <ul>
                <li><strong>With Your Consent:</strong> We may share your information for other purposes with your explicit consent.</li>
                <li><strong>Third-Party Service Providers:</strong> We may share information with third-party vendors and service providers who perform services on our behalf, such as payment processing, cloud hosting, and data analytics. These providers are contractually obligated to safeguard your data and only use it for the services we request.</li>
                <li><strong>For Legal Reasons:</strong> We may disclose your information if we believe it is reasonably necessary to comply with a law, regulation, legal process, or governmental request; to protect the safety of any person; to address fraud, security, or technical issues; or to protect our rights or property.</li>
                <li><strong>Business Transfers:</strong> If JCAI Consulting is involved in a merger, acquisition, or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>We implement a variety of robust security measures to maintain the safety of your personal information. This includes encryption, access controls, and regular security reviews of our systems. While we use commercially acceptable means to protect your Personal Data, we acknowledge that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

            <h2>6. Data Retention</h2>
            <p>We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.</p>

            <h2>7. Your Data Protection Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul>
                <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
                <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            <p>To exercise any of these rights, please contact us using the details below.</p>

            <h2>8. Children's Privacy</h2>
            <p>Our services are not intended for use by anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from children under 18. If you become aware that a child has provided us with Personal Data, please contact us.</p>

            <h2>9. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. We encourage you to review this Privacy Policy periodically for any changes.</p>

            <h2>10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul>
                <li><strong>By Email:</strong> info@jcai-consulting.com</li>
                <li><strong>By Phone:</strong> +264-81-4090-285</li>
            </ul>
        </div>
    </motion.section>
);

// --- Main App Component for Privacy Policy Page ---
export default function PrivacyPolicyPage() {
  const pathname = usePathname();
  return (
    <div>
        <PrivacyPolicyHeroSection pageKey={pathname} />
        <PrivacyPolicyContentSection />
    </div>
  );
}