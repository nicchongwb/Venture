import {prisma} from '../../lib/prisma'
import {GetStaticProps} from 'next'

export const getStaticProps: GetStaticProps = async () => {
    const projects = await prisma.project.findMany();
    return {
        props: { projects },
        revalidate: 10
    }
}