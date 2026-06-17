// "use client";

// import { useState } from "react";
// import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";

// export default function ContactPage() {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         subject: "",
//         message: "",
//     });

//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [error, setError] = useState("");

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setError("");

//         // Simulate form submission (replace with your actual API endpoint)
//         try {
//             await new Promise(resolve => setTimeout(resolve, 1500));
//             console.log("Form submitted:", formData);
//             setIsSubmitted(true);
//             setFormData({ name: "", email: "", subject: "", message: "" });

//             // Reset success message after 5 seconds
//             setTimeout(() => setIsSubmitted(false), 5000);
//         } catch (err) {
//             setError("Something went wrong. Please try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const contactInfo = [
//         {
//             icon: Mail,
//             title: "Email Us",
//             details: ["support@numrexo.com", "hello@numrexo.com"],
//             link: "mailto:support@numrexo.com",
//         },
//         // Call Us Section - Commented out (will be enabled when phone support is available)
//         // {
//         //     icon: Phone,
//         //     title: "Call Us",
//         //     details: ["+91 12345 67890", "+91 98765 43210"],
//         //     link: "tel:+911234567890",
//         // },
//         {
//             icon: MapPin,
//             title: "Visit Us",
//             details: ["Numrexo HQ", "Noida, Uttar Pradesh", "India - 201309"],
//             link: "https://maps.google.com",
//         },
//         {
//             icon: Clock,
//             title: "Business Hours",
//             details: ["Our support team is available 24 hours a day.", "7 days a week via email.", "We typically respond within 2-4 hours."],
//         },
//     ];

//     const faqs = [
//         {
//             q: "How quickly do you respond?",
//             a: "We typically respond within 24-48 hours on business days.",
//         },
//         // Phone support FAQ - Commented out
//         // {
//         //     q: "Is there phone support available?",
//         //     a: "Yes, phone support is available during business hours for urgent queries.",
//         // },
//         {
//             q: "Can I request a new calculator?",
//             a: "Absolutely! We love hearing calculator ideas from our users. Just mention it in the message.",
//         },
//     ];

//     return (
//         <div className="px-6 py-12 md:py-16">
//             <div className="max-w-6xl mx-auto">
//                 {/* Breadcrumb */}
//                 <nav aria-label="Breadcrumb" className="mb-8">
//                     <ol className="flex items-center gap-2 text-sm text-gray-500">
//                         <li>
//                             <a href="/" className="hover:text-white transition-colors">Home</a>
//                         </li>
//                         <li aria-hidden="true" className="text-gray-700">/</li>
//                         <li className="text-gray-300" aria-current="page">Contact</li>
//                     </ol>
//                 </nav>

//                 {/* Header */}
//                 <div className="text-center mb-12">
//                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
//                         <span className="text-sm font-semibold text-blue-400">Get in Touch</span>
//                     </div>
//                     <h1 className="text-3xl md:text-4xl font-bold mb-3">
//                         Contact Us
//                     </h1>
//                     <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//                         Have questions, feedback, or need assistance? We'd love to hear from you.
//                         Reach out to us through any of the channels below.
//                     </p>
//                 </div>

//                 {/* Contact Info Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//                     {contactInfo.map((info, index) => (
//                         <div
//                             key={index}
//                             className="bg-[#111827] border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all group"
//                         >
//                             <info.icon className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
//                             <h3 className="text-lg font-semibold text-white mb-3">{info.title}</h3>
//                             <div className="space-y-1">
//                                 {info.details.map((detail, i) => (
//                                     <p key={i} className="text-sm text-gray-400">{detail}</p>
//                                 ))}
//                             </div>
//                             {info.link && (
//                                 <a
//                                     href={info.link}
//                                     className="inline-block mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors"
//                                 >
//                                     Get in touch →
//                                 </a>
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Contact Form and Map Section */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//                     {/* Contact Form */}
//                     <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-8">
//                         <h2 className="text-2xl font-semibold text-white mb-2">Send us a Message</h2>
//                         <p className="text-gray-400 text-sm mb-6">
//                             Fill out the form below and we'll get back to you as soon as possible.
//                         </p>

//                         {isSubmitted && (
//                             <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
//                                 <CheckCircle className="w-5 h-5 text-green-400" />
//                                 <p className="text-green-400 text-sm">Thank you! Your message has been sent successfully.</p>
//                             </div>
//                         )}

//                         {error && (
//                             <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
//                                 <AlertCircle className="w-5 h-5 text-red-400" />
//                                 <p className="text-red-400 text-sm">{error}</p>
//                             </div>
//                         )}

//                         <form onSubmit={handleSubmit} className="space-y-5">
//                             <div>
//                                 <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
//                                     Full Name *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="name"
//                                     name="name"
//                                     required
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
//                                     placeholder="John Doe"
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                                     Email Address *
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     required
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
//                                     placeholder="john@example.com"
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
//                                     Subject *
//                                 </label>
//                                 <select
//                                     id="subject"
//                                     name="subject"
//                                     required
//                                     value={formData.subject}
//                                     onChange={handleChange}
//                                     className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
//                                 >
//                                     <option value="">Select a subject</option>
//                                     <option value="General Inquiry">General Inquiry</option>
//                                     <option value="Technical Support">Technical Support</option>
//                                     <option value="Calculator Request">Calculator Request</option>
//                                     <option value="Feedback">Feedback</option>
//                                     <option value="Business Collaboration">Business Collaboration</option>
//                                     <option value="Report an Issue">Report an Issue</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
//                                     Message *
//                                 </label>
//                                 <textarea
//                                     id="message"
//                                     name="message"
//                                     required
//                                     rows={5}
//                                     value={formData.message}
//                                     onChange={handleChange}
//                                     className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
//                                     placeholder="Tell us how we can help you..."
//                                 />
//                             </div>

//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {isSubmitting ? (
//                                     <>Sending...</>
//                                 ) : (
//                                     <>
//                                         Send Message
//                                         <Send size={18} />
//                                     </>
//                                 )}
//                             </button>
//                         </form>
//                     </div>

//                     {/* Map / FAQ Section */}
//                     <div className="space-y-6">
//                         {/* Map */}
//                         <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
//                             <h3 className="text-lg font-semibold text-white mb-3">Our Location</h3>
//                             <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
//                                 <iframe
//                                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.64329960238!2d72.74110159128612!3d19.08252233880275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1698765432109!5m2!1sen!2sin"
//                                     width="100%"
//                                     height="100%"
//                                     style={{ border: 0 }}
//                                     allowFullScreen
//                                     loading="lazy"
//                                     referrerPolicy="no-referrer-when-downgrade"
//                                     title="Numrexo Office Location"
//                                     className="w-full h-full"
//                                 ></iframe>
//                             </div>
//                             <p className="text-xs text-gray-500 mt-3">
//                                 Noida, Uttar Pradesh, India
//                             </p>
//                         </div>

//                         {/* Quick FAQ */}
//                         <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
//                             <h3 className="text-lg font-semibold text-white mb-3">Quick Answers</h3>
//                             <div className="space-y-3">
//                                 {faqs.map((faq, index) => (
//                                     <details key={index} className="group">
//                                         <summary className="flex items-center justify-between cursor-pointer text-sm text-gray-300 hover:text-blue-400 transition-colors">
//                                             {faq.q}
//                                             <span className="text-blue-400 group-open:rotate-180 transition-transform">▾</span>
//                                         </summary>
//                                         <p className="mt-2 text-xs text-gray-500 pl-2">{faq.a}</p>
//                                     </details>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Social Media Section */}
//                 <div className="bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-900/40 rounded-xl p-8 text-center">
//                     <h2 className="text-2xl font-semibold text-white mb-3">Connect With Us</h2>
//                     <p className="text-gray-400 text-sm mb-6">
//                         Follow us on social media for updates, tips, and new calculator announcements.
//                     </p>
//                     <div className="flex flex-wrap justify-center gap-4">
//                         {/* Facebook */}
//                         <a
//                             href="https://facebook.com/numrexo"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="w-11 h-11 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:scale-110"
//                             aria-label="Facebook"
//                         >
//                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
//                             </svg>
//                         </a>

//                         {/* X (Twitter) */}
//                         <a
//                             href="https://x.com/numrexo"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="w-11 h-11 rounded-full bg-black/20 border border-gray-600 flex items-center justify-center text-gray-300 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
//                             aria-label="X (Twitter)"
//                         >
//                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//                             </svg>
//                         </a>

//                         {/* LinkedIn */}
//                         <a
//                             href="https://linkedin.com/company/numrexo"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="w-11 h-11 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300 hover:scale-110"
//                             aria-label="LinkedIn"
//                         >
//                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
//                             </svg>
//                         </a>

//                         {/* Instagram */}
//                         <a
//                             href="https://instagram.com/numrexo"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-origin-border flex items-center justify-center text-white hover:scale-110 transition-all duration-300"
//                             aria-label="Instagram"
//                         >
//                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
//                             </svg>
//                         </a>

//                         {/* YouTube */}
//                         <a
//                             href="https://youtube.com/@numrexo"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="w-11 h-11 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/30 flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all duration-300 hover:scale-110"
//                             aria-label="YouTube"
//                         >
//                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
//                             </svg>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }





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

        try {
            // Send email using a service like EmailJS, Formspree, or your own API
            // Option 1: Using Formspree (free for up to 50 submissions/month)
            const response = await fetch("https://formspree.io/f/your-form-id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    _to: "numrexo@gmail.com",
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setFormData({ name: "", email: "", subject: "", message: "" });
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                throw new Error("Failed to send message");
            }
        } catch (err) {
            setError("Something went wrong. Please try again or email us directly at numrexo@gmail.com");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Alternative: Direct mailto fallback
    const handleDirectEmail = () => {
        const subject = encodeURIComponent(`Contact from ${formData.name || 'Visitor'} - ${formData.subject || 'General Inquiry'}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Subject: ${formData.subject}\n\n` +
            `Message:\n${formData.message}`
        );
        window.location.href = `mailto:numrexo@gmail.com?subject=${subject}&body=${body}`;
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            details: ["numrexo@gmail.com", "support@numrexo.com"],
            link: "mailto:numrexo@gmail.com",
        },
        // Call Us Section - Commented out (will be enabled when phone support is available)
        // {
        //     icon: Phone,
        //     title: "Call Us",
        //     details: ["+91 12345 67890", "+91 98765 43210"],
        //     link: "tel:+911234567890",
        // },
        {
            icon: MapPin,
            title: "Visit Us",
            details: ["Numrexo HQ", "Noida, Uttar Pradesh", "India - 201309"],
            link: "https://maps.google.com",
        },
        {
            icon: Clock,
            title: "Business Hours",
            details: ["Our support team is available 24 hours a day.", "7 days a week via email.", "We typically respond within 2-4 hours."],
        },
    ];

    const faqs = [
        {
            q: "How quickly do you respond?",
            a: "We typically respond within 24-48 hours on business days.",
        },
        {
            q: "Can I request a new calculator?",
            a: "Absolutely! We love hearing calculator ideas from our users. Just mention it in the message.",
        },
        {
            q: "Is there a direct email?",
            a: "Yes! You can email us directly at numrexo@gmail.com for any inquiries.",
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                                <button
                                    onClick={handleDirectEmail}
                                    className="ml-auto px-4 py-1.5 text-sm bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                                >
                                    Send via Email
                                </button>
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

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

                                <button
                                    type="button"
                                    onClick={handleDirectEmail}
                                    className="px-6 py-3 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-all"
                                >
                                    📧 Direct Email
                                </button>
                            </div>

                            <p className="text-xs text-gray-500 text-center mt-2">
                                Or email us directly at: <a href="mailto:numrexo@gmail.com" className="text-blue-400 hover:underline">numrexo@gmail.com</a>
                            </p>
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
                                Noida, Uttar Pradesh, India
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
                        {/* Facebook */}
                        <a
                            href="https://facebook.com/numrexo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="Facebook"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </a>

                        {/* X (Twitter) */}
                        <a
                            href="https://x.com/numrexo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-full bg-black/20 border border-gray-600 flex items-center justify-center text-gray-300 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                            aria-label="X (Twitter)"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://linkedin.com/company/numrexo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://instagram.com/numrexo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-origin-border flex items-center justify-center text-white hover:scale-110 transition-all duration-300"
                            aria-label="Instagram"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a
                            href="https://youtube.com/@numrexo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/30 flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="YouTube"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}