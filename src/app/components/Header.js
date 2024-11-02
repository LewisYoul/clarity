import Link from 'next/link';

export default function Header() {

  const navigation = [
    { name: 'FAQs', href: '#faq' },
    // { name: 'Features', href: '#' },
    // { name: 'Marketplace', href: '#' },
    // { name: 'Company', href: '#' },
  ]

  return (
    <header className="">
    <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img
            className="h-10 w-auto"
            src="/logo.svg"
            alt=""
          />
        </a>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-400">
            {item.name}
          </a>
        ))}
      </div>
      <div className="lg:flex lg:flex-1 lg:justify-end">
        <Link href="/sign-in" className="inline-flex mr-2 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Log in
        </Link>
        <Link
          href="/sign-up"
          className="inline-flex bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-palqrblue ring-1 ring-inset ring-palqrblue"
        >
          Sign Up  
        </Link>
      </div>
    </nav>
  </header>
  )
}