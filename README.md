# Prompt Wizard Studio

A modern web application for testing, refining, and experimenting with OpenAI language models. Perfect for prompt engineers, developers, and AI enthusiasts.

## Features

- **Interactive Prompt Testing**: Design, send, and analyze responses from OpenAI's language models
- **Parameter Control**: Fine-tune model settings including temperature, max tokens, and model selection
- **History Management**: Save and reload previous prompt configurations
- **Multi-language Support**: Interface available in English, Italian, French, Spanish, and German
- **Import/Export**: Share your prompt configurations with others

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and production builds
- Tailwind CSS for styling
- shadcn/ui component library
- React Router for navigation
- React Query for data fetching
- OpenAI API integration

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/Silverkron/prompt-wizard-studio.git
cd prompt-wizard-studio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Your application will be available at `http://localhost:5173/`

### Configuration

To use the OpenAI integration features, you'll need to provide your API key through the application interface. Follow the instructions in the OpenAI tutorial section for detailed guidance.

## Usage

1. Select your preferred language from the language selector
2. Configure your OpenAI model parameters
3. Create system, user, and assistant messages
4. Send your prompt and view the model's response
5. Save interesting prompts for later use

## Development

```bash
# Run development server with hot reloading
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [OpenAI](https://openai.com/) for their powerful language models
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vite](https://vitejs.dev/) for the blazing fast build tool
