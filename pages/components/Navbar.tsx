import Image from 'next/image';
import Link from 'next/link';
import CartIcon from './CartIcon';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import React from "react";

interface NavbarProps {
  setDataUser: Dispatch<SetStateAction<any>>
}

const Navbar = ({setDataUser}:NavbarProps) => {
  //   const { data, status }: { data: any; status: string } = useSession();
  const session: any = useSession();
    // console.log(session);

  const [showColourPalette, setShowColourPalette] = useState(false);

  const toggleColourPalette = () => {
    console.log('clicked')
    setShowColourPalette(!showColourPalette);
    console.log(showColourPalette);
  }

  useEffect(() => {
    if (session) {
      if (session.data) {
        if (session.data.user) {
          setDataUser(session.data.user);
        }
      }
    }
  }, [setDataUser, session]);

  return (
    <>
      <nav className="navbar bg-neutral text-neutral-content">
        <div className="flex justify-between w-full mx-1 md:mx-9 gap-2">
          <div className="hidden md:block">
            <Link href={'/'} className="btn btn-ghost text-xl">
              Srikandi
            </Link>
          </div>
          <div className="grow relative">
            <input
              type="text"
              placeholder="nama produk"
              className="input input-bordered w-full text-neutral"
            />
            <button className="rounded-full p-2 absolute right-1 top-1 shadow text-neutral">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
          <div className="flex gap-1 md:gap-2">
            <CartIcon></CartIcon>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-neutral">
                {session ? (
                  <>
                    {session.status === 'authenticated' ? (
                      <>
                        <li>
                          <span>Hi, {session.data.user.fullname}</span>
                        </li>
                        <li>
                          <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                          </a>
                        </li>
                        <li>
                          <a>Settings</a>
                        </li>
                        <li>
                          <button type="button" onClick={() => signOut()}>
                            Sign out
                          </button>
                        </li>
                      </>
                    ) : (
                      <li>
                        <button
                          type="button"
                          onClick={() => signIn()}
                          className="text-neutral"
                        >
                          Sign in
                        </button>
                      </li>
                    )}
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        type="button"
                        onClick={() => signIn()}
                        className="text-neutral"
                      >
                        Sign in
                      </button>
                    </li>
                  </>
                )}
                <li>
                  <button
                    type="button"
                    onClick={() => setShowColourPalette(!showColourPalette)}
                    className="text-neutral"
                  >
                    Toggle Colour Palette
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {showColourPalette &&
      <div className='mt-1 grid grid-cols-3 gap-1'>
        <button className='btn btn-xs btn-primary'>primary</button>
        <button className='btn btn-xs btn-secondary'>secondary</button>
        <button className='btn btn-xs btn-accent'>accent</button>
        <button className='btn btn-xs btn-success'>success</button>
        <button className='btn btn-xs btn-info'>info</button>
        <button className='btn btn-xs btn-warning'>warning</button>
        <button className='btn btn-xs btn-disabled'>disabled</button>
        <button className='btn btn-xs btn-square'>square</button>
        <button className='btn btn-xs btn-circle'>circle</button>
        <button className='btn btn-xs btn-ghost'>ghost</button>
        <button className='btn btn-xs btn-link'>link</button>
        <button className='btn btn-xs btn-outline'>outline</button>
      </div>
      }
    </>
  );
};

export default Navbar;
