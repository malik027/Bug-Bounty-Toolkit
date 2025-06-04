import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ email: '', message: '' });
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions, suggestions, or just want to connect? Feel free to reach out. I’m always open to discussions about security, bug bounty, or collaborations. Drop your message below and I’ll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          {isSubmitted ? (
            <div className="bg-green-900/50 border border-green-700 text-green-100 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p>Thank you for your message. We'll get back to you soon.</p>
            </div>
          ) : (
            <form action="https://formspree.io/f/mblovwal" method="POST" className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Your Email
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="youremail@example.com"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Your message here..."
                />
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;