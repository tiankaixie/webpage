---
title: What I Learned Working on AI Strategy in 2025
description: Reflections on a year of building with LLMs at a startup — the gap between hype and reality, what AI strategy actually looks like day-to-day, and lessons from shipping real products.
subtitle: A Year of Building with LLMs
pubDate: 2026-01-15
lastModDate: "2026-01-15"
radio: false
video: false
platform: ""
draft: false
toc: true
share: true
ogImage: false
---

2025 was the year AI went from "interesting demo" to "okay but what does it actually do for us." I spent most of it at [Mad Realities](https://madrealities.xyz), a startup in New York, working on AI strategy. Here's what that actually looked like and what I took away from it.

## "AI Strategy" is mostly not about AI

When people hear "AI strategy," they imagine someone deciding which foundation model to use or fine-tuning transformers all day. The reality is much less glamorous. Most of my time went into:

- Figuring out which problems are even worth solving with AI (many aren't)
- Talking to users to understand where the friction actually lives
- Prototyping fast, killing ideas faster
- Building evaluation frameworks because "it feels smarter" isn't a metric

The strategic part isn't choosing between GPT-4 and Claude. It's deciding whether to build, buy, or ignore. It's knowing when a simple regex outperforms a $0.03/call LLM invocation. It's understanding that your competitive advantage is almost never the model — it's the data, the UX, and the speed at which you iterate.

## The hype-reality gap is real (and useful)

Every week in 2025 brought a new "this changes everything" moment. New models, new benchmarks, new startups raising at absurd valuations for wrapper products. But in the trenches, the picture was different.

Most teams I talked to were still struggling with basics:

- **Prompt reliability.** Getting an LLM to do the same thing twice is harder than it sounds. In production, "works 90% of the time" means 1 in 10 users has a broken experience.
- **Latency.** Users don't care that your model is thinking deeply. They care that the button didn't do anything for 4 seconds.
- **Cost.** Token costs add up fast when you're processing thousands of requests. The difference between a well-structured prompt and a lazy one can be 10x in spend.
- **Evaluation.** How do you know if version 2 of your prompt is better than version 1? Vibes don't scale.

The gap between hype and reality isn't a problem — it's an opportunity. If you can navigate it honestly, you build things that actually work instead of things that demo well.

## Lessons from building with LLMs at a startup

### 1. Start with the output, not the model

The most common mistake I saw: teams starting with "let's use GPT-4 for this" instead of "what does the user need to see?" Define the output format first. Then work backwards to figure out if you even need an LLM, and if so, which one and how.

### 2. Structured outputs save everything

The moment we started enforcing JSON schemas on LLM outputs, our reliability went from "mostly works" to "actually production-ready." Unstructured text generation is fine for chatbots. For anything integrated into a product pipeline, you need structure.

### 3. Caching is your best friend

LLMs are expensive and slow. If you're calling a model with the same (or similar) input repeatedly, you're burning money. We built aggressive caching layers — exact match, semantic similarity, even precomputed responses for common patterns. It cut our costs by 60%.

### 4. Small models punch above their weight

Not everything needs the biggest model. For classification, extraction, and routing tasks, smaller fine-tuned models or even good old embeddings + cosine similarity worked better, faster, and cheaper than throwing GPT-4 at everything. Save the heavy models for tasks that genuinely need reasoning.

### 5. The product layer matters more than the AI layer

Users don't care about your model. They care about whether the product solves their problem. The best AI features I shipped in 2025 were ones where users didn't even realize AI was involved — it just felt like the product was smart. The worst were ones where we put "AI" in the feature name and set expectations we couldn't meet.

## Side projects and tools

Outside of work, I co-founded [Pattern Loom](https://patternloom.com) in Canada, where we're exploring a different angle on AI tooling. Building your own thing on the side while doing AI strategy for someone else gives you a useful dual perspective — you see both the "what should we build" and "what's it actually like to build it" sides.

I also spent a lot of time with local development tools — setting up remote dev environments, experimenting with AI-assisted coding workflows, building personal automation. The meta-lesson: the best way to understand AI capabilities is to use them daily for your own work, not just read about benchmarks.

## What I'm watching in 2026

A few things I think will matter:

- **Agent frameworks maturing.** 2025 was the year of agent hype. 2026 might be when some of them actually work reliably enough for production.
- **Cost compression.** Models are getting cheaper fast. Tasks that didn't make economic sense in 2025 might be viable now.
- **Multimodal as default.** Text-only AI products will start feeling incomplete. Vision, audio, and structured data will be table stakes.
- **Regulation catching up.** Especially for anything touching user data or making decisions. Worth keeping an eye on.

## The honest takeaway

Working on AI strategy in 2025 taught me that the most valuable skill isn't technical depth in ML — it's judgment. Knowing when to use AI and when not to. Knowing when to ship and when to wait. Knowing the difference between a demo and a product.

The field moves fast, but the fundamentals of building good products haven't changed. Understand your users. Ship early. Measure everything. Iterate.

The AI part is just a new set of tools. Powerful ones, but tools nonetheless.
