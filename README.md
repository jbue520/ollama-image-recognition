# Ollama Image Recognition & Prompt Generator / Ollama 图片识别与提示词生成器

[English](#english) | [中文 (Chinese)](#chinese)

---

<a name="english"></a>
## English Description

This is a local AI-powered application that generates high-quality, detailed video generation prompts from images or text keywords. It leverages local LLMs via Ollama to ensure privacy and uncensored capabilities (depending on the model used).

### Features

- **Image-to-Prompt**: Upload an image and optional keywords. AI analyzes visual details and combines them with your keywords to generate a premium video prompt.
- **Text-to-Prompt**: Expand simple keywords into rich, cinematic video prompts.
- **Multi-Model Support**: Designed to work with Ollama models.
- **Multi-Language**: Supports English and Chinese output.
- **Sequence Generation**: Can generate sequential prompts for multi-scene videos.
- **Dual Interfaces**: 
  - Modern Web UI (`app.py`)
  - Classic Desktop GUI (`app_old.py`)

### Prerequisites

1.  **Python 3.8+**
2.  **Ollama**: You must have [Ollama](https://ollama.com/) installed and running.

### Installation

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

### Usage

#### Web Interface (Recommended)

Run the clean, modern web interface:

```bash
python app.py
```

Then open your browser to `http://127.0.0.1:9541`.

#### Desktop GUI (Legacy)

For a simple standalone window:

```bash
python app_old.py
```

### Directory Structure

- `app.py`: Main Flask web application.
- `app_old.py`: Legacy Tkinter GUI application.
- `static/`: CSS, JS, and font assets.
- `templates/`: HTML templates.
- `uploads/`: Temporary storage for uploaded images.
- `download_assets.py`: Utility to download necessary static assets (fonts, particles.js) locally.

---

<a name="chinese"></a>
## 中文说明 (Chinese)

这是一个基于本地 AI 的应用程序，可以通过识别图片或文本关键词，生成高质量、细节丰富的 AI 视频生成提示词。它利用 Ollama 运行本地大模型，确保隐私安全，并支持无审查生成（取决于使用的模型）。

### 主要功能

- **图片转提示词**：上传图片并可设置关键词，AI 将结合视觉细节与您的关键词，生成顶级的视频生成提示词。
- **文本转提示词**：将简单的关键词扩展为丰富、电影质感的视频提示词。
- **多模型支持**：专为 Ollama 模型设计。
- **多语言支持**：支持生成英文和中文提示词。
- **连贯场景生成**：支持为多场景视频生成连续、连贯的提示词序列。
- **双重界面**：
  - 现代 Web 界面 (`app.py`)
  - 经典桌面 GUI (`app_old.py`)

### 前置要求

1.  **Python 3.8+**
2.  **Ollama**: 必须安装并运行 [Ollama](https://ollama.com/)。

### 安装步骤

1.  克隆本项目到本地。
2.  安装所需的 Python 依赖库：
    ```bash
    pip install -r requirements.txt
    ```
3.  **拉取必要的 Ollama 模型**：
    本项目严格依赖以下模型才能正常工作，请在运行前分别执行命令拉取：
    
    *   **视觉模型** (用于图片分析):
        ```bash
        ollama pull llava
        ```
    *   **文本/逻辑模型** (用于提示词生成):
        ```bash
        ollama pull huihui_ai/deepseek-r1-abliterated:14b
        ```
        *(注：你可以在 Web 界面中切换其他模型，但这是默认验证过的推荐模型)*。

### 使用方法

#### Web 网页版 (推荐)

运行以下命令启动现代化的 Web 界面：

```bash
python app.py
```

然后在浏览器中访问 `http://127.0.0.1:9541`。

#### 桌面版 (旧版)

如果你喜欢简单的独立窗口界面，可以运行：

```bash
python app_old.py
```

### 目录结构说明

- `app.py`: Flask Web 主程序。
- `app_old.py`: 基于 Tkinter 的旧版 GUI 程序。
- `static/`: 存放 CSS, JS 和字体文件。
- `templates/`: HTML 模板文件。
- `uploads/`: 上传图片的临时存储目录。
- `download_assets.py`: 用于下载本地所需的静态资源（字体、Particls.js等）的工具脚本。

## 许可证

[License]
