import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Character } from "../types";

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <Card sx={{ width: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={character?.image}
          alt={character?.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {character?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {character?.species}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" fullWidth>
          See more details...
        </Button>
      </CardActions>
    </Card>
  );
}
