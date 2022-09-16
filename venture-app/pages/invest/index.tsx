import {prisma} from '../../lib/prisma'
import {GetStaticProps} from 'next'
import React from 'react';
import { ProjectProps } from '../../components/Layout/ProjectCard';
import ProjectCard from '../../components/Layout/ProjectCard';

export const getStaticProps: GetStaticProps = async () => {
    const projects = await prisma.project.findMany();
    return {
        props: { projects },
        revalidate: 10
    }
}

type Props = {
    projects: ProjectProps[]
}
const Invest: React.FC<Props> = (props) => {
    return (
        <div>
            {props.projects.map((project) => (
                <div key={project.project_id}>
                    <ProjectCard project={project}/>
                </div>
            ))}
        </div>
    )
}

export default Invest;