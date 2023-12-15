"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import CustomImage from "@/components/Image/CustomImage";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";


interface CharacterCardProps {
  id: number;
  photoUrl: string;
  name: string;
  description?: string;
}

const CharacterCard = ({ photoUrl, name, description }: CharacterCardProps) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 4,
        }}
      >
        <CustomImage
          className="mx-auto"
          src={photoUrl}
          variant="large"
          alt={name}
        />
        <Typography className="mt-5" gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
