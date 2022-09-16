import { prisma } from "../../lib/prisma";
import React from "react";
import { GetServerSideProps } from "next";
import { ProjectProps } from "../../components/Layout/ProjectCard";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const project_id = ctx.query.id;
  const project = await prisma.project.findUnique({
    where: {
      project_id: project_id,
    },
  });
  return {
    props: { project },
    revalidate: 10,
  };
};

/**
 * 
 * @param props export type ProjectProps = {
  project_id: string;
  title: string;
  description: string;
  raise_amt: number;
  min_amt: number;
  cap_amt: number;
  highlights: string;
  busi_model: string;
  image: string;
  closingDate: Date;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    email: string;
  } | null;
  userId: string;
};
 */

const Project: React.FC<ProjectProps> = (props) => {
    return (
        <div>
            Project details, no styling at all geezus
            {
                <>
                <p>Title: {props.title}</p>
                <p>Description: {props.description}</p>
                <p>min_investment: {props.min_amt}</p>
                <p>cap_amt: {props.cap_amt}</p>
                <p>raised_amt: {props.raise_amt}</p>
                <p>Business model: {props.busi_model}</p>
                <p>Owner: {props.user.name}</p>
                </>
            }
        </div>
    )
};

export default Project;
