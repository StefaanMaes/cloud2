
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const prompt = `Je bent een KMO-klant met 20 medewerkers die hun gsm gebruiken voor zowel werk als privé. Ze willen controle over hun professionele bereikbaarheid. De deelnemer gaat je vragen stellen volgens het Sellogram-model. Beantwoord als klant. Daarna geef feedback op zijn aanpak volgens: opinievragen, pijnvragen, impactvragen, timing voorstel.`;

    const conversation = `${prompt}\n\nDeelnemer: ${userInput}\n\nGeef feedback en een score op 40.`;

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: conversation }),
    });

    const data = await response.json();
    setAiResponse(data.reply);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="mb-4">
        <CardContent className="space-y-2">
          <h2 className="text-xl font-semibold">Sellogram AI Trainer</h2>
          <p className="text-sm text-muted-foreground">
            Voer hieronder jouw gesprek in met de AI-klant (min. 6 vragen). Klik dan op "Feedback vragen" om tips en een score te ontvangen.
          </p>
          <Textarea
            rows={10}
            placeholder="Typ hier je vragen zoals je die aan de klant zou stellen..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Bezig..." : "Feedback vragen"}
          </Button>
        </CardContent>
      </Card>

      {aiResponse && (
        <Card>
          <CardContent className="space-y-2">
            <h3 className="text-lg font-semibold">Feedback van de AI-klant</h3>
            <pre className="whitespace-pre-wrap text-sm">{aiResponse}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
