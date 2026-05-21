"use client";

export default function Contact() {
  return (
    <footer id="contact" className="bg-gray-50 pt-20 pb-10 border-t border-gray-200 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">Connect with <span className="text-blue-primary">FNAIR</span></h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Have questions about the Founding Cohort or our initiative? Reach out to our coordination team.
            </p>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-primary">@</span>
                <span className="font-medium">contact@fnair.org</span>
              </p>
              <p className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-primary">📍</span>
                <span className="font-medium">Interdisciplinary Virtual Network</span>
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-black mb-6">Send an Inquiry</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-colors placeholder:text-gray-400" />
                <input type="email" placeholder="Email" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-colors placeholder:text-gray-400" />
              </div>
              <textarea placeholder="Your message..." rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-colors resize-none placeholder:text-gray-400"></textarea>
              <button type="button" className="w-full bg-blue-primary text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md">
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Frontier Nexus for Academic and Interdisciplinary Research.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
