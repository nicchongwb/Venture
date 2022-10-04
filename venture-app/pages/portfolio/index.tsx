import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab"
import { useState } from "react";
import useUser from "../../lib/useUser";
import { GetServerSideProps, NextPage } from "next";
import {prisma} from '../../lib/prisma';
import ProjectTable from "../../components/Layout/ProjectTable";
import InvestmentTable from "../../components/Layout/InvestmentTable";
import { ProjectProps } from "../../components/Layout/ProjectCard";
import { withIronSessionApiRoute } from "iron-session/next";
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'

 
export const getServerSideProps = withIronSessionSsr(async function ({ req, res,}) {
    const user = req.session.user
  
    if (user === undefined) {
      res.setHeader('location', '/login')
      res.statusCode = 302
      res.end()
      return {
        props: {
          user: { isLoggedIn: false, login: '', avatarUrl: '' } as User,
        },
      }
    }else{
       //prisma query here
        const myProjects = await prisma.project.findMany({
            where: {
                email: user?.email ,
            },
        });
        const investedProjectId = await prisma.user.findUnique({
            where: {
                email: user?.email,
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
  
   
  },
  sessionOptions)


  
type Props = {
    myProjects: ProjectProps[],
    myInvestments: ProjectProps[]
}
   
const Portfolio: React.FC<Props> = (props) => {

    const [value, setValue] = useState("1");
  
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { user, mutateUser } = useUser();


    if (user?.isLoggedIn  === true) {
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
      else{
        return (
            <div>
              <h1>My Projects</h1>
              <div>You need to be authenticated to view this page.</div>
            </div>
              
      
          );
      }

      
  
 
}
export default Portfolio