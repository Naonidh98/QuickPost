import React from "react";

import { CTNbutton } from "../components/core/Home/CTNbutton";
import { CTN2button } from "../components/core/Home/CTN2button";
import { Circle } from "../components/core/Home/Circle";

import { Link } from "react-router-dom";

import client_img from "../assets/clients_img.png";
import comment_img from "../assets/comm.png";
import edu_img from "../assets/edu.png";
import { useSelector } from "react-redux";

export const Home = () => {
  const { dark_mode } = useSelector((state) => state.darkmode);
  console.log("darkmode : ", dark_mode);
  return (
    <div
      className={` ${dark_mode ? "text-white" : "text-black"} relative z-10`}
    >
      {/*wrapper*/}
      <div className="w-[94%] xl:w-[1260px] mx-auto relative z-40">
        <Link to={"/login"}>
          <div className="mt-[68px] mb-[35px]">
            <CTNbutton title={"Let's kick off this epic journey!"} />
          </div>
        </Link>

        <h2 className="text-center font-poppins text-2xl py-2">QuickPost</h2>
        <h1 className="text-center font-poppins text-6xl font-bold pb-8">
          Social Network
        </h1>

        <p
          className={`w-[75%] mx-auto  text-center font-inter text-md ${
            dark_mode ? "text-puregreys-50" : "text-puregreys-500"
          }`}
        >
          Words, whether spoken or written, appeal to others in a way that no
          other medium of communication can. Look at your own lives. You will
          say and hear more than a thousand words in a day, but retain only a
          few that stand out. That is how human psychology works. The human
          brain can process up to 700 words per minute but can retain only
          seven!
        </p>

        <div className="flex justify-center gap-8 p-4">
          <Link to={"/about"}>
            <div>
              <CTN2button
                title={"Learn more"}
                bg={"bg-[#FFD60A]"}
                text={"text-black"}
              />
            </div>
          </Link>

          <Link to={"/login"}>
            <div>
              <CTN2button
                title={"Login"}
                bg={dark_mode ? "bg-[#ffff]" : "bg-[#161D29]"}
                text={dark_mode ? "text-[#161D29]" : "text-white"}
                ico={true}
              />
            </div>
          </Link>
        </div>

        {/*Todo : Make a specific comp*/}
        {/*
        <div className="absolute -top-[8%] -right-[8%]">
          <div className="relative">
            <Circle
              width={"w-[250px]"}
              height={"h-[250px]"}
              from={"#62cff4"}
              to={"#2c67f2"}
              zindex={"z-30"}
            />
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-40 bg-white w-[150px] h-[150px] rounded-full"></div>
          </div>
        </div>
        */}

        {/*Chat section*/}
        <div className="my-12 flex flex-col-reverse  gap-4 xl:flex-row justify-between items-center">
          <div className="xl:w-[45%]">
            <h2 className="font-poppins text-3xl font-bold text-center xl:text-left">
              Forge bonds and thrive with your community!
            </h2>
            <p className="font-inter mt-2 text-center xl:text-left">
              Unlock the true potential of togetherness by forging bonds and
              thriving with your community! At the heart of every thriving
              society lies a strong, interconnected community where individuals
              support, inspire, and uplift one another. Whether you're looking
              to share ideas, collaborate on projects, or simply find a sense of
              belonging, our platform is designed to help you connect, engage,
              and grow. Dive in and discover the power of unity, where every
              connection made enriches lives and builds a brighter, more
              cohesive future. Join us today and start forging lasting bonds
              with your community!
            </p>
          </div>
          <div className="xl:w-[48%]">
            <img src={client_img} alt="client-img" />
          </div>
        </div>

        {/* Comm section */}
        <div className="my-12 flex flex-col gap-4 xl:flex-row justify-between items-center">
          <div className="xl:w-[45%]">
            <img src={comment_img} alt="comment-img" />
          </div>
          <div className="xl:w-[48%]">
            <h2 className="font-poppins text-3xl font-bold text-center xl:text-left">
              Raise your voice and share your ideas and suggestions!
            </h2>
            <p className="font-inter mt-2 text-center xl:text-left">
              Raise your voice and share your thoughts and suggestions! Your
              unique perspectives and innovative ideas are invaluable in shaping
              our vibrant community. Whether it's feedback on improving
              services, fresh concepts for new initiatives, or simply voicing
              your concerns, we are here to listen and collaborate. Together, we
              can drive meaningful change and create an inclusive space where
              everyone feels heard and valued.
            </p>
          </div>
        </div>

        {/* Edu section */}
        <div className="my-12 flex flex-col gap-4 xl:flex-row justify-between items-center">
          <div className="xl:w-[43%]">
            <h2 className="font-poppins text-3xl font-bold text-center xl:text-left">
              Enhance education and ignite minds!
            </h2>
            <p className="font-inter mt-2 text-center xl:text-left">
              Enhance education and ignite minds with our innovative approach to
              learning! We believe that education should be dynamic, engaging,
              and accessible to everyone. Our programs are designed to inspire
              curiosity, foster creativity, and develop critical thinking
              skills. By leveraging cutting-edge technology and interactive
              teaching methods, we create an environment where students can
              thrive and reach their full potential. Join us in revolutionizing
              education and empowering the next generation of thinkers and
              leaders!
            </p>
          </div>
          <div className="xl:w-[48%]">
            <img src={edu_img} alt="edu-img" />
          </div>
        </div>

        {/*features section*/}

        {/* slider*/}

        {/*contact*/}
      </div>
    </div>
  );
};
