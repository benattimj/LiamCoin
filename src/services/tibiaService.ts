export interface CharacterResponse {
  character: {
    character: {
      name: string;
      level: number;
      vocation: string;
      world: string;
    };
  };
}

export async function checkCharacterExists(name: string): Promise<CharacterResponse['character']['character'] | null> {
  try {
    const response = await fetch(`https://api.tibiadata.com/v4/character/${encodeURIComponent(name)}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    
    // TibiaData v4 returns an empty name if the character doesn't exist
    if (!data.character?.character?.name) {
      return null;
    }
    
    return data.character.character;
  } catch (error) {
    console.error("Error fetching character data:", error);
    return null;
  }
}
