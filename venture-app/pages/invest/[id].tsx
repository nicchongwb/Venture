import { prisma } from "../../lib/prisma";
import React from "react";
import { GetServerSideProps } from "next";
import { ProjectProps } from "../../components/Layout/ProjectCard";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/Layout/CheckoutForm";
import {useSession} from 'next-auth/react'
import Image from 'next/image'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const project_id = ctx.query.id;
  const proj_id_num: number = +project_id;
  const project = await prisma.project.findUnique({
    where: {
      id: proj_id_num,
    },
  });
  return {
    props: { project, proj_id_num },
  };
};

const Project: React.FC<ProjectProps> = (props) => {
  const {data: session} = useSession()
  return (
    <div className="container mx-auto  px-4">
      <div className="mx-auto my-16 box-content min-h-fit w-5/6 p-8 shadow-lg shadow-indigo-500/50 ">
        <div>
          {
            <>
            <h2 className="pt-10 pb-4 px-4 text-3xl font-bold mr-4 sm:text-4xl">Title: {props.project.title}</h2>
            <div className="grid grid-cols-3 gap-16 py-0 px-10">
              <div className="col-span-2">
              <h3 className=" font-bold text-lg mr-4 sm:text-xl">Amount Raised: {props.project.raise_amt}</h3>
                <p><div className="text-lg font-bold">Description:</div> {props.project.description}</p>
                <p><div className="text-lg font-bold ">Business Model:</div> {props.project.busi_model}</p>
                <p><div className="text-lg font-bold">Highlights:</div> {props.project.highlights}</p>
              </div>
              <div >
            <div>
            <img className="pb-10"src={props.project.image} alt="GFG logo imported from public directory" />
              <br/>  
              <CheckoutForm id={props.proj_id_num} userEmail={session.user.email}/>
             </div>
            </div>

            </div>
              
              

        
              
            </>
          }
          
        </div>
      </div>
      
    </div>
  );
};

export default Project;
