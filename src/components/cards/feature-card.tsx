import { FC } from "react";
import { Card, CardContent } from "../ui/card"

interface FeatureCardProps {
  feature: {
    description: string;
    title: string;
    icon: React.ReactNode
  }
}

const FeatureCard: FC<FeatureCardProps> = ({ feature }) => {
  return (
    <Card
      className="items-center text-center justify-evenly gap-2 p-6 transition-all border border-muted hover:border-primary/40"
    >
      <div className="md:p-4 p-3 rounded-full bg-primary/10 text-primary">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold">{feature.title}</h3>
      <CardContent className="text-muted-foreground p-0">
        <p>{feature.description}</p>
      </CardContent>
    </Card>)
}

export default FeatureCard