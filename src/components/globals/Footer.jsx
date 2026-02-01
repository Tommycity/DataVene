import React from 'react'
import { footerData } from '../../data/home/footer'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
         <footer className="bg-black mt-[80px] py-4 px-[188px] text-[#EAEAEA] flex flex-col gap-[20px]">
        <div className="flex justify-between">
          <div className="flex gap-[20px]">
            {footerData?.map((item, i) => (
              <Link key={i} to={item.url} className="text-lg hover:underline">
                {item.socialmedia}
              </Link>
            ))}
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer hover:underline"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <img
              src="/public/images/arrow-up-2.png"
              alt="to the top"
              className="h-[16px]"
            />

            <span className="text-lg">Back to top</span>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <span>© 2026 DataVene. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}

export default Footer