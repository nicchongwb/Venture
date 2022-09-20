import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab"
import { useState } from "react";
import {getSession, useSession} from 'next-auth/react'
import { GetServerSideProps, NextPage } from "next";
import {prisma} from '../../lib/prisma';
import ProjectTable from "../../components/Layout/ProjectTable";
import InvestmentTable from "../../components/Layout/InvestmentTable";
import { ProjectProps } from "../../components/Layout/ProjectCard";

 

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    let headers = {}
    const session = await getSession({req})
    let data = {}
    if (session) {
        headers = {Authorization: `${session.user?.email}`}
        console.log(headers.Authorization)

       //prisma query here
        const myProjects = await prisma.project.findMany({
            where: {
                email: session.user?.email ,
            },
        });
        const investedProjectId = await prisma.user.findUnique({
            where: {
                email: session.user?.email,
            },
            select:{
                investedProjects: true,
            }
            
        });
        const myInvestments = await prisma.project.findMany({
            where: {
               id: { in: investedProjectId?.investedProjects }
            },
        });
        //console.log(myInvestments )
        return {
            props: { myProjects, myInvestments },
        };
    }

    return {
        props: { myProjects: [] , myInvestments: [] }
    }
    // if (!session) {
    //   return { props: { myprojects: [] } };
    // }
  
    // const myprojects = await prisma.project.findMany({
    //   where: {
    //     email: session.user?.email ,
    //   },
    // });
    // return {
    //   props: { myprojects },
    // };
};
  
type Props = {
    myProjects: ProjectProps[],
    myInvestments: ProjectProps[]
}
   
const Portfolio: React.FC<Props> = (props) => {

    const [value, setValue] = useState("1");
  
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const {data: session, status} = useSession()

    if (!session) {
        return (
          <div>
            <h1>My Projects</h1>
            <div>You need to be authenticated to view this page.</div>
          </div>
            
    
        );
      }


  
    return(
        <div>
           
            <TabContext  value={value}>
                <Box  sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList className="m-6" onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Projects" value="1" />
                        <Tab label="Investments" value="2" />
                    </TabList>
                </Box>
                
                <TabPanel value="1">
         
                      <ProjectTable projects={props.myProjects}/>

                </TabPanel>
                <TabPanel value="2">
                      <InvestmentTable projects={props.myInvestments}/>
                </TabPanel>
            </TabContext>
           
                
        </div>
            
  
    )
   
}
export default Portfolio