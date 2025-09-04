# Visual Story-Writing: Writing by Manipulating Visual Representations
<img src="demo.gif">

## [Online Demo](https://damienmasson.com/VisualStoryWriting) / [How to build](#how-to-build-and-run) / [Publication](#publication)

This system automatically **visualizes** a story (chronological events, character and their actions and movements) and allows users to **edit** the story by manipulating these visual representations. For example:
- Hover over the timeline allows reviewing the chronology of events and visualizing the movements of the characters
- Connecting two characters suggests edits to the text to reflect the new interaction
- Moving a character suggests edits to the text to reflect the new position
- Reordering the events in the timeline suggests edits to the text to reflect the new chronology

The system relies on a GPT-4o to extract the information from the text and suggest edits.


## How to build and run
The code is written in TypeScript and uses React and Vite. To build and run the code, you will need to have Node.js installed on your machine. You can download it [here](https://nodejs.org/en/download/).
First install the dependencies:
```bash
npm install
```
Then build the code:
```bash
npm run dev
```


## How to use?
After entering your OpenAI API key, you can test Visual Story-Writing using the shortcuts or you can run the studies.
Note that the system was tested and developped for recent versions of **Google Chrome** or **Mozilla Firefox**.


## How to get an OpenAI API key?
Because Visual Story-Writing relies on the OpenAI API, you will need a key to make it work. You will need an account properly configured, see [here](https://platform.openai.com/account/api-keys) for more info.
Your key is never stored and the application runs locally and sends requests to the OpenAI API only.

## Using with LMStudio
The application also supports LMStudio as an alternative to OpenAI. To use LMStudio:
1. Install and run LMStudio
2. Load a model in LMStudio
3. Start the local server in LMStudio
4. Create a `.env` file in the project root with:
```bash
VITE_API_BASE_URL=http://localhost:1234/v1
VITE_OPENAI_API_KEY=lm-studio
VITE_DEFAULT_MODEL=qwen3-coder-480b-a35b-instruct-mlx
```
5. Run the application with `npm run dev`
6. When using LMStudio, you don't need to enter an API key - just click on any example to start


## Can I try without an API key?
The systen depends on the OpenAI API to work. If you enter an incorrect key, you will still be able to go through the study but executing prompts will yield an error.


## Where are the video tutorials?
From the launcher, you can start the studies to see the exact ordering and video tutorials participants went through.
Alternatively, you can go in the ``public/videos`` to review all the video tutorials.

## Publication
Coming soon!

You can also find the paper on [arXiv](https://arxiv.org/abs/2410.07486)