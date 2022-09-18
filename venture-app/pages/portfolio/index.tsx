import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab"
import type { NextPage } from "next";
import { useState } from "react";
import ProjectTable from "../../components/Layout/projecttable";

   
const Portfolio:NextPage  = () => {

    const [value, setValue] = useState("1");
  
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


  
    return(
        <div>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Projects" value="1" />
                    <Tab label="Investments" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1"> <ProjectTable/></TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
           
                
        </div>
            
  
    )
   
}
export default Portfolio