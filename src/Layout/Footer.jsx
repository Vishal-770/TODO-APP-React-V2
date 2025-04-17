import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between">
          {/* Logo and description */}
          <div className="mb-8 md:mb-0">
            <NavLink to="/" className="flex items-center" end>
              <svg
                className="h-6 w-6 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span className="ml-2 text-lg font-semibold text-gray-800">
                TodoApp
              </span>
            </NavLink>
            <p className="mt-2 text-sm text-gray-600 max-w-xs">
              Your productive task management solution. Get things done
              efficiently.
            </p>
          </div>

          {/* Footer navigation */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">
                Navigation
              </h3>
              <div className="mt-4 space-y-2">
                <NavLink
                  to="/tasks"
                  className={({ isActive }) =>
                    `text-sm ${
                      isActive
                        ? "text-indigo-600"
                        : "text-gray-600 hover:text-indigo-600"
                    }`
                  }
                >
                  Tasks
                </NavLink>
                <NavLink
                  to="/completed"
                  className={({ isActive }) =>
                    `block text-sm ${
                      isActive
                        ? "text-indigo-600"
                        : "text-gray-600 hover:text-indigo-600"
                    }`
                  }
                >
                  Completed
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `block text-sm ${
                      isActive
                        ? "text-indigo-600"
                        : "text-gray-600 hover:text-indigo-600"
                    }`
                  }
                >
                  Profile
                </NavLink>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">
                Legal
              </h3>
              <div className="mt-4 space-y-2">
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-indigo-600 block"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-indigo-600 block"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-indigo-600 block"
                >
                  Cookie Policy
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">
                Connect
              </h3>
              <div className="mt-4 space-y-2">
                <a
                  href="https://www.linkedin.com/in/vishal-prabhu-130b1a323/"
                  className="text-sm text-gray-600 hover:text-indigo-600 block"
                >
                  Contact Us
                </a>
                <a
                  href="https://www.linkedin.com/in/vishal-prabhu-130b1a323/"
                  className="text-sm text-gray-600 hover:text-indigo-600 block"
                >
                  Twitter
                </a>
                <a
                  href="https://github.com/Vishal-770"
                  className="text-sm text-gray-600 hover:text-indigo-600 block"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 md:flex md:items-center md:justify-between">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} TodoApp. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
