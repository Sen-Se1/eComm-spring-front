"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect,useState } from 'react'

const Header = () => {
  const router = useRouter();


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="dark:bg-neutral-600">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <img className="h-8 w-auto" src="/logo.jpg" alt="Your Logo" />
            </div>

            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {isLoggedIn && (
                  <>
                    <Link href="/" className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Home
                    </Link>
                    <Link href="/profile" className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Profile
                    </Link>
                    <Link href="/card" className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Card
                    </Link>
                    <Link href="/command" className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Command
                    </Link>
                    <button onClick={handleLogout} className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Logout
                    </button>
                  </>
                )}
                {!isLoggedIn && (
                  <>
                    <Link href="/login" className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Login
                    </Link>
                    <Link href="/register" className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isLoggedIn && (
            <>
              <Link href="/" className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <Link href="/profile" className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                profile
              </Link>
              <Link href="/card" className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Card
              </Link>
              <Link href="/command" className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Command
              </Link>
              <button onClick={handleLogout} className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Logout
              </button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link href="/login" className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Login
              </Link>
              <Link href="/register" className="text-gray-300 hover:dark:bg-neutral-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
