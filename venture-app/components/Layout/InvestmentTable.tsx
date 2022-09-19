import React from 'react'
import { NextPage } from 'next'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProjectProps } from '../Layout/ProjectCard';
import router from 'next/router';



type Props = {
  projects: ProjectProps[]
}
 

const InvestmentTable: React.FC<Props> = ({ projects }) => {

  
  
    return (
        <div className="container max-w-7xl mx-auto mt-8">
          <div className="mb-4">
            <h1 className="font-serif text-3xl font-bold underline decoration-gray-400">My Investments</h1>
            <div className="flex justify-end">
            <button className="px-4 py-2 rounded-md  hover:bg-indigo-400 bg-indigo-600 sm:text-base xl:text-lg text-white" onClick={() => router.push("/invest")} >Create Project</button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      
                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Title</th>
                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Description</th>

                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Raised Amount</th>

                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Project Owner</th>
                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Closing Date</th>
                    </tr>
                  </thead>
        
                  <tbody className="bg-white">
               
                  {projects.map((project : ProjectProps) => (
                    <tr>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-900">{project.title}
                        </div>
                      </td>
        
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p>{project.description}.</p>
                      </td>

                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                        {project.raise_amt}
                        </div>
        
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p>{project.user?.email}.</p>
                      </td>
        

                      <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        <span>{project.closingDate.toString()}</span>
                      </td>
        
                    
                    </tr>
                     ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

    )
}

export default InvestmentTable;