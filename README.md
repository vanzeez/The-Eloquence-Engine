# The Eloquence Engine

Tired of Gen Z mutterings that resemble code more than conversation? Fear not. The Eloquence Engine is here to Victorianise your digital despair.

**Built with MCP-inspired architecture, enabling future-ready tool integration and clean modular LLM workflows.**

## What Is This?

A web-based LLM playground built to demonstrate how prompt pipelines, modular role-based reasoning, and agentic design patterns can be used to create functional, humorous, and layered interactions with language models.

Inspired by Anthropic’s Model Context Protocol (MCP), this architecture simulates a lightweight, MCP-aligned agent pipeline — without requiring full orchestration frameworks like LangChain or LangGraph.

## Features

- **Two-Layer Prompt Pipeline**:
Translator → Eloquence Refiner: A structured reasoning chain to first interpret slang, then elevate tone.
- **Victorian Rephrasing**: Transforms slang, text-speak, and unholy acronyms into theatrical Victorian sass.
- **Aesthetic Interface**: As visually refined as the language it wields.
- **Responsive Design**: Operates flawlessly across screens, whether you're browsing from your study or chamber pot.
- **Forward-Compatible Design**: Designed with future tool-calling and memory integration in mind (via OpenRouter + Mistral AI).
- **Sound Fanfare**: A trumpet salute to honour the rebirth of your words.

## How It Works

**This project simulates agentic behavior using structured prompt engineering:**

Your input is passed to a two-layer LLM pipeline:
- **Layer 1:** Translator Agent: converts slang to neutral English.
- **Layer 2:** Eloquence Agent: transforms it into sarcastic Victorian prose.

These prompts are composed using persona-driven instructions, sent via OpenRouter to Mistral AI, with clear role segmentation and clean fallback/error handling.
The client (React app) serves as a minimalistic MCP-style UI, separating interaction logic from LLM orchestration.
It’s not a full agentic system yet, but the architecture mimics many MCP principles such as modular prompt units, chain-of-thought refinement, and future-ready tool compatibility.

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
