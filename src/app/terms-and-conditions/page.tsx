// src/app/terms-and-conditions/page.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

// --- Hero Section (Terms and Conditions Page) ---
const TermsAndConditionsHeroSection = ({ pageKey }: { pageKey: string }) => (
    <section key={pageKey} className="relative pt-48 pb-32 flex items-center justify-center text-white bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900 to-slate-900"></div>
        <div className="relative z-10 text-center container mx-auto px-6">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200"
            >
                Terms and Conditions
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

// --- Terms and Conditions Content Section ---
const TermsAndConditionsContentSection = () => (
    <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="py-20 bg-slate-800 text-white"
    >
        <div className="container mx-auto px-6 max-w-3xl prose prose-invert prose-lg prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300">
            <h2>1. Agreement to Terms</h2>
            <p>Welcome to JCAI Consulting. These Terms and Conditions ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you” or "User"), and JCAI Consulting (“JCAI,” “we,” “us,” or “our”), concerning your access to and use of the www.jcai-consulting.com website as well as any services or products we offer.</p>
            <p>By accessing our website, creating an account, or using our services, you acknowledge that you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms, you are expressly prohibited from using the site and services and must discontinue use immediately.</p>

            <h2>2. Our Services and Products</h2>
            <p>JCAI Consulting offers two primary types of services:</p>
            <ul>
                <li><strong>JCAI Personal AI Assistant ("the Product"):</strong> A sophisticated digital assistant available via a subscription, designed to enhance personal and professional productivity through features like email management, document generation, and calendar organization.</li>
                <li><strong>Bespoke AI & Automation Consulting Services ("Consulting Services"):</strong> Custom-designed AI and automation solutions built for business clients to address specific operational challenges. These services are typically governed by a separate, detailed client agreement or Statement of Work.</li>
            </ul>

            <h2>3. User Accounts</h2>
            <p>To access the JCAI Personal AI Assistant, you must register for an account. You agree to:</p>
            <ul>
                <li>Provide accurate, current, and complete information during the registration process.</li>
                <li>Maintain the security and confidentiality of your password and account credentials.</li>
                <li>Be fully responsible for all activities that occur under your account.</li>
                <li>Notify us immediately of any unauthorized use of your account.</li>
            </ul>

            <h2>4. Payments, Subscriptions, and Refunds</h2>
            <h3>a) Subscriptions:</h3>
            <p>The JCAI Personal AI Assistant is billed on a subscription basis. You will be billed in advance on a recurring, periodic basis (such as monthly), as specified at the time of purchase.</p>
            <h3>b) Payment Processing:</h3>
            <p>We use third-party services for payment processing. We do not store or collect your payment card details. That information is provided directly to our third-party payment processors, whose use of your personal information is governed by their Privacy Policy.</p>
            <h3>c) Cancellation:</h3>
            <p>You may cancel your subscription at any time. The cancellation will take effect at the end of the current billing cycle.</p>
            <h3>d) Refunds:</h3>
            <p>Subscription fees are generally non-refundable except where required by law.</p>

            <h2>5. Consulting Services Agreements</h2>
            <p>Our bespoke Consulting Services are governed by a separate, definitive agreement executed between JCAI Consulting and the client. That agreement will detail the scope of work, timelines, fees, and specific guarantees, such as the minimum 20% reduction in manual processing time for defined administrative processes. These Terms and Conditions will not supersede any specific terms in a signed client agreement.</p>

            <h2>6. Intellectual Property Rights</h2>
            <h3>a) Our IP:</h3>
            <p>Unless otherwise indicated, the website, the JCAI Personal AI Assistant, and all source code, databases, functionality, software, text, and graphics (collectively, "Our Content") are our proprietary property, owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>
            <h3>b) User Content:</h3>
            <p>You retain ownership of the content you create, input, or upload while using our services ("User Content"). By using the JCAI Personal AI Assistant, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and process your User Content solely for the purpose of operating and providing the service to you.</p>

            <h2>7. Prohibited Activities</h2>
            <p>You may not access or use our services for any purpose other than that for which we make them available. You agree not to:</p>
            <ul>
                <li>Use our services for any illegal or unauthorized purpose.</li>
                <li>Attempt to reverse engineer, decompile, or otherwise attempt to discover the source code of the JCAI Personal AI Assistant.</li>
                <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others.</li>
                <li>Use the service to generate content that is unlawful, harmful, defamatory, or obscene.</li>
                <li>Transmit any worms, viruses, or any code of a destructive nature.</li>
                <li>Interferere with or disrupt the integrity or performance of the services or the data contained therein.</li>
            </ul>

            <h2>8. Termination</h2>
            <p>We may terminate or suspend your account and bar access to the services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. You may terminate your account at any time by cancelling your subscription and discontinuing the use of our services.</p>

            <h2>9. Disclaimer of Warranties and Limitation of Liability</h2>
            <h3>a) Disclaimer:</h3>
            <p>Our services are provided on an "AS IS" and "AS AVAILABLE" basis. JCAI Consulting makes no warranties, expressed or implied, and hereby disclaims all other warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property. We do not warrant that the service will be uninterrupted, secure, or error-free, or that the results obtained from the use of the service will be accurate or reliable.</p>
            <h3>b) Limitation of Liability:</h3>
            <p>In no event shall JCAI Consulting, nor its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>

            <h2>10. Governing Law and Dispute Resolution</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the Republic of Namibia, without regard to its conflict of law provisions. Any dispute arising from these Terms or your use of our services will be subject to the exclusive jurisdiction of the courts located in Swakopmund, Namibia.</p>

            <h2>11. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our service after any revisions become effective, you agree to be bound by the revised terms.</p>

            <h2>12. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <ul>
                <li>By Email: info@jcai-consulting.com</li>
                <li>By Phone: +264-81-4090-285</li>
            </ul>
        </div>
    </motion.section>
);

// --- Main App Component for Terms and Conditions Page ---
export default function TermsAndConditionsPage() {
  const pathname = usePathname();
  return (
    <div>
        <TermsAndConditionsHeroSection pageKey={pathname} />
        <TermsAndConditionsContentSection />
    </div>
  );
}