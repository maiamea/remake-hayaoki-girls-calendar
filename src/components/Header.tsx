import Link from 'next/link'
import { useState } from 'react'

export const Header = () => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const handleMenuOpen = () => {
    setOpen(!isOpen)
  }

  const handleMenuClose = () => {
    setOpen(false)
  }

  return (
    <>
      <header className="relative flex justify-between items-center bg-orange-300">
        <h1 className="pt-3 ml-3 mb-3 text-4xl font-extrabold text-gray-50">
          hayaoki_girls <br className="md:hidden" />
          カレンダー
        </h1>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleMenuOpen}
          />
        )}

        <nav
          className={
            isOpen
              ? 'z-50 bg-orange-50	 fixed top-0 right-0 bottom-0 left-15 h-screen flex flex-col'
              : 'fixed right-[-100%] md:right-4' // ハンバーガーメニュー閉じてる時
          }
        >
          <ul
            className={
              isOpen
                ? 'flex h-screen justify-center items-center flex-col gap-6 text-xl p-3'
                : 'block md:flex md:gap-8'
            }
          >
            <li>
              <Link onClick={handleMenuClose} href="/about">
                hayaoki_girls カレンダーとは
              </Link>
            </li>
            <li>
              <Link onClick={handleMenuClose} href="/how-to-use">
                使い方ガイド
              </Link>
            </li>
          </ul>
        </nav>

        {/* ハンバーガーメニュー */}
        <button
          className="z-50 space-y-1.5 md:hidden mr-3"
          onClick={handleMenuOpen}
        >
          <span
            className={
              isOpen
                ? 'block w-8 h-0.5 bg-gray-600 translate-y-0.5 rotate-45 duration-300'
                : 'block w-8 h-0.5 bg-gray-600 duration-300'
            }
          />
          <span
            className={
              isOpen
                ? 'block opacity-0 duration-300'
                : 'block w-8 h-0.5 bg-gray-600 duration-300'
            }
          />
          <span
            className={
              isOpen
                ? 'block w-8 h-0.5 bg-gray-600 -translate-y-1.5 -rotate-45 duration-300'
                : 'block w-8 h-0.5 bg-gray-600 duration-300'
            }
          />
        </button>
      </header>
      <hr className="h-px mt-0 mb-3 bg-gray-200" />
    </>
  )
}
