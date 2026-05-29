"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        // Simulate form submission (replace with your actual API endpoint)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("Form submitted:", formData);
            setIsSubmitted(true);
            setFormData({ name: "", email: "", subject: "", message: "" });

            // Reset success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            details: ["support@numrexo.com", "hello@numrexo.com"],
            link: "mailto:support@numrexo.com",
        },
        {
            icon: Phone,
            title: "Call Us",
            details: ["+91 12345 67890", "+91 98765 43210"],
            link: "tel:+911234567890",
        },
        {
            icon: MapPin,
            title: "Visit Us",
            details: ["Numrexo HQ", "Mumbai, Maharashtra", "India - 400001"],
            link: "https://maps.google.com",
        },
        {
            icon: Clock,
            title: "Business Hours",
            details: ["Monday - Friday: 9:00 AM - 6:00 PM IST", "Saturday: 10:00 AM - 4:00 PM IST", "Sunday: Closed"],
        },
    ];

    const faqs = [
        {
            q: "How quickly do you respond?",
            a: "We typically respond within 24-48 hours on business days.",
        },
        {
            q: "Is there phone support available?",
            a: "Yes, phone support is available during business hours for urgent queries.",
        },
        {
            q: "Can I request a new calculator?",
            a: "Absolutely! We love hearing calculator ideas from our users. Just mention it in the message.",
        },
    ];

    return (
        <div className="px-6 py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-8">
                    <ol className="flex items-center gap-2 text-sm text-gray-500">
                        <li>
                            <a href="/" className="hover:text-white transition-colors">Home</a>
                        </li>
                        <li aria-hidden="true" className="text-gray-700">/</li>
                        <li className="text-gray-300" aria-current="page">Contact</li>
                    </ol>
                </nav>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
                        <span className="text-sm font-semibold text-blue-400">Get in Touch</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        Contact Us
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Have questions, feedback, or need assistance? We'd love to hear from you.
                        Reach out to us through any of the channels below.
                    </p>
                </div>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {contactInfo.map((info, index) => (
                        <div
                            key={index}
                            className="bg-[#111827] border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all group"
                        >
                            <info.icon className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-semibold text-white mb-3">{info.title}</h3>
                            <div className="space-y-1">
                                {info.details.map((detail, i) => (
                                    <p key={i} className="text-sm text-gray-400">{detail}</p>
                                ))}
                            </div>
                            {info.link && (
                                <a
                                    href={info.link}
                                    className="inline-block mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Get in touch →
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Form and Map Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Contact Form */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-8">
                        <h2 className="text-2xl font-semibold text-white mb-2">Send us a Message</h2>
                        <p className="text-gray-400 text-sm mb-6">
                            Fill out the form below and we'll get back to you as soon as possible.
                        </p>

                        {isSubmitted && (
                            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <p className="text-green-400 text-sm">Thank you! Your message has been sent successfully.</p>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400" />
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                    Subject *
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                                >
                                    <option value="">Select a subject</option>
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Technical Support">Technical Support</option>
                                    <option value="Calculator Request">Calculator Request</option>
                                    <option value="Feedback">Feedback</option>
                                    <option value="Business Collaboration">Business Collaboration</option>
                                    <option value="Report an Issue">Report an Issue</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                    placeholder="Tell us how we can help you..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>Sending...</>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Map / FAQ Section */}
                    <div className="space-y-6">
                        {/* Map */}
                        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-3">Our Location</h3>
                            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.64329960238!2d72.74110159128612!3d19.08252233880275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1698765432109!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Numrexo Office Location"
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                            <p className="text-xs text-gray-500 mt-3">
                                Mumbai, Maharashtra, India
                            </p>
                        </div>

                        {/* Quick FAQ */}
                        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-3">Quick Answers</h3>
                            <div className="space-y-3">
                                {faqs.map((faq, index) => (
                                    <details key={index} className="group">
                                        <summary className="flex items-center justify-between cursor-pointer text-sm text-gray-300 hover:text-blue-400 transition-colors">
                                            {faq.q}
                                            <span className="text-blue-400 group-open:rotate-180 transition-transform">▾</span>
                                        </summary>
                                        <p className="mt-2 text-xs text-gray-500 pl-2">{faq.a}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-900/40 rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-semibold text-white mb-3">Connect With Us</h2>
                    <p className="text-gray-400 text-sm mb-6">
                        Follow us on social media for updates, tips, and new calculator announcements.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all"
                        >
                            📘 Facebook
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all"
                        >
                            🐦 Twitter
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all"
                        >
                            💼 LinkedIn
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all"
                        >
                            📧 Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}