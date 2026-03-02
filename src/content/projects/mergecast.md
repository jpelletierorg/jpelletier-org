---
title: MergeCast
status: active
oneliner: Podcast compression pipeline that publishes to YouTube
description: "Seven podcasts drop every week. Nobody has 40 hours to listen. MergeCast ingests RSS feeds, transcribes episodes via AssemblyAI, compresses them into a single structured script using Gemini, and generates narrated audio through ElevenLabs. The output is a 30-to-45-minute briefing — one audio file covering everything worth knowing. The monetization path is publishing these as YouTube videos and collecting ad revenue at scale."
repo: https://github.com/jpelletierorg/mergecast
date: 2026-03-02
order: 3
milestones:
  - date: "2026-03-02"
    text: "Project started. Initial CLI pipeline — feed parsing, transcription, LLM summarization, and TTS all wired end to end."
  - date: "2026-03-02"
    text: "Script quality iteration. Tuned system prompt for newscast-style one-section-per-podcast format with strict word budgets."
  - date: "2026-03-02"
    text: "Caching layer added. Feed XML cached with 1-hour TTL, transcripts cached permanently by episode GUID."
---

## The Problem

The podcast ecosystem produces an absurd volume of content. Lex Fridman alone puts out three-hour conversations every week. Multiply that by Huberman, Rogan, Dwarkesh, All-In, StarTalk, Diary of a CEO — and you're looking at 30+ hours of new material every seven days. Nobody has that kind of time.

The current solutions are bad. Podcast summary apps give you shallow bullet points that strip out everything interesting. Listening at 2x speed still takes 15 hours. Skipping episodes means missing the one insight that would have mattered. The fundamental problem is that podcast content has a terrible compression ratio — hours of audio for a few minutes of signal.

## What MergeCast Does

MergeCast is a pipeline that compresses multiple podcast episodes into a single audio briefing. It works in five stages:

**Fetch.** Pull the latest episodes from a list of RSS feeds. Currently tracking seven sources — the big interview and science podcasts. Feed data is cached with a one-hour TTL so repeated runs don't hammer servers.

**Transcribe.** Send each episode's audio to AssemblyAI for transcription with speaker diarization. Transcripts are cached permanently keyed by episode GUID, because a given episode never changes. This is the most expensive step and the cache makes iterating on downstream stages essentially free.

**Summarize.** Feed all transcripts into a Gemini 3.1 Pro call via Pydantic AI. The system prompt enforces a strict structure — introduction, one body section per podcast, conclusion — with dynamically computed word budgets. Each section gets roughly equal airtime. The output is a Pydantic model, not raw text, so the structure is validated at parse time.

**Render.** Save the structured script as a timestamped Markdown file. This is both the archive and the human-readable artifact.

**Speak.** Run the script through ElevenLabs TTS, chunked at 4,500 characters to stay within API limits. Chunks are stitched together with pydub into a single MP3.

The result is a ~45-minute audio file that covers a week of podcasts. One file. One listen during a commute. Nothing missed.

## The Route to Money

The monetization path is YouTube.

Podcast summary content performs well on YouTube. The audience is there — people searching for "Lex Fridman summary" or "Huberman key takeaways" — and YouTube's ad revenue model means every view pays. The economics are straightforward: the pipeline runs automatically, the marginal cost per episode is API fees (transcription + LLM + TTS), and YouTube handles distribution, discovery, and monetization.

The play is volume and consistency. One mergecast per week across multiple topic verticals — tech, science, finance, culture — each published as a YouTube video with a static visual or simple animation. The content is genuinely useful, which means retention should be decent, which means the algorithm should cooperate.

This is not a get-rich-quick scheme. It's an arbitrage on the fact that producing this content manually would require a team of researchers, writers, and voice talent. The pipeline replaces all of that with API calls. The cost structure is radically different from a human-staffed operation, which means it can be profitable at view counts that would be unsustainable for a traditional production team.

## What Makes It Hard

**Summarization quality is everything.** If the summaries are shallow, nobody watches twice. The system prompt is already 130 lines of detailed instructions — word budgets, structural constraints, anti-editorializing rules, guest introduction requirements. Getting the LLM to produce consistently good output at a specific length is harder than it sounds. Too short and you lose substance. Too long and you blow the time budget. The prompt engineering is ongoing.

**Audio quality has to clear a bar.** ElevenLabs is good but not perfect. Pronunciation errors, weird prosody on technical terms, occasional robotic cadence — these all erode trust. The current approach chunks at sentence boundaries and uses a high-quality model, but there's more tuning to do.

**YouTube is a different game.** Publishing audio is step one. But YouTube rewards video — thumbnails, visuals, retention graphs. The pipeline needs a video generation stage: at minimum a static image with waveform, ideally something more dynamic. This is the next engineering problem.

## Current Status

The CLI pipeline is functional end to end. Feed fetching, transcription, summarization, and TTS all work. The caching layer means iteration on prompt engineering and audio quality is fast and cheap. Multiple test runs have been produced, and the script quality has improved significantly through prompt iteration — from a thematic cross-referencing format to the current clean newscast structure.

Next steps: build the video generation stage, set up automated publishing to YouTube, and start producing weekly episodes consistently.
