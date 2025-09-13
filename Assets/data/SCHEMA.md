Data Schemas

This project uses simple JSON files under `Assets/data/`.

episodes.json
- id: string (e.g., "s14e03")
- season: number
- episode: number
- title: string
- synopsis: string (optional)
- tags: string[] (optional)
- characters: string[] (character names or ids, optional)
- locations: string[] (location names or ids, optional)
- airDate: string (YYYY-MM-DD, optional)

organizations.json
- id: string
- name: string
- type: string (e.g., "Business", "Superhero team")
- members: string[] (character names)
- firstAppearance: string (episode id, optional)
- notes: string (optional)

quotes.json
- id: string
- text: string
- speakers: string[] (character names)
- episodeId: string (episode id, optional)
- timestamp: string (HH:MM:SS, optional)
- tags: string[] (optional)

timeline.json
- id: string
- date: string (YYYY-MM-DD)
- title: string
- description: string (optional)
- episodeId: string (episode id, optional)
- tags: string[] (optional)

characters.json
- id: string
- name: string
- aliases: string[] (optional)
- bio: string (optional)
- tags: string[] (optional)
- homeLocation: string (optional)
- firstAppearance: string (episode id, optional)

locations.json
- id: string
- name: string
- type: string
- description: string (optional)
- tags: string[] (optional)
- address: string (optional)

