import { prisma } from "../../lib/prisma";
import React from "react";
import { GetServerSideProps } from "next";
import { ProjectProps } from "../../components/Layout/ProjectCard";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const project_id = ctx.query.id;
  const proj_id_num: number = +project_id;
  const project = await prisma.project.findUnique({
    where: {
        id: proj_id_num 
    },
  });
  return {
    props: { project },
  };
};

const Project: React.FC<ProjectProps> = (props) => {
    return (
        <div>
            {
                <>
                <p>Title: {props.project.title}</p>
                <p>Description: {props.project.description}</p>
                <p>min_investment: {props.project.min_amt}</p>
                <p>cap_amt: {props.project.cap_amt}</p>
                <p>raised_amt: {props.project.raise_amt}</p>
                <p>Business model: {props.project.busi_model}</p>
                </>
            }
            <button></button>
        </div>
    )
};

export default Project;
