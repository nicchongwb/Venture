import React from "react";
import Router from "next/router";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export type ProjectProps = {
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
    userId: string
}

const ProjectCard: React.FC<{ project: ProjectProps }> = ({ project }) => {
    const projectOwner = project.user ? project.user.name : "No owner";
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image="../public/placeholder_image.png"
                alt="test image placeholder"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {project.description}
                    </Typography>
                    
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                LEARN MORE
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProjectCard;