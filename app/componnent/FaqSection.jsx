"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "How do I find a trusted home service provider in Chicago?",
        answer:
            "You can browse verified professionals across categories like Handyman, Plumbing, and Landscaping. Each provider is reviewed and rated by real customers to help you choose confidently.",
    },
    {
        question: "Do I need to create an account to post a review?",
        answer:
            "Yes. Creating a free account allows you to leave reviews, rate providers, and manage your feedback easily from your dashboard.",
    },
    {
        question: "Can service providers register their business here?",
        answer:
            "Absolutely! If you’re a service provider, you can create a business profile, showcase your services, and receive verified client reviews directly on our platform.",
    },
    {
        question: "Is there any cost to using this platform?",
        answer:
            "Our platform is completely free for customers who are looking to review or hire professionals. Service providers can join for free and upgrade later for premium visibility.",
    },
    {
        question: "How quickly can I expect a response from a provider?",
        answer:
            "Most verified providers respond within 24 hours. You can also message multiple providers to compare quotes and availability.",
    },
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="py-20 bg-gray-50 text-black relative">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-[var(--brandBg)] rounded-full text-white mb-4">
                        <HelpCircle size={24} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Frequently Asked{" "}
                        <span className="text-[var(--brandColor)]">Questions</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have a question? Here are the most common queries about our platform
                        and how it helps both customers and service providers.
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            className="border border-gray-200 bg-white rounded-[var(--radius-card)] shadow-sm"
                        >
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full flex justify-between items-center text-left p-5"
                            >
                                <h3 className="font-semibold text-gray-900 text-lg">
                                    {faq.question}
                                </h3>
                                {openIndex === idx ? (
                                    <ChevronUp className="text-[var(--brandColor)]" />
                                ) : (
                                    <ChevronDown className="text-[var(--brandColor)]" />
                                )}
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-5 pb-5 text-gray-600"
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
