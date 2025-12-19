# Ollama Image Recognition & Prompt Generator

This is a local AI-powered application that generates high-quality, detailed video generation prompts from images or text keywords. It leverages local LLMs via Ollama to ensure privacy and uncensored capabilities (depending on the model used).

## Features

- **Image-to-Prompt**: Upload an image to get a detailed visual description converted into a premium video prompt.
- **Text-to-Prompt**: Expand simple keywords into rich, cinematic video prompts.
- **Multi-Model Support**: Designed to work with Ollama models.
- **Multi-Language**: Supports English and Chinese output.
- **Sequence Generation**: Can generate sequential prompts for multi-scene videos.
- **Dual Interfaces**: 
  - Modern Web UI (`app.py`)
  - Classic Desktop GUI (`app_old.py`)

## Prerequisites

1.  **Python 3.8+**
2.  **Ollama**: You must have [Ollama](https://ollama.com/) installed and running.

## Installation

1.  Clone this repository.
2.  Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Pull the required Ollama models**:
    This application strictly requires the following models to function correctly. You must pull them before running the app.
    
    *   **Vision Model** (for image analysis):
        ```bash
        ollama pull llava
        ```
    *   **Text/Logic Model** (for prompt generation):
        ```bash
        ollama pull huihui_ai/deepseek-r1-abliterated:14b
        ```
        *(Note: You can change the model in the Web UI, but this is the default verified model).*

## Usage

### Web Interface (Recommended)

Run the clean, modern web interface:

```bash
python app.py
```

Then open your browser to `http://127.0.0.1:9541`.

### Desktop GUI (Legacy)

For a simple standalone window:

```bash
python app_old.py
```

## Directory Structure

- `app.py`: Main Flask web application.
- `app_old.py`: Legacy Tkinter GUI application.
- `static/`: CSS, JS, and font assets.
- `templates/`: HTML templates.
- `uploads/`: Temporary storage for uploaded images.
- `download_assets.py`: Utility to download necessary static assets (fonts, particles.js) locally.

## License

[Your License Here]
