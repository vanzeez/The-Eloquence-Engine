# The Eloquence Engine

Tired of Gen Z mutterings that resemble code more than conversation? Fear not. The Eloquence Engine is here to Victorianise your digital despair.

**Built with MCP-inspired architecture, enabling future-ready tool integration and clean modular LLM workflows.**

## What Is This?

A web-based contraption that transmutes your most chaotic, slang-laden expressions into eloquence befitting a candlelit salon in Her Majesty's court. Cast your acronyms, abbreviations, and emotional outbursts into the box, and out shall emerge prose laced with wit, lace, and passive-aggressive grandeur.

## Features

- **Victorian Rephrasing**: Transforms slang, text-speak, and unholy acronyms into theatrical Victorian sass.
- **Aesthetic Interface**: As visually refined as the language it wields.
- **Responsive Design**: Operates flawlessly across screens, whether you're browsing from your study or chamber pot.
- **Sound Fanfare**: A trumpet salute to honour the rebirth of your words.

## Usage

1. Clone this repository and install dependencies:
   ```bash
   git clone https://github.com/vanzeez/The-Eloquence-Engine.git
   cd The-Eloquence-Engine
   npm install
   ```

2. **Get your OpenRouter API key** from [OpenRouter](https://openrouter.ai/) and **do NOT commit it to the repo**.

3. When deploying to Vercel, add your API key as an environment variable:
   - Key: `VITE_OPENROUTER_KEY`
   - Value: (your real API key)
   - In local development, create a `.env.local` file:
     ```env
     VITE_OPENROUTER_KEY=your_openrouter_api_key_here
     ```

4. Start the engine locally:
   ```bash
   npm run dev
   ```

5. Visit [http://localhost:5173](http://localhost:5173) or whatever port your terminal reveals.

## Deployment

Deploy with grace to [Vercel](https://vercel.com/) (recommended) or Netlify. Configuration files (`vercel.json`, `netlify.toml`) are provided. 

## Customization

- Adjust color schemes, fonts, and spacing in `tailwind.config.ts` to reflect your family crest.
- Modify the transformation logic or wit level in `src/prompts/victorian_prompt.ts`.

## License

MIT - Use freely, remix generously, and distribute nobly. Just remember to uphold the honour of a true Victorian gentleperson while doing so.

---
